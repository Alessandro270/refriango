<script lang="ts" setup>
definePageMeta({ layout: 'admin' })
const toast = useToast()
const categoryStore = useCategoryStore()

const UButton = resolveComponent('UButton')

onMounted(async () => {
  try {
    if (!categoryStore.hasLoaded) {
      categoryStore.isLoading = true
      await categoryStore.getAll()
      categoryStore.hasLoaded = true
    }
  } catch (e) {
    toast.add({ title: 'Nao foi possivel carregar as categorias' })
  } finally {
    categoryStore.isLoading = false
  }
})
const UiActions = resolveComponent('UiActions')

const [isLoading, deleteOne] = useDelete()

const columns = [
  { accessorKey: '_id', header: 'ID' },
  {
    accessorKey: 'name',
    header: 'nome',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:chart-column-stacked',
          class: 'text-blue-400 '
        }),
        row.original.name
      ])
  },
  {
    accessorKey: 'description',
    header: 'descricao',
    cell: ({ row }) => {
      return row.original.description || 'Sem descrição'
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Data de criacao',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:calendar-days',
          class: 'text-blue-400 '
        }),

        new Date(row.original.createdAt).toLocaleDateString()
      ])
  },
  {
    header: 'Ações',
    cell: ({ row }) => {
      return h(UiActions, {
        onConfirm: () => {
          deleteOne(row.original.id, useCategoryStore())
        },
        loading: isLoading.value
      })
    }
  }
]

const search = ref('')

const open = ref<boolean>(false)
const categoryCount = computed(() => categoryStore.categories.length)
</script>

<template>
  <div class="space-y-6 flex flex-col h-full">
    <div class="flex items-center justify-between">
      <UiH1 icon="lucide:list-check">Categorias</UiH1>
    </div>

    <UiTable
      :data="categoryStore.categories"
      :columns="columns"
      :loading="categoryStore.isLoading"
    >
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center justify-between gap-4">
            <UInput
              variant="outline"
              v-model="search"
              icon="i-lucide-search"
              placeholder="Pesquisar categoria..."
            />
            <UButton icon="lucide:download" variant="outline">Exportar</UButton>
            <span class="text-sm text-zinc-500">
              Categorias: {{ categoryCount }}
            </span>
          </div>
          <UModal v-model:open="open">
            <template #header>
              <UiModalTitle @close="open = false">
                Nova categoria
              </UiModalTitle>
            </template>
            <UButton icon="lucide:plus"> Nova categoria </UButton>
            <template #body>
              <UiModalCategory @close="open = false" />
            </template>
          </UModal>
        </div>
      </template>
    </UiTable>
  </div>
</template>
