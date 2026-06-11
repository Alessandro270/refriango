<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const stockStore = useStockStore()
const productStore = useProductStore()
const warehouseStore = useWarehouseStore()
const toast = useToast()

onMounted(async () => {
  try {
    if (!stockStore.hasLoaded) {
      stockStore.isLoading = true
      await stockStore.getAll()
      stockStore.hasLoaded = true
    }
    if (!productStore.hasLoaded) {
      productStore.isLoading = true
      await productStore.getAll()
      productStore.hasLoaded = true
    }
    if (!warehouseStore.hasLoaded) {
      warehouseStore.isLoading = true
      await warehouseStore.getAll()
      warehouseStore.hasLoaded = true
    }
  } catch (e) {
    toast.add({ title: 'Não foi possível carregar o estoque' })
  } finally {
    stockStore.isLoading = false
    productStore.isLoading = false
  }
})

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UModal = resolveComponent('UModal')
const UiActions = resolveComponent('UiActions')

const [isLoading, deleteOne] = useDelete()
const UiModalStock = resolveComponent('UiModalStock')

const columns = [
  {
    accessorKey: '_id',
    header: 'ID'
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
        row.original.product?.name
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
          class: 'text-emerald-400 '
        }),

        row.original.product?.salePrice
      ])
  },
  {
    header: 'Min - Max',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:boxes',
          class: 'text-blue-400'
        }),
        [`${row.original.minimumStock} - ${row.original.maximumStock}`]
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
  },
  {
    header: 'Ações',
    cell: ({ row }) =>
      h(UiActions, {
        onConfirm: () => deleteOne(row.original.id, stockStore),
        loading: isLoading.value,
        editComponent: h(UiModalStock, {
          action: 'update',
          data: row.original
        }),
        edit: true
      })
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
  <div class="space-y-6 flex flex-col h-full">
    <div class="w-full flex justify-between">
      <UiH1 icon="lucide:boxes">Estoque</UiH1>
    </div>

    <UiTable
      :data="stockStore.stocks"
      :columns="columns"
      :loading="stockStore.isLoading"
    >
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
              v-model="selectedStatus"
              variant="outline"
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
                <UiModalStock @close="open = false" />
              </template>
            </UModal>
          </div>
        </div>
      </template>
    </UiTable>
  </div>
</template>
