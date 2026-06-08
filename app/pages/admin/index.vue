<script lang="ts" setup>
definePageMeta({ layout: 'admin' })
const cards = ref([
  {
    title: 'Total de produtos',
    description: '121',
    to: '/products',
    icon: 'lucide:boxes'
  },
  {
    title: 'Estoque baixo',
    description: '13',
    to: '/stock',
    icon: 'lucide:package-minus'
  },
  {
    title: 'Esgotado',
    description: '41',
    to: '/stock',
    icon: 'lucide:package-open'
  },
  {
    title: 'Fornecedores',
    description: '21',
    to: '/suppliers',
    icon: 'lucide:handshake'
  }
])

const option = {
  title: {
    text: 'Comparação de vendas',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['2024', '2025'],
    textStyle: {
      color: '#000'
    }
  },
  xAxis: {
    type: 'category',
    data: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ],
    axisLabel: {
      color: '#333'
    },
    axisLine: {
      lineStyle: {
        color: '#475569'
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#444'
    },
    splitLine: {
      lineStyle: {
        color: '#ddd'
      }
    }
  },
  series: [
    {
      name: 'Entradas',
      type: 'bar',
      smooth: true,
      showSymbol: false,
      data: [17, 12, 18, 14, 22, 30, 28, 35, 40, 38, 45, 50],
      lineStyle: {
        width: 2,
        color: 'rgba(245, 39, 39, 0.5)'
      },
      areaStyle: {
        color: 'rgba(245, 39, 39, 0.47)'
      }
    },
    {
      name: 'Saidas',
      type: 'bar',
      smooth: true,
      showSymbol: false,
      data: [12, 20, 25, 19, 35, 40, 42, 48, 55, 60, 58, 70],
      lineStyle: {
        width: 2,
        color: '#22c55e'
      },
      areaStyle: {
        color: 'rgba(34,197,94,0.2)'
      }
    }
  ]
}

const data = ref([
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

const filteredData = computed(() =>
  data.value.filter(el => el.quantity < el.minimumStock)
)

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const columns = [
  {
    accessorKey: '_id',
    header: '#'
  },
  {
    accessorKey: 'product',
    header: 'produto',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:box',
          class: 'text-blue-400 '
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
          class: 'text-blue-400'
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
          class: 'text-red-400'
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
          class: 'text-emerald-400'
        }),
        row.original.salePrice
      ])
  },
  {
    accessorKey: 'quantity',
    header: 'stock',
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
</script>

<template>
  <div class="space-y-6 flex flex-col min-h-screen h-max">
    <div>
      <UiH1 icon="lucide:layout-dashboard"> Dashboard </UiH1>
    </div>
    <div class="flex gap-4 w-full h-max">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-1/2">
        <UiCard
          v-for="(card, index) in cards"
          :key="index"
          :icon="card.icon"
          :to="card.to"
          :title="card.title"
          :description="card.description"
        />
      </div>

      <div class="bg-white py-4 px-4 rounded-md min-h-96 w-2/4">
        <UiH3>Entradas vs saidas</UiH3>
        <VChart class="w-full" :option="option" />
      </div>
    </div>

    <UiTable :data="filteredData" :columns="columns">
      <template #header>
        <div class="flex justify-between items-center">
          <UiH3>produtos em estoque baixo</UiH3>
          <UButton
            label="ver estoque"
            to="/stock"
            icon="lucide:arrow-up-right"
          />
        </div>
      </template>
    </UiTable>
  </div>
</template>
