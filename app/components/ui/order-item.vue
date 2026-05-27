<script setup lang="ts">
type Product = {
  id: string
  quantity: number
  price: number
  name: string
}

defineProps<{ product: Product; products: string[] | [] }>()

const emits = defineEmits<{
  updateQuantity: [quantity: number]
  updateName: [name: string]
}>()
</script>

<template>
  <UFormField class="w-full" label="Produto">
    <USelectMenu
      class="w-full"
      placeholder="Selecionar produto"
      :search-input="true"
      :items="products"
      @change="(e: any) => emits('updateName', e.target.value)"
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
</template>
