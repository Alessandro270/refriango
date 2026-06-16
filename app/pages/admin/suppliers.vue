<script lang="ts" setup>
definePageMeta({ layout: 'admin' })
const UButton = resolveComponent('UButton')
const UiActions = resolveComponent('UiActions')
const UiModalSupplier = resolveComponent('UiModalSupplier')

const [isLoading, deleteOne] = useDelete()

const columns = [
  { accessorKey: '_id', header: 'ID' },
  {
    accessorKey: 'name',
    header: 'nome',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:users',
          class: 'text-blue-400 '
        }),
        row.original.name
      ])
  },
  {
    accessorKey: 'email',
    header: 'email',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 lowercase' }, [
        h(UIcon, {
          name: 'lucide:mail',
          class: 'text-blue-400 '
        }),
        row.original.email
      ])
  },
  {
    accessorKey: 'phone',
    header: 'telefone',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:phone-call',
          class: 'text-blue-500 '
        }),

        row.original.phone
      ])
  },
  {
    accessorKey: 'address',
    header: 'Endereço',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:map-pin',
          class: 'text-blue-500 '
        }),

        row.original.address ?? '—'
      ])
  },
  {
    header: 'Ações',
    cell: ({ row }) =>
      h(UiActions, {
        onConfirm: () => deleteOne(row.original.id, supplierStore),
        loading: isLoading.value,
        editComponent: h(UiModalSupplier, {
          action: 'update',
          data: row.original
        }),
        edit: true
      })
  }
]

const search = ref('')
const supplierStore = useSupplierStore()
const toast = useToast()

onMounted(async () => {
  try {
    if (!supplierStore.hasLoaded) {
      supplierStore.isLoading = true
      await supplierStore.getAll()
      supplierStore.hasLoaded = true
    }
  } catch (e) {
    toast.add({ title: 'Não foi possível adicionar fornecedor' })
  } finally {
    supplierStore.isLoading = false
  }
})

const open = ref<boolean>(false)
</script>

<template>
  <div class="space-y-6 flex flex-col h-full">
    <div class="flex items-center justify-between">
      <UiH1 icon="lucide:truck">Fornecedores</UiH1>
    </div>

    <UiTable
      :data="supplierStore.suppliers"
      :columns="columns"
      :loading="supplierStore.isLoading"
    >
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center justify-between gap-4">
            <UiSearch
              @search="async () => await supplierStore.getAll(search)"
              v-model="search"
            />
            <UButton
              @click="async () => await supplierStore.export()"
              icon="lucide:download"
              variant="outline"
            >
              Exportar
            </UButton>
          </div>
          <div class="flex gap-4">
            <UiModalUpload :store="supplierStore" />
            <UModal v-model:open="open">
              <template #header>
                <UiModalTitle @close="open = false">
                  Novo Fornecedor
                </UiModalTitle>
              </template>
              <UButton icon="lucide:plus"> Novo Fornecedor </UButton>
              <template #body>
                <UiModalSupplier @close="open = false" />
              </template>
            </UModal>
          </div>
        </div>
      </template>
    </UiTable>
  </div>
</template>
