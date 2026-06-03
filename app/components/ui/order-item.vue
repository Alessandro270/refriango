<script setup lang="ts">
type Product = {
  id: string
  quantity: number
  price: number
  name: string
  total: number
}

defineProps<{ product: Product; products: any[] | [] }>()

const emits = defineEmits<{
  updateQuantity: [quantity: number]
  updateName: [name: string]
}>()
</script>

<template>
  <div class="grid grid-cols-4 h-20 gap-5">
    <UFormField class="w-full" label="Produto">
      <USelectMenu
        class="w-full"
        placeholder="Selecionar produto"
        :search-input="true"
        :items="products"
        @update:model-value="val => emits('updateName', val)"
        label-key="name"
        value-key="id"
      />
    </UFormField>

    <UFormField class="w-full" label="Quantidade">
      <UInputNumber
        @change="(e: any) => emits('updateQuantity', Number(e.target.value))"
        class="w-full"
        orientation="vertical"
        placeholder="0"
      />
    </UFormField>
    <UFormField class="w-full" label="Preco unitario">
      <UInputNumber
        class="w-full"
        orientation="vertical"
        placeholder="0"
        :disabled="true"
      />
    </UFormField>
    <UFormField class="w-full" label="Total">
      <UInputNumber
        class="w-full"
        orientation="vertical"
        placeholder="0"
        :disabled="true"
      />
    </UFormField>
  </div>
</template>
