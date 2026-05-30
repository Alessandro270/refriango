<script setup lang="ts">
const search = ref('')

const statusFilters = ref(['Todos', 'Ativo', 'Inativo', 'Em falta'])

const categoryFilters = ref([
  'Todas categorias',
  'Eletrónicos',
  'Acessórios',
  'Armazenamento',
  'Periféricos',
  'Mobiliário'
])

const selectedStatus = ref('Todos')
const selectedCategory = ref('Todas categorias')

const UButton = resolveComponent('UButton')
const UModal = resolveComponent('UModal')
const UiModalProduct = resolveComponent('UiModalProduct')
const UBadge = resolveComponent('UBadge')

const columns = [
  {
    accessorKey: 'name',
    header: 'Produto',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:box',
          class: 'text-amber-400 '
        }),
        row.original.name
      ])
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:chart-column-stacked',
          class: 'text-blue-400 '
        }),
        row.original.category
      ])
  },
  {
    accessorKey: 'unitPrice',
    header: 'Preço',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:dollar-sign',
          class: 'text-blue-400 '
        }),
        `Kz ${row.original.unitPrice}`
      ])
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:barcode',
          class: 'text-blue-400 '
        }),
        row.original.sku
      ])
  },
  {
    accessorKey: 'refrigerated',
    header: 'Refrigerado',
    cell: ({ row }: any) => {
      const refrigerated = row.getValue('refrigerated')
      const color = refrigerated ? 'success' : 'error'
      return h(
        UBadge,
        {
          variant: 'solid',
          size: 'sm',
          color,
          icon: refrigerated ? 'lucide:check' : 'lucide:x',
          class: 'rounded-full min-w-13'
        },
        () => (refrigerated ? 'sim' : 'nao')
      )
    }
  },
  {
    header: 'Acoes',
    cell: () =>
      h(
        UModal,
        {
          title: 'Detalhes do produto'
        },
        {
          default: () =>
            h(UButton, {
              variant: 'soft',
              color: 'neutral',
              icon: 'lucide:eye'
            }),
          body: () => h(UiModalProduct)
        }
      )
  }
]

const products = ref([
  {
    name: 'Coca-Cola 350ml',
    description: 'Refrigerante gaseificado clássico.',
    unitPrice: 500,
    category: 'Bebidas',
    sku: 'DRK-COKE-350',
    weight: 0.35,
    height: 12,
    width: 6,
    refrigerated: true,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e'
  },
  {
    name: 'Pepsi 350ml',
    description: 'Refrigerante de cola refrescante.',
    unitPrice: 500,
    category: 'Bebidas',
    sku: 'DRK-PEPSI-350',
    weight: 0.35,
    height: 12,
    width: 6,
    refrigerated: true,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e'
  },
  {
    name: 'Fanta Laranja 350ml',
    description: 'Refrigerante com sabor laranja.',
    unitPrice: 450,
    category: 'Bebidas',
    sku: 'DRK-FANTA-350',
    weight: 0.35,
    height: 12,
    width: 6,
    refrigerated: true,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423'
  },
  {
    name: 'Sprite 350ml',
    description: 'Refrigerante de limão refrescante.',
    unitPrice: 450,
    category: 'Bebidas',
    sku: 'DRK-SPRITE-350',
    weight: 0.35,
    height: 12,
    width: 6,
    refrigerated: true,
    image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca'
  },
  {
    name: 'Água Mineral 500ml',
    description: 'Água mineral natural engarrafada.',
    unitPrice: 200,
    category: 'Bebidas',
    sku: 'DRK-WATER-500',
    weight: 0.5,
    height: 20,
    width: 6,
    refrigerated: false,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e'
  }
])
</script>

<template>
  <div class="space-y-6">
    <UiH1>Produtos</UiH1>
    <UiTable :data="products" :columns="columns">
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <UInput
              variant="outline"
              v-model="search"
              icon="i-lucide-search"
              placeholder="Pesquisar produto..."
              class="max-w-sm bg-white"
            />
            <UButton icon="lucide:download" variant="outline">Exportar</UButton>
          </div>

          <div class="flex gap-4">
            <USelect
              v-model="selectedStatus"
              :items="statusFilters"
              variant="outline"
              class="w-28"
            />

            <USelect
              v-model="selectedCategory"
              :items="categoryFilters"
              variant="outline"
              class="w-42"
            />
            <UButton to="/products/new" icon="lucide:plus">
              Novo produto
            </UButton>
          </div>
        </div>
      </template>
    </UiTable>
  </div>
</template>
