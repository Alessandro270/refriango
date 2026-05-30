<script setup lang="ts">
const stocks = ref([
  {
    id: 'STK-2026-001',
    product: 'Coca-Cola 2L',
    category: 'Refrigerantes',
    purchasePrice: 1400,
    salePrice: 1800,
    quantity: 24,
    minimumStock: 10,
    maximumStock: 40
  },
  {
    id: 'STK-2026-002',
    product: 'Fanta Laranja 2L',
    category: 'Refrigerantes',
    purchasePrice: 1350,
    salePrice: 1750,
    quantity: 8,
    minimumStock: 10,
    maximumStock: 35
  },
  {
    id: 'STK-2026-003',
    product: 'Sprite 2L',
    category: 'Refrigerantes',
    purchasePrice: 1300,
    salePrice: 1700,
    quantity: 0,
    minimumStock: 8,
    maximumStock: 30
  },
  {
    id: 'STK-2026-004',
    product: 'Água Pura 1.5L',
    category: 'Águas',
    purchasePrice: 650,
    salePrice: 900,
    quantity: 52,
    minimumStock: 20,
    maximumStock: 50
  },
  {
    id: 'STK-2026-005',
    product: 'Sumol Ananás',
    category: 'Sumos',
    purchasePrice: 950,
    salePrice: 1250,
    quantity: 14,
    minimumStock: 6,
    maximumStock: 25
  },
  {
    id: 'STK-2026-006',
    product: 'Red Bull 250ml',
    category: 'Energéticas',
    purchasePrice: 1700,
    salePrice: 2200,
    quantity: 5,
    minimumStock: 8,
    maximumStock: 20
  },
  {
    id: 'STK-2026-007',
    product: 'Compal Manga',
    category: 'Sumos',
    purchasePrice: 1050,
    salePrice: 1400,
    quantity: 18,
    minimumStock: 10,
    maximumStock: 30
  },
  {
    id: 'STK-2026-008',
    product: 'Pepsi 2L',
    category: 'Refrigerantes',
    purchasePrice: 1250,
    salePrice: 1650,
    quantity: 11,
    minimumStock: 10,
    maximumStock: 35
  },
  {
    id: 'STK-2026-009',
    product: 'Monster Energy',
    category: 'Energéticas',
    purchasePrice: 1900,
    salePrice: 2400,
    quantity: 2,
    minimumStock: 5,
    maximumStock: 15
  },
  {
    id: 'STK-2026-010',
    product: 'Água com Gás 500ml',
    category: 'Águas',
    purchasePrice: 800,
    salePrice: 1100,
    quantity: 27,
    minimumStock: 12,
    maximumStock: 30
  }
])

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UModal = resolveComponent('UModal')

const columns = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'product',
    header: 'produto',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:box',
          class: 'text-amber-500 '
        }),
        row.original.product
      ])
  },
  {
    accessorKey: 'category',
    header: 'categoria',
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
    accessorKey: 'purchasePrice',
    header: 'Preco de compra',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:dollar-sign',
          class: 'text-red-400 '
        }),
        row.original.purchasePrice
      ])
  },

  {
    accessorKey: 'salePrice',
    header: 'Preco de venda',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:dollar-sign',
          class: 'text-emerald-400 '
        }),

        row.original.salePrice
      ])
  },
  {
    accessorKey: 'quantity',
    header: 'estoque',
    cell: ({ row }) => {
      let color = ''
      const { minimumStock, maximumStock, quantity } = row.original

      if (quantity <= 0) color = 'error'
      else if (quantity < minimumStock) color = 'warning'
      else if (quantity < maximumStock) color = 'success'
      else color = 'info'

      return h(
        UBadge,
        {
          variant: 'solid',
          class:
            'flex items-center justify-between w-max rounded-full  min-w-12',
          color,
          icon: 'lucide:box'
        },
        () => quantity
      )
    }
  }
]

const statusFilters = ref([
  'Todos',
  'normal',
  'low-stock',
  'overstock',
  'sold-out'
])

const warehouseFilters = ref([
  'Todos os Armazéns',
  'Armazém Central',
  'Armazém Viana',
  'Armazém Benfica',
  'Filial Talatona',
  'Filial Kilamba'
])

const selectedStatus = ref('Todos')
const selectedWarehouse = ref('Todos os Armazéns')
const stockModalStyle = {
  content: '!w-200 !max-w-none',
  body: 'flex-1 '
}
const open = ref<boolean>(false)
</script>

<template>
  <div class="space-y-6">
    <div class="w-full flex justify-between">
      <UiH1 icon="lucide:boxes">Estoque</UiH1>
    </div>

    <UiTable :data="stocks" :columns="columns">
      <template #header>
        <div class="flex justify-between">
          <div class="flex items-center justify-between gap-4">
            <UInput
              icon="i-lucide-search"
              size="md"
              placeholder="Pesquisar estoque..."
              variant="outline"
            />
            <UButton icon="lucide:download" variant="outline">Exportar</UButton>
          </div>
          <div class="flex gap-4">
            <USelect
              variant="outline"
              v-model="selectedStatus"
              :items="statusFilters"
              placeholder="Filtrar por estado"
              class="w-28"
            />

            <USelect
              variant="outline"
              v-model="selectedWarehouse"
              :items="warehouseFilters"
              placeholder="Filtrar por armazém"
              class="w-40"
            />

            <UModal :ui="stockModalStyle" v-model:open="open">
              <template #header>
                <UiModalTitle @close="open = false">
                  Adicionar estoque
                </UiModalTitle>
              </template>

              <UButton icon="lucide:plus">Novo estoque</UButton>
              <template #body>
                <UiModalStock />
              </template>
            </UModal>
          </div>
        </div>
      </template>
    </UiTable>
  </div>
</template>
