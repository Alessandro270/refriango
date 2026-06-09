<script setup lang="ts">
definePageMeta({ layout: 'admin' })
type Warehouse = {
  id: string
  name: string
  refrigerated: boolean
  location: string
  createdAt: string
}

const search = ref('')
const selectedLocation = ref<string | null>(null)

const locationFilters = [
  { label: 'Todas localizações', value: null },
  { label: 'Luanda Centro', value: 'luanda_centro' },
  { label: 'Viana', value: 'viana' },
  { label: 'Cacuaco', value: 'cacuaco' }
]

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UIcon = resolveComponent('UIcon')
const UiActions = resolveComponent('UiActions')

const toast = useToast()

const warehouseStore = useWarehouseStore()

onMounted(async () => {
  try {
    if (!warehouseStore.hasLoaded) {
      warehouseStore.isLoading = true
      await warehouseStore.getAll()
      warehouseStore.hasLoaded = true
    }
  } catch (e) {
    toast.add({ title: 'Nao foi possivel carregar os armazens' })
  } finally {
    warehouseStore.isLoading = false
  }
})

const [isLoading, deleteOne] = useDelete()

const columns = [
  {
    accessorKey: '_id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }: any) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:warehouse',
          class: 'text-amber-500 '
        }),

        row.getValue('name')
      ])
  },
  {
    accessorKey: 'location',
    header: 'Localização',
    cell: ({ row }: any) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:map-pin',
          class: 'text-amber-500 '
        }),

        row.original.address
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
          icon: refrigerated ? 'lucide:check' : 'lucide:x',
          color,
          class: 'rounded-full min-w-13'
        },
        () => (refrigerated ? 'sim' : 'nao')
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString()
  },
  {
    header: 'Ações',
    cell: ({ row }) =>
      h(UiActions, {
        onConfirm: () => deleteOne(row.original.id, warehouseStore),
        loading: isLoading.value
      })
  }
]

const filteredWarehouses = computed(() => {
  return warehouseStore.warehouses.filter(warehouse => {
    const matchesLocation =
      !selectedLocation.value || warehouse.location === selectedLocation.value

    const matchesSearch =
      warehouse.name.toLowerCase().includes(search.value.toLowerCase()) ||
      warehouse.id.toLowerCase().includes(search.value.toLowerCase())

    return matchesLocation && matchesSearch
  })
})

const open = ref<boolean>(false)
</script>

<template>
  <div class="space-y-6 flex flex-col h-full">
    <UiH1 icon="lucide:warehouse">Armazens</UiH1>

    <UiTable
      :data="filteredWarehouses"
      :columns="columns"
      :loading="warehouseStore.isLoading"
    >
      <template #header>
        <div class="flex justify-between items-center space-x-4 w-full">
          <div class="flex items-center justify-between gap-4">
            <UInput
              v-model="search"
              icon="i-lucide-search"
              placeholder="Pesquisar armazens..."
              variant="outline"
            />
            <UButton icon="lucide:download" variant="outline">Exportar</UButton>
          </div>
          <div class="flex items-center gap-4">
            <USelect
              variant="outline"
              v-model="selectedLocation"
              :items="locationFilters"
            />
            <UModal v-model:open="open">
              <template #header>
                <UiModalTitle @close="open = false">
                  Cadastrar Armazem
                </UiModalTitle>
              </template>
              <UButton icon="lucide:plus"> Novo armazem </UButton>
              <template #body>
                <UiModalWarehouse @close="open = false" />
              </template>
            </UModal>
          </div>
        </div>
      </template>
    </UiTable>
  </div>
</template>
