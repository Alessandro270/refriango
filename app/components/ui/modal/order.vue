<script setup lang="ts">
type Product = {
  id: string
  quantity: number
  name: string
  price: number
  total: number
}
const products = [
  'Leite Integral 1L',
  'Açúcar 1kg',
  'Café Moído 500g',
  'Óleo de Soja 900ml'
]
const fornecedores = ['Distribuidora ABC', 'Fornecedor XYZ', 'Atacado Central']
const tiposEntrada = [
  'Compra',
  'Devolução de cliente',
  'Transferência interna',
  'Ajuste de inventário',
  'Produção própria'
]
const unidades = ['un', 'kg', 'g', 'L', 'ml', 'cx', 'pç', 'fardo']
const armazens = [
  'Armazém Principal',
  'Armazém Frigorífico',
  'Armazém Seco',
  'Depósito B'
]

const orders = reactive<Product[]>([])
const id = ref<number>(0)
function addNewProduct() {
  orders.push({
    id: String(id.value),
    name: '',
    price: 0,
    quantity: 0,
    total: 0
  })
  console.log(id.value++)
}
</script>

<template>
  <UForm
    class="flex flex-col w-full max-h-110 min-h-110 flex-1 justify-between"
  >
    <div class="flex flex-col gap-5 overflow-y-scroll">
      <UiOrderItem
        v-for="product in orders"
        :products="products"
        :product="product"
        :key="product.id"
        @update-name="name => (orders[product.id].name = name)"
      />
      <UButton
        class="col-span-full flex items-center justify-center"
        icon="lucide:plus"
        variant="ghost"
        @click="addNewProduct"
      >
        Adicionar produto
      </UButton>
    </div>

    <div
      class="grid grid-cols-12 gap-3 mt-auto pt-3 border-t border-t-zinc-500 w-full"
    >
      <USelectMenu
        icon="lucide:van"
        class="w-full col-start-1 col-span-4 h-max"
        placeholder="Selecionar fornecedor"
        :search-input="true"
        :items="fornecedores"
      />

      <UButton
        class="mt-auto w-full flex items-center justify-center col-start-9 col-span-4"
        icon="i-lucide-save"
      >
        Fazer pedido
      </UButton>
    </div>
  </UForm>
</template>
