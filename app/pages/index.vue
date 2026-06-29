<script lang="ts" setup>
const stockStore = useStockStore()
const productStore = useProductStore()
const supplierStore = useSupplierStore()

const deliveryStore = useDeliveryStore()
const orderStore = useOrderStore()

const isLoading = ref<boolean>(false)

const getWeekIndexForLast12Weeks = (date: Date): number => {
  const today = new Date()

  today.setHours(0, 0, 0, 0)
  const targetDate = new Date(date)
  targetDate.setHours(0, 0, 0, 0)

  const diffInMs = today.getTime() - targetDate.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  const weeksAgo = Math.floor(diffInDays / 7)

  if (weeksAgo >= 0 && weeksAgo < 12) {
    return 11 - weeksAgo
  }

  return -1
}

const weeksLabels = [
  'sem 1',
  'sem 2',
  'sem 3',
  'sem 4',
  'sem 5',
  'sem 6',
  'sem 7',
  'sem 8',
  'sem 9',
  'sem 10',
  'sem 11',
  'sem 12'
]

const weeklyOrders = computed(() => {
  const weeksData = Array(12).fill(0)

  if (!orderStore.orders) return weeksData

  orderStore.orders.forEach(order => {
    const date = new Date(order.createdAt)
    if (!isNaN(date.getTime())) {
      const weekIndex = getWeekIndexForLast12Weeks(date)
      if (weekIndex !== -1) {
        weeksData[weekIndex] += Number(order.quantity || 0)
      }
    }
  })

  return weeksData
})

const weeklyDeliveries = computed(() => {
  const weeksData = Array(12).fill(0)

  if (!deliveryStore.deliveries) return weeksData

  deliveryStore.deliveries.forEach(delivery => {
    const date = new Date(delivery.createdAt)
    if (!isNaN(date.getTime())) {
      const weekIndex = getWeekIndexForLast12Weeks(date)
      if (weekIndex !== -1) {
        weeksData[weekIndex] += Number(delivery.quantity || 0)
      }
    }
  })

  return weeksData
})

const option = computed(() => ({
  title: {
    text: 'Movimentação Semanal do Mês',
    textStyle: { color: '#334155' }
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Entradas', 'Saídas'],
    textStyle: { color: '#475569' }
  },
  xAxis: {
    type: 'category',
    data: weeksLabels,
    axisLabel: { color: '#64748b' },
    axisLine: { lineStyle: { color: '#cbd5e1' } }
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#64748b' },
    splitLine: { lineStyle: { color: '#f1f5f9' } }
  },
  series: [
    {
      name: 'Entradas',
      type: 'bar',
      data: weeklyOrders.value,
      itemStyle: { color: '#3b82f6' }
    },
    {
      name: 'Saídas',
      type: 'bar',
      data: weeklyDeliveries.value,
      itemStyle: { color: '#ef4444' }
    }
  ]
}))

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

onMounted(async () => {
  try {
    isLoading.value = true
    await stockStore.getAll()
    await productStore.getAll()
    await supplierStore.getAll()
    await orderStore.getAll()
    await deliveryStore.getAll()
    cards.value.forEach(val => {
      if (val.title === 'Total de produtos')
        val.description = String(productStore.products.length)
      else if (val.title === 'Estoque baixo')
        val.description = String(
          stockStore.stocks.filter(val => val.quantity < val.minimumStock)
            .length
        )
      else if (val.title === 'Esgotado')
        val.description = String(
          stockStore.stocks.filter(val => val.quantity <= 0).length
        )
      else if (val.title === 'Fornecedores')
        val.description = String(supplierStore.suppliersCount)
    })
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
})

const filteredData = computed(() =>
  stockStore.stocks.filter(el => el.quantity < el.minimumStock)
)

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const columns = [
  {
    accessorKey: 'product',
    header: 'produto',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:box',
          class: 'text-blue-400 '
        }),
        row.original.product?.name
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
        row.original.product?.categoryName
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
        row.original.product?.purchasePrice
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
        row.original.product?.salePrice
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
