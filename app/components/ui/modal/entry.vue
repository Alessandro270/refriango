<template>
  <div class="flex flex-col w-full gap-8">
    <div class="w-full space-y-3">
      <div class="flex items-center gap-2 mb-1">
        <UIcon name="i-lucide-package-plus" class="w-4 h-4 text-primary" />
        <span class="text-sm font-medium text-highlighted">Identificação</span>
      </div>

      <UFormField class="flex justify-between items-center" label="Produto">
        <USelectMenu
          class="w-60"
          placeholder="Selecionar produto"
          :search-input="true"
          :items="produtos"
        />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Fornecedor">
        <USelectMenu
          class="w-60"
          placeholder="Selecionar fornecedor"
          :search-input="true"
          :items="fornecedores"
        />
      </UFormField>

      <UFormField
        class="flex justify-between items-center"
        label="Nº Documento"
      >
        <UInput class="w-60" placeholder="Ex: NF-001234" />
      </UFormField>

      <UFormField
        class="flex justify-between items-center"
        label="Tipo de entrada"
      >
        <USelectMenu
          class="w-60"
          placeholder="Selecionar tipo"
          :search-input="false"
          :items="tiposEntrada"
        />
      </UFormField>

      <UDivider class="my-1" />

      <div class="flex items-center gap-2 mb-1">
        <UIcon name="i-lucide-boxes" class="w-4 h-4 text-primary" />
        <span class="text-sm font-medium text-highlighted"
          >Quantidade & Custo</span
        >
      </div>

      <UFormField class="flex justify-between items-center" label="Quantidade">
        <UInput class="w-60" type="number" placeholder="0" />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Unidade">
        <USelectMenu
          class="w-60"
          placeholder="Selecionar unidade"
          :search-input="false"
          :items="unidades"
        />
      </UFormField>

      <UFormField
        class="flex justify-between items-center"
        label="Custo unitário"
      >
        <UInput
          class="w-60"
          type="number"
          placeholder="0.00"
          icon="i-lucide-dollar-sign"
        />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Custo total">
        <UInput
          class="w-60"
          type="number"
          placeholder="0.00"
          icon="i-lucide-dollar-sign"
          disabled
        />
      </UFormField>
    </div>

    <div class="w-full space-y-3 flex flex-col">
      <div class="flex items-center gap-2 mb-1">
        <UIcon name="i-lucide-calendar-clock" class="w-4 h-4 text-primary" />
        <span class="text-sm font-medium text-highlighted"
          >Datas & Rastreio</span
        >
      </div>

      <UFormField
        class="flex justify-between items-center"
        label="Data de entrada"
      >
        <UInput class="w-60" type="date" />
      </UFormField>

      <UFormField
        class="flex justify-between items-center"
        label="Data de validade"
      >
        <UInput class="w-60" type="date" />
      </UFormField>

      <div class="flex items-center gap-2 mb-1">
        <UIcon name="i-lucide-warehouse" class="w-4 h-4 text-primary" />
        <span class="text-sm font-medium text-highlighted">Destino</span>
      </div>

      <UFormField class="flex justify-between items-center" label="Armazém">
        <USelectMenu
          class="w-60"
          placeholder="Selecionar armazém"
          :search-input="false"
          :items="armazens"
        />
      </UFormField>

      <UFormField label="Observações">
        <UTextarea
          class="w-full"
          placeholder="Observações sobre a entrada..."
          :rows="3"
        />
      </UFormField>

      <UButton class="mt-auto px-6 self-end" icon="i-lucide-save">
        Registar entrada
      </UButton>
    </div>
  </div>
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
