<script setup lang="ts">
import { ref, computed } from 'vue'

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

const warehouses = ref<Warehouse[]>([
  {
    id: 'WH-001',
    name: 'Armazém Central',
    refrigerated: true,
    location: 'luanda_centro',
    createdAt: '2026-05-10'
  },
  {
    id: 'WH-002',
    name: 'Depósito Viana',
    refrigerated: false,
    location: 'viana',
    createdAt: '2026-05-12'
  },
  {
    id: 'WH-003',
    name: 'Armazém Frio Norte',
    refrigerated: true,
    location: 'cacuaco',
    createdAt: '2026-05-14'
  }
])

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const columns = [
  {
    accessorKey: 'id',
    header: '#'
  },
  {
    accessorKey: 'name',
    header: 'Nome'
  },
  {
    accessorKey: 'location',
    header: 'Localização',
    cell: ({ row }: any) => row.getValue('location')
  },
  {
    accessorKey: 'refrigerated',
    header: 'Refrigerado',
    cell: ({ row }: any) => {
      const refrigerated = row.getValue('refrigerated')
      const color = refrigerated ? 'success' : 'error'
      return h(UBadge, { variant: 'solid', size: 'sm', color }, () =>
        refrigerated ? 'sim' : 'nao'
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em'
  }
]

const filteredWarehouses = computed(() => {
  return warehouses.value.filter(warehouse => {
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
  <div class="space-y-6">
    <UiH1>Armazens</UiH1>

    <UiTable :data="filteredWarehouses" :columns="columns">
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
                <UiModalWarehouse />
              </template>
            </UModal>
          </div>
        </div>
      </template>
    </UiTable>
  </div>
</template>
