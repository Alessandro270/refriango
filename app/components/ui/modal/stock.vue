<template>
  <div class="flex w-full gap-8">
    <UForm class="overflow-y-auto flex flex-col max-h-120 space-y-3 w-1/2 pr-2">
      <UFormField class="flex justify-between items-center" label="Nome">
        <UInput class="w-60" placeholder="Nome do produto" />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Categoria">
        <USelectMenu
          class="w-60"
          placeholder="Selecionar categoria"
          :options="[]"
        />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="SKU">
        <UInput class="w-60" placeholder="Ex: SCMH340" />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Preço de venda">
        <UInput class="w-60" type="number" placeholder="0.00" />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Preço de compra">
        <UInput class="w-60" type="number" placeholder="0.00" />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Ponto de restock">
        <UInput class="w-60" type="number" placeholder="0" />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Mínimo">
        <UInput class="w-60" type="number" placeholder="0" />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Máximo">
        <UInput class="w-60" type="number" placeholder="0" />
      </UFormField>

      <UDivider class="my-1" />

      <UFormField class="flex justify-between items-center" label="Data de validade">
        <UInput class="w-60" type="date" />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Peso (kg)">
        <UInput class="w-60" type="number" step="0.01" placeholder="0.00" />
      </UFormField>

      <UFormField class="flex justify-between items-center" label="Refrigerado">
        <UCheckbox  color="neutral" />
      </UFormField>
    </UForm>

    <!-- Right column: image + description + dimensions -->
    <div class="w-1/2 space-y-4">
      <!-- Image preview -->
      <div
        class="w-full h-50 bg-gray-100 dark:bg-gray-800 rounded-md border border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-2 overflow-hidden relative group cursor-pointer"
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

      <!-- Image file name feedback -->
      <p v-if="fileName" class="text-xs text-gray-500 dark:text-gray-400 truncate -mt-2">
        {{ fileName }}
      </p>

      <!-- Description -->
      <UFormField label="Descrição">
        <UTextarea class="w-full" placeholder="Descrição do produto..." :rows="3" />
      </UFormField>

      <!-- Dimensions -->
      <UFormField label="Dimensões (C × L × A em cm)">
        <div class="flex items-center gap-2">
          <UInput class="w-full" type="number" placeholder="Comp." />
          <span class="text-gray-400 dark:text-gray-500 text-sm font-medium">×</span>
          <UInput class="w-full" type="number" placeholder="Larg." />
          <span class="text-gray-400 dark:text-gray-500 text-sm font-medium">×</span>
          <UInput class="w-full" type="number" placeholder="Alt." />
        </div>
      </UFormField>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)
const fileName = ref<string | null>(null)

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  fileName.value = file.name
  const reader = new FileReader()
  reader.onload = (e) => {
    previewUrl.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}
</script>