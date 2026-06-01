<script setup lang="ts">
type Product = {
  name: string
  supplier: string
  weight: number
  category: object
  width: number
  height: number
  length: number
  expiresAt: string
  salePrice: number
  purchasePrice: number
  description: string
  refrigerated: false
}

const { product } = withDefaults(
  defineProps<{ readonly?: boolean; product: Product }>(),
  {
    readonly: true
  }
)

// const supplier = ref("fanta");
</script>

<template>
  <div class="w-full space-y-2 grid grid-cols-3">
    <UFormField label="Nome">
      <div class="text-zinc-400">
        {{ product.purchasePrice }}
      </div>
    </UFormField>
    <UFormField label="Fornecedor">
      <div class="text-zinc-400">
        {{ product.purchasePrice }}
      </div>
    </UFormField>
    <UFormField label="Peso">
      <div class="text-zinc-400">
        {{ product.weight }}
      </div>
    </UFormField>
    <UFormField label="Categoria">
      <div class="text-zinc-400">
        {{ product.category?.name }}
      </div>
    </UFormField>
    <UFormField label="Dimensoes">
      <div class="text-zinc-400">
        {{ `${product.width},${product.height},${product.length}` }}
      </div>
    </UFormField>

    <UFormField label="Data de expiracao">
      <div class="text-zinc-400">
        {{ new Date(product.expiresAt).toLocaleDateString() }}
      </div>
    </UFormField>

    <UFormField label="Refrigerado">
      <UCheckbox
        :value="product.refrigerated"
        :disabled="readonly"
        class="w-full"
      />
    </UFormField>
    <UFormField label="Preco de compra">
      <div class="text-zinc-400">
        {{ product.purchasePrice }}
      </div>
    </UFormField>

    <UFormField label="Preco de venda">
      <div class="text-zinc-400">
        {{ product.salePrice }}
      </div>
    </UFormField>
    <UFormField label="Descricao do produto" class="h-full col-span-full">
      <div class="text-zinc-400">
        {{ product.description }}
      </div>
    </UFormField>
  </div>
</template>
