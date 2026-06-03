<script lang="ts" setup>
definePageMeta({ layout: 'admin' })

type Supplier = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
}

const suppliers = ref<Supplier[]>([
  {
    id: 'SUP-001',
    name: 'Distribuidora Viana',
    email: 'viana@supplier.com',
    phone: '+244 923 111 222',
    address: 'Luanda - Viana',
    totalOrders: 12
  },
  {
    id: 'SUP-002',
    name: 'AngoFoods',
    email: 'contact@angofoods.co.ao',
    phone: '+244 922 333 444',
    address: 'Luanda - Talatona',
    totalOrders: 8
  },
  {
    id: 'SUP-003',
    name: 'Fresh Supply',
    email: 'fresh@supply.com',
    phone: '+244 921 555 666',
    address: 'Luanda - Benfica',
    totalOrders: 15
  },
  {
    id: 'SUP-004',
    name: 'Bebidas Angola',
    email: 'bebidas@angola.co.ao',
    phone: '+244 924 777 888',
    address: 'Luanda - Kilamba',
    totalOrders: 5
  }
])

const UButton = resolveComponent('UButton')

const columns = [
  { accessorKey: 'id', header: '#' },
  { accessorKey: 'name', header: 'nome' },
  { accessorKey: 'email', header: 'email' },
  { accessorKey: 'phone', header: 'telefone' },
  { accessorKey: 'address', header: 'endereço' },
  { accessorKey: 'totalOrders', header: 'pedidos' }
]

const search = ref('')

const filteredSuppliers = computed(() => {
  return suppliers.value.filter(supplier => {
    return (
      supplier.name.toLowerCase().includes(search.value.toLowerCase()) ||
      supplier.email.toLowerCase().includes(search.value.toLowerCase()) ||
      supplier.id.toLowerCase().includes(search.value.toLowerCase())
    )
  })
})

const open = ref<boolean>(false)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <UiH1>Fornecedores</UiH1>
    </div>

    <UiTable :data="filteredSuppliers" :columns="columns">
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center justify-between gap-4">
            <UInput
              variant="outline"
              v-model="search"
              icon="i-lucide-search"
              placeholder="Pesquisar fornecedor..."
            />
            <UButton icon="lucide:download" variant="outline">Exportar</UButton>
          </div>
          <UModal v-model:open="open">
            <template #header>
              <UiModalTitle @close="open = false">Novo Fornecedor</UiModalTitle>
            </template>
            <UButton icon="lucide:plus"> Novo Fornecedor </UButton>
            <template #body>
              <UiModalSupplier />
            </template>
          </UModal>
        </div>
      </template>
    </UiTable>
  </div>
</template>
