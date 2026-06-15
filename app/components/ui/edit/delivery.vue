<script setup lang="ts">
import * as z from 'zod'

const uiStyle = {
  label: '',
  root: 'h-full',
  container: 'flex-1 flex flex-col'
}

const uiInputStyle = {
  base: 'h-full text-zinc-200  placeholder:text-zinc-400 '
}
const formFieldSize = 'lg'

const emit = defineEmits<{ close: [] }>()

const schema = z.object({
  customerPhone: z.e164('Formato +244900000000').nonempty('Obrigatório'),
  customerName: z.string('Obrigatório').nonempty('Obrigatório'),
  customerEmail: z.email('Email deve ser valido').optional(),
  address: z.string('Obrigatório').nonempty('Obrigatório'),
  expectedDate: z
    .string('Obrigatório')
    .refine(date => !isNaN(Date.parse(date)), 'Data prevista inválida')
    .nonempty('Obrigatório'),
  productId: z.string('Obrigatório').nonempty('Obrigatório'),
  quantity: z.number('Obrigatório').positive('Deve ser positivo'),
  description: z.string().nullable().optional()
})

const { data: delivery } = defineProps<{
  data?: object
}>()

const state = reactive({ ...delivery })

const deliveryStore = useDeliveryStore()
const toast = useToast()
const isLoading = ref(false)
const productStore = useProductStore()

const salePrice = computed(() =>
  state.productId
    ? productStore.products.find(product => product.id === state.productId)
        ?.salePrice
    : null
)

const total = computed(() =>
  salePrice.value && state.quantity ? salePrice.value * state.quantity : 0
)

async function handleSubmit() {
  try {
    isLoading.value = true
    const data = schema.parse(state)
    await deliveryStore.update(delivery.id, data)
    await deliveryStore.getAll()
  } catch (e) {
    toast.add({
      title: 'Não foi possível cadastrar entrega',
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
    class="rounded-md gap-4 grid grid-cols-12 auto-rows-min"
    :state="state"
    :schema="schema"
    @submit="handleSubmit"
  >
    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Produto"
      class="col-span-full"
      name="productId"
    >
      <USelectMenu
        v-model="state.productId"
        :ui="uiInputStyle"
        class="w-full"
        :items="productStore.products"
        placeholder="escolher produto"
        value-key="id"
        label-key="name"
        orientation="vertical"
      />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Data esperada"
      class="col-span-6"
      name="expectedDate"
    >
      <UInput v-model="state.expectedDate" type="date" class="w-full" />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Quantidade"
      class="col-span-6"
      name="quantity"
    >
      <UInputNumber
        v-model="state.quantity"
        :ui="uiInputStyle"
        class="w-full"
        placeholder="0"
        orientation="vertical"
      />
    </UFormField>
    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Preco Unitário"
      class="col-span-6"
      disabled
    >
      <UInputNumber
        :value="salePrice"
        :ui="uiInputStyle"
        class="w-full"
        placeholder="0"
        orientation="vertical"
      />
    </UFormField>
    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Total"
      class="col-span-6"
      disabled
    >
      <UInputNumber
        :value="total"
        :ui="uiInputStyle"
        class="w-full"
        placeholder="0"
        orientation="vertical"
      />
    </UFormField>
    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Observações"
      class="col-span-full"
      name="description"
    >
      <UTextarea
        v-model="state.description"
        class="w-full"
        type="text"
        :ui="uiInputStyle"
        placeholder="Informacoes adicionais"
      />
    </UFormField>

    <UiSaveBtn :is-loading="isLoading" />
  </UForm>
</template>
