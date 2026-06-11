<script lang="ts" setup>
definePageMeta({ layout: 'admin' })
const UButton = resolveComponent('UButton')
const UIcon = resolveComponent('UIcon')
const UiActions = resolveComponent('UiActions')
const UiModalUser = resolveComponent('UiModalUser')

const [isLoading, deleteOne] = useDelete()

const columns = [
  { accessorKey: '_id', header: 'ID' },
  {
    header: 'Nome completo',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:user',
          class: 'text-blue-400 '
        }),
        `${row.original.firstname} ${row.original.lastname}`
      ])
  },
  {
    accessorKey: 'email',
    header: 'email',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 lowercase' }, [
        h(UIcon, {
          name: 'lucide:at-sign',
          class: 'text-blue-400 '
        }),
        row.original.email
      ])
  },
  {
    header: 'Ações',
    cell: ({ row }) => {
      return h(UiActions, {
        onConfirm: () => deleteOne(row.original.id, userStore),
        loading: isLoading.value,
        editComponent: h(UiModalUser, { action: 'update', data: row.original }),edit:true
      })
    }
  }
]

const search = ref('')
const userStore = useUserStore()
const toast = useToast()

onMounted(async () => {
  try {
    if (!userStore.hasLoaded) {
      userStore.isLoading = true
      await userStore.getAll()
      userStore.hasLoaded = true
    }
  } catch (e) {
    toast.add({ title: 'Não foi possível carregar usuários' })
  } finally {
    userStore.isLoading = false
  }
})

const open = ref<boolean>(false)
</script>

<template>
  <div class="space-y-6 flex flex-col h-full">
    <div class="flex items-center justify-between">
      <UiH1 icon="lucide:users">Usuários</UiH1>
    </div>

    <UiTable
      :data="userStore.users"
      :columns="columns"
      :loading="userStore.isLoading"
    >
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center justify-between gap-4">
            <UInput
              variant="outline"
              v-model="search"
              icon="i-lucide-search"
              placeholder="Pesquisar fornecedor..."
            />
            <UButton icon="lucide:download" variant="outline">Exportar</UButton>
          </div>
          <UModal v-model:open="open">
            <template #header>
              <UiModalTitle @close="open = false">Novo Usuário</UiModalTitle>
            </template>
            <UButton icon="lucide:plus"> Novo Usuário</UButton>
            <template #body>
              <UiModalUser @close="open = false" />
            </template>
          </UModal>
        </div>
      </template>
    </UiTable>
  </div>
</template>
