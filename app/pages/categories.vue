<script lang="ts" setup>
type Category = {
  id: string
  name: string
  description: string
  createdAt: string
  productCount: number
}

const categories = reactive<Category[]>([
  {
    id: 'CAT-001',
    name: 'Eletrônicos',
    description: 'Produtos eletrônicos e dispositivos tecnológicos.',
    createdAt: '2026-05-27',
    productCount: 128
  },
  {
    id: 'CAT-002',
    name: 'Informática',
    description: 'Computadores, periféricos e acessórios de informática.',
    createdAt: '2026-05-26',
    productCount: 94
  },
  {
    id: 'CAT-003',
    name: 'Escritório',
    description: 'Materiais e equipamentos para escritório.',
    createdAt: '2026-05-25',
    productCount: 53
  },
  {
    id: 'CAT-004',
    name: 'Bebidas',
    description: 'Bebidas alcoólicas e não alcoólicas.',
    createdAt: '2026-05-24',
    productCount: 76
  },
  {
    id: 'CAT-005',
    name: 'Alimentos',
    description: 'Produtos alimentícios diversos.',
    createdAt: '2026-05-23',
    productCount: 142
  },
  {
    id: 'CAT-006',
    name: 'Limpeza',
    description: 'Produtos de higiene e limpeza doméstica.',
    createdAt: '2026-05-22',
    productCount: 39
  },
  {
    id: 'CAT-007',
    name: 'Móveis',
    description: 'Mobiliário residencial e corporativo.',
    createdAt: '2026-05-21',
    productCount: 27
  },
  {
    id: 'CAT-008',
    name: 'Ferramentas',
    description: 'Ferramentas manuais e elétricas.',
    createdAt: '2026-05-20',
    productCount: 61
  },
  {
    id: 'CAT-009',
    name: 'Vestuário',
    description: 'Roupas, calçados e acessórios.',
    createdAt: '2026-05-19',
    productCount: 115
  },
  {
    id: 'CAT-010',
    name: 'Automotivo',
    description: 'Peças e acessórios automotivos.',
    createdAt: '2026-05-18',
    productCount: 48
  }
])

const UButton = resolveComponent('UButton')

const columns = [
  { accessorKey: 'id', header: '#' },
  { accessorKey: 'name', header: 'nome' },
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
  return categories.filter(category => {
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
      <UiH1>Categorias</UiH1>
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
              <UiModalCategory />
            </template>
          </UModal>
        </div>
      </template>
    </UiTable>
  </div>
</template>
