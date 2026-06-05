<script setup lang="ts">
import * as z from 'zod'

const orders = reactive<Product[]>([])

const productStore = useProductStore()
withDefaults(defineProps<{ type?: 'purchase' | 'sale' }>(), {
  type: 'purchase'
})
</script>

<template>
  <UForm class="w-full gap-2 grid grid-cols-10 min-h-110 flex-1">
    <UFormField class="w-full col-span-2" label="Produto">
      <USelectMenu
        class="w-full"
        placeholder="Selecionar produto"
        :search-input="true"
        :items="products"
        label-key="name"
        value-key="id"
      />
    </UFormField>
    <UFormField class="w-full" label="Fornecedor">
      <USelectMenu
        class="w-full"
        placeholder="Selecionar fornecedor"
        :search-input="true"
        :items="products"
        label-key="name"
        value-key="id"
      />
    </UFormField>

    <UFormField class="w-full" label="Data prevista">
      <UInputNumber class="w-full" orientation="vertical" placeholder="0" />
    </UFormField>
    <UFormField class="w-full" label="Quantidade">
      <UInputNumber class="w-full" orientation="vertical" placeholder="0" />
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
  </UForm>
</template>
