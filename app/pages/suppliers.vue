<script lang="ts" setup>
const UButton = resolveComponent('UButton')

const columns = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'name',
    header: 'nome',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:users',
          class: 'text-blue-400 '
        }),
        row.original.name
      ])
  },
  {
    accessorKey: 'email',
    header: 'email',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 lowercase' }, [
        h(UIcon, {
          name: 'lucide:at-sign',
          class: 'text-blue-400 '
        }),
        row.original.email
      ])
  },
  {
    accessorKey: 'phone',
    header: 'telefone',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:phone-call',
          class: 'text-emerald-500 '
        }),

        row.original.phone
      ])
  },
  {
    accessorKey: 'address',
    header: 'Localizacao',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:map-pin',
          class: 'text-amber-500 '
        }),

        row.original.address
      ])
  }
]

const search = ref('')
const supplierStore = useSupplierStore()
const toast = useToast()

onMounted(async () => {
  try {
    if (!supplierStore.hasLoaded) {
      supplierStore.isLoading = true
      await supplierStore.getSuppliers()
      supplierStore.hasLoaded = true
    }
  } catch (e) {
    toast.add({ title: 'Nao foi possivel adicionar fornecedor' })
  } finally {
    supplierStore.isLoading = false
  }
})

const filteredSuppliers = computed(() => {
  return supplierStore.suppliers.filter(supplier => {
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
  <div class="space-y-6 flex flex-col h-full">
    <div class="flex items-center justify-between">
      <UiH1 icon="lucide:truck">Fornecedores</UiH1>
    </div>

    <UiTable
      :data="filteredSuppliers"
      :columns="columns"
      :loading="supplierStore.isLoading"
    >
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
              <UiModalSupplier @close="open = false" />
            </template>
          </UModal>
        </div>
      </template>
    </UiTable>
  </div>
</template>
