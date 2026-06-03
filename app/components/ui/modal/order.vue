<script setup lang="ts">
import * as z from 'zod'

const orders = reactive<Product[]>([])
const id = ref<number>(0)
function addNewProduct() {
  orders.push({
    id: String(id.value),
    name: '',
    quantity: 0
  })
  console.log(id.value++)
}
const productStore = useProductStore()
withDefaults(defineProps<{ type?: 'purchase' | 'sale' }>(), {
  type: 'purchase'
})

const schema = z.object({
  quantity: z.number('Obrigatório').positive('Deve ser positivo'),
  supplierId: z.string('Obrigatório'),
  expectedDate: z.string('Obrigatório'),
  productId: z.string('Obrigatório')
})

const state = reactive({
  quantity: null,
  supplierId: null,
  expectedDate: null,
  productId: null
})
</script>

<template>
  <UForm
    class="flex flex-col w-full max-h-110 min-h-110 flex-1 justify-between"
  >
    <div class="flex flex-col gap-5 overflow-y-scroll">
      <UiOrderItem
        v-for="product in orders"
        :products="productStore.products"
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
        :placeholder="
          type === 'sale' ? 'Selecionar cliente' : 'Selecionar fornecedor'
        "
        :search-input="true"
      />

      <UButton
        class="mt-auto w-full flex items-center justify-center col-start-9 col-span-4"
        icon="i-lucide-save"
      >
        {{ type === 'sale' ? 'Vender estoque' : 'Efetuar pedido' }}
      </UButton>
    </div>
  </UForm>
</template>
