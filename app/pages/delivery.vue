<script lang="ts" setup>
const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UModal = resolveComponent('UModal')
const uiModalStyle = {
  content: '!w-180 pb-6 min-h-120 h-max !max-w-none',
  body: 'flex-1 flex flex-col p-4 sm:p-6 '
}

const columns = [
  {
    accessorKey: '_id',
    header: 'ID'
  },
  {
    accessorKey: 'supplierId',
    header: 'Cliente',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:user',
          class: 'text-blue-400 '
        }),
        row.original.customerName
      ])
  },

  {
    accessorKey: 'address',
    header: 'Endereço',

    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:map-pin',
          class: 'text-amber-400 '
        }),
        row.original.address
      ])
  },
  {
    accessorKey: 'expectedDate',
    header: 'Estimado',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:calendar-days',
          class: 'text-blue-400 '
        }),
        new Date(row.original.expectedDate).toLocaleDateString()
      ])
  },

  {
    accessorKey: 'total',
    header: 'total'
  },

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
  },
  {
    header: 'Detalhes',
    cell: ({ row }) => {
      return h(
        UModal,
        {
          title: 'Detalhes da entrega',
          ui: uiModalStyle
        },
        {
          default: () =>
            h(UButton, {
              variant: 'outline',
              color: 'neutral',
              icon: 'lucide:ellipsis-vertical',
              size: 'xs'
            }),
          body: () => h(UiModalDelivery)
        }
      )
    }
  }
]

const deliveryStore = useDeliveryStore()

const statusFilters = ref(['Todos', 'completed', 'pending', 'cancelled'])

const selectedStatus = ref('Todos')
const search = ref('')

const filteredDeliveries = computed(() => {
  return deliveryStore.deliveries?.filter(delivery => {
    const matchesStatus =
      selectedStatus.value === 'Todos' ||
      delivery.status === selectedStatus.value

    const matchesSearch =
      delivery.id.toLowerCase().includes(search.value.toLowerCase()) ||
      delivery.supplierId.toLowerCase().includes(search.value.toLowerCase())

    return matchesStatus && matchesSearch
  })
})

const toast = useToast()
const productStore = useProductStore()

onMounted(async () => {
  try {
    if (!deliveryStore.hasLoaded) {
      deliveryStore.isLoading = true
      await deliveryStore.getAll()
      deliveryStore.hasLoaded = true
    }

    if (!productStore.hasLoaded) {
      productStore.isLoading = true
      await productStore.getAll()
      productStore.hasLoaded = true
    }
  } catch (e) {
    toast.add({
      title: 'Não foi possível carregar os entregas',
      icon: 'lucide:file-x'
    })
  } finally {
    deliveryStore.isLoading = false
  }
})
const open = ref(false)
</script>

<template>
  <div class="space-y-6 flex flex-col h-full">
    <UiH1 icon="lucide:van">Entregas</UiH1>

    <UiTable
      :data="filteredDeliveries"
      :columns="columns"
      :loading="deliveryStore.isLoading"
    >
      <template #header>
        <div class="flex justify-between items-center space-x-4 w-full">
          <div class="flex items-center justify-between gap-4">
            <UInput
              variant="outline"
              v-model="search"
              icon="i-lucide-search"
              placeholder="Pesquisar saida..."
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
            <UModal v-model:open="open">
              <template #header>
                <UiModalTitle @close="open = false">
                  Nova entrega
                </UiModalTitle>
              </template>
              <UButton icon="lucide:plus"> Nova entrega </UButton>
              <template #body>
                <UiModalDelivery @close="open = false" />
              </template>
            </UModal>
          </div>
        </div>
      </template>
    </UiTable>
  </div>
</template>
