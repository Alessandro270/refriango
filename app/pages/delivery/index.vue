<script lang="ts" setup>
type Order = {
  id: string
  supplierId: string
  status: string
  total: number
  createdAt: string
  updatedAt: string
}

const orders = ref<Order[]>([
  {
    id: 'ORD-001',
    supplierId: 'SUP-001',
    status: 'completed',
    total: 125,
    createdAt: '10/05/2026',
    updatedAt: '06/05/2026'
  },
  {
    id: 'ORD-002',
    supplierId: 'SUP-002',
    status: 'pending',
    total: 45,
    createdAt: '09/05/2026',
    updatedAt: '06/05/2026'
  },
  {
    id: 'ORD-003',
    supplierId: 'SUP-003',
    status: 'cancelled',
    total: 98,
    createdAt: '08/05/2026',
    updatedAt: '06/05/2026'
  },
  {
    id: 'ORD-004',
    supplierId: 'SUP-001',
    status: 'completed',
    total: 70,
    createdAt: '07/05/2026',
    updatedAt: '06/05/2026'
  },
  {
    id: 'ORD-005',
    supplierId: 'SUP-004',
    status: 'pending',
    total: 51,
    createdAt: '06/05/2026',
    updatedAt: '06/05/2026'
  }
])

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UModal = resolveComponent('UModal')
const uiModalStyle = {
  content: '!w-180 pb-6 min-h-120 h-max !max-w-none',
  body: 'flex-1 flex flex-col p-4 sm:p-6 '
}

const columns = [
  {
    accessorKey: 'id',
    header: '#'
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
        row.original.supplierId
      ])
  },

  {
    accessorKey: 'createdAt',
    header: 'Data de entrega',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:calendar-check-2',
          class: 'text-emerald-400 '
        }),
        row.original.createdAt
      ])
  },

  {
    accessorKey: 'createdAt',
    header: 'Data estimada',
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
  {
    accessorKey: 'status',
    header: 'Localizacao',

    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:map-pin',
          class: 'text-amber-400 '
        }),
        row.original.status
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
    header: 'Acoes',
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
              variant: 'soft',
              color: 'neutral',
              icon: 'lucide:eye'
            }),
          body: () => h(UiModalDelivery)
        }
      )
    }
  }
]

const statusFilters = ref(['Todos', 'completed', 'pending', 'cancelled'])

const selectedStatus = ref('Todos')
const search = ref('')

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesStatus =
      selectedStatus.value === 'Todos' || order.status === selectedStatus.value

    const matchesSearch =
      order.id.toLowerCase().includes(search.value.toLowerCase()) ||
      order.supplierId.toLowerCase().includes(search.value.toLowerCase())

    return matchesStatus && matchesSearch
  })
})
</script>

<template>
  <div class="space-y-6">
    <UiH1>Entregas</UiH1>

    <UiTable :data="filteredOrders" :columns="columns">
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

            <UButton to="/delivery/new" icon="lucide:plus"
              >Nova entrega</UButton
            >
          </div>
        </div>
      </template>
    </UiTable>
  </div>
</template>
