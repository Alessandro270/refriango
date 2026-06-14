<script setup lang="ts">
import * as z from 'zod'

const { store } = defineProps<{ store: any }>()

const schema = z.object({
  file: z
    .file('Ficheiro inválido')
    .min(1)
    .max(Math.pow(1024, 2), 'Máximo de 1MB')
    .mime(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Ficheiro inválido, *.xlsx esperado'
    )
})

const isLoading = ref(false)
const state = reactive({ file: null })

const emit = defineEmits<{
  close: []
}>()

const uiStyle = {
  base: 'w-full text-zinc-300 block '
}

const open = ref<boolean>(false)

async function handleUpload() {
  isLoading.value = true
  try {
    const data = schema.parse(state)
    const formData = new FormData()

    formData.append('file', data.file)
    await store.upload(formData)
    await store.getAll()
    state.file = null
  } finally {
    isLoading.value = false
    open.value = false
  }
}
</script>

<template>
  <UModal v-model:open="open">
    <template #header>
      <UiModalTitle @close="open = false"> Carregar ficheiro </UiModalTitle>
    </template>
    <UButton icon="lucide:upload" variant="outline">Importar</UButton>
    <template #body>
      <UForm
        :state="state"
        :schema="schema"
        class="w-full space-y-4 flex flex-col flex-1"
        @submit="handleUpload"
      >
        <UFormField label="Enviar *.xlsx" name="file" required>
          <UFileUpload
            v-model="state.file"
            class="w-full"
            placeholder="Example xyz"
            trailing-icon="lucide:chart-column-stacked"
          />
        </UFormField>
        <UButton
          :icon="isLoading ? '' : 'lucide:check'"
          class="w-full flex mt-auto justify-center items-center"
          type="submit"
        >
          <template v-if="!isLoading"> Salvar </template>
          <UiLoader v-else />
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>
