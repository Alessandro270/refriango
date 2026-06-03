<script lang="ts" setup>
const toast = useToast()
const categoryStore = useCategoryStore()

const UButton = resolveComponent('UButton')

onMounted(async () => {
  try {
    if (!categoryStore.hasLoaded) {
      categoryStore.isLoading = true
      await categoryStore.getCategories()
      categoryStore.hasLoaded = true
    }
  } catch (e) {
    toast.add({ title: 'Nao foi possivel carregar as categorias' })
  } finally {
    categoryStore.isLoading = false
  }
})

const columns = [
  { accessorKey: 'id', header: 'ID' },
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
  { accessorKey: 'description', header: 'descricao' },
  {
    accessorKey: 'productCount',
    header: 'Produtos',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:box',
          class: 'text-blue-400 '
        }),
        row.original.productCount
      ])
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
