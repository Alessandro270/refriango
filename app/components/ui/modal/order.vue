<script setup lang="ts">
import * as z from 'zod'

const productStore = useProductStore()
const supplierStore = useSupplierStore()

const { action, data: order } = defineProps<{
  action?: 'create' | 'update'
  data?: object
}>()

const schema = z.object({
  supplierId: z.string('Obrigatório').nonempty('Obrigatório'),
  productId: z.string('Obrigatório').nonempty('Obrigatório'),
  expectedDate: z
    .string('Obrigatório')
    .refine(date => !isNaN(Date.parse(date)), 'Data prevista inválida')
    .nonempty('Obrigatório'),
  quantity: z.number('Obrigatório').positive('Deve ser positivo')
})

const state = reactive({
...order
})

const orderPrice = computed(
  () =>
    productStore.products.find(product => product.id === state.productId)
      ?.purchasePrice
)

const total = computed(() =>
  state.quantity && orderPrice.value ? orderPrice.value * state.quantity : 0
)

const emit = defineEmits<{ close: [] }>()
const isLoading = ref(false)
const toast = useToast()
const orderStore = useOrderStore()

async function handleSubmit() {
  try {
    isLoading.value = true
    const data = schema.parse(state)
    if (action === 'update') await orderStore.update(order.id, data)
    else await orderStore.create(data)
  } catch (e) {
    console.log(e)

    toast.add({
      title: 'Não foi possível efetuar pedido',
      icon: 'lucide:file-x'
    })
  } finally {
    isLoading.value = false
    emit('close')
  }
}
</script>

<template>
  <UForm
    class="w-full gap-5 grid grid-cols-10 auto-rows-max flex-1"
    :state="state"
    :schema="schema"
    @submit="handleSubmit"
  >
    <UFormField class="w-full col-span-full" label="Produto" name="productId">
      <USelectMenu
        class="w-full"
        v-model="state.productId"
        placeholder="Selecionar produto"
        :search-input="true"
        :items="productStore.products"
        label-key="name"
        value-key="id"
      />
    </UFormField>
    <UFormField
      class="w-full col-span-full"
      label="Fornecedor"
      name="supplierId"
    >
      <USelectMenu
        class="w-full"
        v-model="state.supplierId"
        placeholder="Selecionar fornecedor"
        :search-input="true"
        :items="supplierStore.suppliers"
        label-key="name"
        value-key="id"
      />
    </UFormField>

    <UFormField
      class="w-full col-span-5"
      label="Data prevista"
      name="expectedDate"
    >
      <UInput type="date" class="w-full" v-model="state.expectedDate" />
    </UFormField>
    <UFormField class="w-full col-span-5" label="Quantidade" name="quantity">
      <UInputNumber
        v-model="state.quantity"
        class="w-full"
        orientation="vertical"
        placeholder="0"
      />
    </UFormField>

    <UFormField class="w-full col-span-full" label="Preco de compra">
      <UInputNumber
        :value="orderPrice"
        class="w-full"
        orientation="vertical"
        placeholder="0"
        :disabled="true"
      />
    </UFormField>
    <UFormField class="w-full col-span-full" label="Total">
      <UInputNumber
        :value="total"
        class="w-full"
        orientation="vertical"
        placeholder="0"
        :disabled="true"
      />
    </UFormField>
    <UiSaveBtn :is-loading="isLoading" />
  </UForm>
</template>
