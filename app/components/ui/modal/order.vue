<script setup lang="ts">
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

const orders = reactive([])
const id = ref(0)
function addNewProduct() {
  orders.value.push = { id, name: '', quantity: 0, total: 0 }
  console.log(orders[currId])
  id.value++
}
</script>

<template>
  <UForm class="flex flex-col w-full flex-1 justify-between">
    <div class="grid grid-cols-4 gap-5">
      <OrderItem
        v-for="product in orders"
        :products="products"
        :product="product"
        :key="product.id"
      />
      <UButton
        class="col-start-2 col-span-2 flex items-center justify-center"
        icon="lucide:plus"
        variant="ghost"
        @click="addNewProduct"
      >
        Adicionar produto
      </UButton>
    </div>

    <div class="grid grid-cols-12 gap-3 mt-auto w-full">
      <USelectMenu
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
