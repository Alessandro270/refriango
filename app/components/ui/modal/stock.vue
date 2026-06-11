<script setup lang="ts">
import * as z from 'zod'

const { action, data: stock } = defineProps<{
  action?: 'create' | 'update'
  data?: object
}>()

const schema = z.object({
  quantity: z
    .number('Deve conter um numero')
    .positive('Deve ser um numero positivo'),
  minimumStock: z
    .number('Deve conter um numero')
    .positive('Deve ser um numero positivo'),
  maximumStock: z
    .number('Deve conter um numero')
    .positive('Deve ser um numero positivo'),
  productId: z
    .string('Deve ser uma string')
    .min(3, 'Deve ter pelo menos 3 digitos')
    .nonempty('Deve ter um produto'),
  warehouseId: z
    .string('Deve ser uma string')
    .min(3, 'Deve ter pelo menos 3 digitos')
    .nonempty('Deve ter um armazem')
})

const state = reactive({ ...stock })

const productStore = useProductStore()
const warehouseStore = useWarehouseStore()
const stockStore = useStockStore()
const toast = useToast()

const isLoading = ref(false)
const emit = defineEmits<{ close: [] }>()

async function handleSubmit() {
  try {
    isLoading.value = true
    const data = schema.parse(state)
    if (action === 'update') await stockStore.update(stock.id, data)
    else await stockStore.create(data)
  } catch (e) {
    toast.add({
      title: 'Não foi possível adicionar estoque',
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
    class="flex flex-col w-full flex-1 gap-2"
    :state="state"
    :schema="schema"
    @submit="handleSubmit"
  >
    <UFormField class="w-full" label="Produto" name="productId">
      <USelectMenu
        v-model="state.productId"
        label-key="name"
        class="w-full"
        placeholder="Selecionar produto"
        :search-input="true"
        value-key="id"
        :items="productStore.products"
      />
    </UFormField>

    <UFormField class="w-full" label="Armazem" name="warehouseId">
      <USelectMenu
        v-model="state.warehouseId"
        label-key="name"
        value-key="id"
        class="w-full"
        placeholder="Selecionar armazem"
        :search-input="true"
        :items="warehouseStore.warehouses"
      />
    </UFormField>
    <UFormField class="w-full" label="Quantidade" name="quantity">
      <UInputNumber
        v-model="state.quantity"
        class="w-full"
        orientation="vertical"
        placeholder="0"
      />
    </UFormField>

    <div class="flex gap-3 mb-2">
      <UFormField class="w-full" label="Estoque maximo" name="maximumStock">
        <UInputNumber
          v-model="state.maximumStock"
          class="w-full"
          orientation="vertical"
          placeholder="0"
        />
      </UFormField>

      <UFormField class="w-full" label="Estoque minimo" name="minimumStock">
        <UInputNumber
          v-model="state.minimumStock"
          class="w-full"
          orientation="vertical"
          placeholder="0"
        />
      </UFormField>
    </div>
    <UButton
      :icon="isLoading ? '' : 'lucide:save'"
      class="w-full flex mt-auto justify-center items-center"
      type="submit"
    >
      <template v-if="!isLoading"> Salvar </template>
      <UiLoader v-else />
    </UButton>
  </UForm>
</template>
