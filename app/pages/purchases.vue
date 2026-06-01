<script lang="ts" setup>
const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const columns = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'supplierId',
    header: 'fornecedor',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:users',
          class: 'text-blue-400 '
        }),
        row.original.supplierId
      ])
  },
  {
    accessorKey: 'createdAt',
    header: 'data',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:calendar-days',
          class: 'text-blue-400 '
        }),
        row.original.createdAt
      ])
  },
  {
    accessorKey: 'updatedAt',
    header: 'Ultima atualizacao',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:calendar-clock',
          class: 'text-blue-400 '
        }),
        row.original.updatedAt
      ])
  },
  { accessorKey: 'total', header: 'total' },
  {
    accessorKey: 'status',
    header: 'estado',
    cell: ({ row }) => {
      let color = ''
      let value = ''
      let icon = ''
      switch (row.getValue('status')) {
        case 'pending':
          color = 'warning'
          value = 'pendente'
          icon = 'lucide:clock'
          break
        case 'completed':
          color = 'success'
          value = 'completo'
          icon = 'lucide:check'
          break
        case 'cancelled':
          color = 'error'
          value = 'cancelado'
          icon = 'lucide:x'
          break
        default:
          color = 'neutral'
          icon = 'lucide:help-circle'
      }

      return h(
        UBadge,
        { variant: 'solid', color, icon, class: 'rounded-full' },
        () => value
      )
    }
  }
]

const purchaseStore = usePurchaseStore()
const supplierStore = useSupplierStore()
const toast = useToast()

onMounted(async () => {
  try {
    if (!purchaseStore.hasLoaded) {
      purchaseStore.isLoading = true
      await purchaseStore.getAll()
      await supplierStore.getSuppliers()
      purchaseStore.hasLoaded = true
    }
  } catch (e) {
    toast.add({
      title: 'Nao foi possivel carregar os pedidos',
      description: e.message
    })
  } finally {
    purchaseStore.isLoading = false
  }
})

const statusFilters = ref(['Todos', 'completed', 'pending', 'cancelled'])

const selectedStatus = ref('Todos')
const search = ref('')

const filteredOrders = computed(() => {
  return purchaseStore.purchases.filter(purchase => {
    const matchesStatus =
      selectedStatus.value === 'Todos' ||
      purchase.status === selectedStatus.value

    const matchesSearch =
      purchase.id.toLowerCase().includes(search.value.toLowerCase()) ||
      purchase.supplierId.toLowerCase().includes(search.value.toLowerCase())

    return matchesStatus && matchesSearch
  })
})

const modalStyle = {
  content: '!w-210 min-h-120 h-max !max-w-none',
  body: 'flex-1 flex flex-col p-4 sm:p-6 '
}

const open = ref<boolean>(false)
</script>

<template>
  <div class="space-y-6">
    <UiH1 icon="lucide:shopping-cart">Pedido de compra</UiH1>

    <UiTable :data="filteredOrders" :columns="columns">
      <template #header>
        <div class="flex justify-between items-center space-x-4 w-full">
          <div class="flex items-center justify-between gap-4">
            <UInput
              variant="outline"
              v-model="search"
              icon="i-lucide-search"
              placeholder="Pesquisar compra..."
            />
            <UButton icon="lucide:download" variant="outline">
              Exportar
            </UButton>
          </div>
          <div class="flex items-center gap-4">
            <USelect
              v-model="selectedStatus"
              variant="outline"
              :items="statusFilters"
            />
            <UModal :ui="modalStyle" v-model:open="open">
              <template #header>
                <UiModalTitle @close="open = false"> Nova compra </UiModalTitle>
              </template>
              <UButton icon="lucide:plus"> Nova compra</UButton>
              <template #body>
                <UiModalOrder />
              </template>
            </UModal>
          </div>
        </div>
      </template>
    </UiTable>
  </div>
</template>
