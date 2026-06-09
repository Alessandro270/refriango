<script setup lang="ts">
const search = ref('')

const statusFilters = ref(['Todos', 'Ativo', 'Inativo', 'Em falta'])

const categoryFilters = ref([
  'Todas categorias',
  'Eletrónicos',
  'Acessórios',
  'Armazenamento',
  'Periféricos',
  'Mobiliário'
])

const selectedStatus = ref('Todos')
const selectedCategory = ref('Todas categorias')

const UButton = resolveComponent('UButton')
const UModal = resolveComponent('UModal')
const UiModalDetails = resolveComponent('UiModalDetails')
const UBadge = resolveComponent('UBadge')

const toast = useToast()
const productStore = useProductStore()

onMounted(async () => {
  try {
    if (!productStore.hasLoaded) {
      productStore.isLoading = true
      await productStore.getAll()
      productStore.hasLoaded = true
    }
  } catch (e) {
    toast.add({ title: 'Não foi possível carregar os produtos' })
  } finally {
    productStore.isLoading = false
  }
})

const columns = [
  { accessorKey: '_id', header: 'ID' },
  {
    accessorKey: 'name',
    header: 'Produto',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:box',
          class: 'text-amber-400 '
        }),
        row.original.name
      ])
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:chart-column-stacked',
          class: 'text-blue-400 '
        }),
        row.original.category.name
      ])
  },
  {
    accessorKey: 'purchasePrice',
    header: 'Preço de compra',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:dollar-sign',
          class: 'text-red-400 '
        }),
        row.original.purchasePrice
      ])
  },
  {
    accessorKey: 'salePrice',
    header: 'Preço de venda',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-2 capitalize' }, [
        h(UIcon, {
          name: 'lucide:dollar-sign',
          class: 'text-emerald-400 '
        }),
        `${row.original.salePrice} Kz `
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
          color,
          icon: refrigerated ? 'lucide:check' : 'lucide:x',
          class: 'rounded-full min-w-13'
        },
        () => (refrigerated ? 'sim' : 'nao')
      )
    }
  },
  {
    header: 'Detalhes',
    cell: ({ row }) =>
      h(
        UModal,
        {
          title: 'Detalhes do produto'
        },
        {
          default: () =>
            h(UButton, {
              variant: 'outline',
              color: 'neutral',
              icon: 'lucide:ellipsis-vertical',
              size: 'xs'
            }),
          body: () => h(UiModalDetails, { data: row.original })
        }
      )
  }
]
</script>

<template>
  <div class="space-y-6 flex flex-col h-full">
    <UiH1 icon="lucide:box">Produtos</UiH1>
    <UiTable
      :data="productStore.products"
      :columns="columns"
      :loading="productStore.isLoading"
    >
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <UInput
              variant="outline"
              v-model="search"
              icon="i-lucide-search"
              placeholder="Pesquisar produto..."
              class="max-w-sm bg-white"
            />
            <UButton icon="lucide:download" variant="outline">Exportar</UButton>
          </div>

          <div class="flex gap-4">
            <USelect
              v-model="selectedStatus"
              :items="statusFilters"
              variant="outline"
              class="w-28"
            />

            <USelect
              v-model="selectedCategory"
              :items="categoryFilters"
              variant="outline"
              class="w-42"
            />
            <UButton to="/products/new" icon="lucide:plus">
              Novo produto
            </UButton>
          </div>
        </div>
      </template>
    </UiTable>
  </div>
</template>
