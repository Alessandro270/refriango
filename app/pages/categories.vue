<script lang="ts" setup>
const categoryStore = useCategoryStore()

const UButton = resolveComponent('UButton')

const toast = useToast()
onBeforeMount(async () => {
  try {
    await categoryStore.getCategories()
  } catch {
    toast.add({ title: 'Nao foi possivel carregar as categorias' })
  }
})

const columns = [
  { accessorKey: 'id', header: '#' },
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
        row.original.createdAt
      ])
  }
]

const search = ref('')

const filteredcategories = computed(() => {
  return categoryStore.categories?.filter(category => {
    return (
      category.name.toLowerCase().includes(search.value.toLowerCase()) ||
      category.email.toLowerCase().includes(search.value.toLowerCase()) ||
      category.id.toLowerCase().includes(search.value.toLowerCase())
    )
  })
})

const open = ref<boolean>(false)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <UiH1 icon="lucide:list-check">Categorias</UiH1>
    </div>

    <UiTable :data="filteredcategories" :columns="columns">
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
