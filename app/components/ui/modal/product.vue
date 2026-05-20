<template>
  <UForm class="flex flex-col overflow-y-auto w-full gap-8">
    <div class="space-y-4 flex flex-col">
      <div class="flex items-center gap-2 mb-3">
        <UIcon name="i-lucide-image" class="w-4 h-4 text-primary" />
        <span class="text-sm font-medium text-highlighted">Imagem</span>
      </div>

      <div
        class="w-full h-50 bg-gray-100 dark:bg-gray-800 rounded-md border border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-2 overflow-hidden relative group cursor-pointer -mt-1"
      >
        <template v-if="previewUrl">
          <img
            :src="previewUrl"
            alt="Pré-visualização do produto"
            class="w-full h-full object-contain rounded-md"
          />
          <div
            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md"
          >
            <span class="text-white text-sm font-medium">Alterar imagem</span>
          </div>
        </template>
        <template v-else>
          <UIcon name="i-lucide-image-plus" class="w-8 h-8 text-gray-400" />
          <span class="text-sm text-gray-400">Clique para carregar imagem</span>
        </template>

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="absolute inset-0 opacity-0 cursor-pointer"
          @change="onFileChange"
        />
      </div>

      <p
        v-if="fileName"
        class="text-xs text-gray-500 dark:text-gray-400 truncate -mt-2"
      >
        {{ fileName }}
        =
      </p>

      <div class="flex items-center gap-2 mb-1">
        <UIcon name="i-lucide-ruler" class="w-4 h-4 text-primary" />
        <span class="text-sm font-medium text-highlighted">Detalhes</span>
      </div>

      <UFormField label="Descrição">
        <UTextarea
          class="w-full"
          placeholder="Descrição do produto..."
          :rows="3"
        />
      </UFormField>

      <UFormField label="Dimensões (C × L × A em cm)">
        <div class="flex items-center gap-2">
          <UInput class="w-full" type="number" placeholder="Comp." />
          <span class="text-gray-400 dark:text-gray-500 text-sm font-medium"
            >×</span
          >
          <UInput class="w-full" type="number" placeholder="Larg." />
          <span class="text-gray-400 dark:text-gray-500 text-sm font-medium"
            >×</span
          >
          <UInput class="w-full" type="number" placeholder="Alt." />
        </div>
      </UFormField>
    </div>

    <div class="flex flex-col space-y-3">
      <div class="flex items-center gap-2 mb-1">
        <UIcon name="i-lucide-tag" class="w-4 h-4 text-primary" />
        <span class="text-sm font-medium text-highlighted">Identificação</span>
      </div>

      <UFormField class="flex justify-between items-center" label="Nome">
        <UInput class="w-60" placeholder="Nome do produto" />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Categoria">
        <USelectMenu
          class="w-60"
          placeholder="Selecionar categoria"
          :search-input="true"
          :items="[]"
        />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="SKU">
        <UInput
          class="w-60"
          placeholder="Ex: SCMH340"
          icon="i-lucide-scan-barcode"
          :disabled="true"
        />
      </UFormField>

      <div class="flex items-center gap-2 mb-1">
        <UIcon
          name="i-lucide-circle-dollar-sign"
          class="w-4 h-4 text-primary"
        />
        <span class="text-sm font-medium text-highlighted">Preços</span>
      </div>

      <UFormField
        class="flex justify-between items-center"
        label="Preço de venda"
      >
        <UInput
          class="w-60"
          type="number"
          placeholder="0.00"
          icon="i-lucide-dollar-sign"
        />
      </UFormField>

      <UFormField
        class="flex justify-between items-center"
        label="Preço de compra"
      >
        <UInput
          class="w-60"
          type="number"
          placeholder="0.00"
          icon="i-lucide-dollar-sign"
        />
      </UFormField>

      <div class="flex items-center gap-2 mb-1">
        <UIcon
          name="i-lucide-chart-no-axes-combined"
          class="w-4 h-4 text-primary"
        />
        <span class="text-sm font-medium text-highlighted"
          >Controlo de stock</span
        >
      </div>

      <UFormField
        class="flex justify-between items-center"
        label="Ponto de restock"
      >
        <UInput class="w-60" type="number" placeholder="0" />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Mínimo">
        <UInput class="w-60" type="number" placeholder="0" />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Máximo">
        <UInput class="w-60" type="number" placeholder="0" />
      </UFormField>

      <div class="flex items-center gap-2 mb-1">
        <UIcon name="i-lucide-info" class="w-4 h-4 text-primary" />
        <span class="text-sm font-medium text-highlighted"
          >Atributos físicos</span
        >
      </div>

      <UFormField
        class="flex justify-between items-center"
        label="Data de validade"
      >
        <UInput class="w-60" type="date" />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Peso (kg)">
        <UInput class="w-60" type="number" step="0.01" placeholder="0.00" />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Refrigerado">
        <UCheckbox color="neutral" />
      </UFormField>

      <UButton class="mt-auto px-6 self-end" icon="i-lucide-save">
        Salvar
      </UButton>
    </div>

  </UForm>
</template>

<script setup lang="ts">
import { ref } from "vue";

const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);
const fileName = ref<string | null>(null);

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  fileName.value = file.name;
  const reader = new FileReader();
  reader.onload = (e) => {
    previewUrl.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}
</script>
