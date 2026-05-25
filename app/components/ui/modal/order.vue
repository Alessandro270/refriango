<template>
  <UForm class="flex flex-col w-full gap-2">
    <div class="flex gap-3">
      <UFormField class="w-full" label="Produto">
        <USelectMenu
          class="w-full"
          placeholder="Selecionar produto"
          :search-input="true"
          :items="produtos"
        />
      </UFormField>

      <UFormField class="w-full" label="Fornecedor">
        <USelectMenu
          class="w-full"
          placeholder="Selecionar fornecedor"
          :search-input="true"
          :items="fornecedores"
        />
      </UFormField>
    </div>

    <div class="flex gap-3 mb-2">
      <UFormField class="w-full" label="Quantidade">
        <UInputNumber class="w-full" orientation="vertical" placeholder="0" />
      </UFormField>
    </div>

    <UButton
      class="mt-auto w-full flex items-center justify-center"
      icon="i-lucide-save"
    >
      Fazer pedido
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
const produtos = [
  "Leite Integral 1L",
  "Açúcar 1kg",
  "Café Moído 500g",
  "Óleo de Soja 900ml",
];
const fornecedores = ["Distribuidora ABC", "Fornecedor XYZ", "Atacado Central"];
const tiposEntrada = [
  "Compra",
  "Devolução de cliente",
  "Transferência interna",
  "Ajuste de inventário",
  "Produção própria",
];
const unidades = ["un", "kg", "g", "L", "ml", "cx", "pç", "fardo"];
const armazens = [
  "Armazém Principal",
  "Armazém Frigorífico",
  "Armazém Seco",
  "Depósito B",
];
</script>
