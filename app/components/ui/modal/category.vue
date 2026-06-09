<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  name: z
    .string('Deve conter um nome!')
    .min(3, 'Deve conter 3 caracteres min.!')
    .nonempty('Deve conter um nome!'),
  description: z.string().optional()
})

const { action, data: category } = defineProps<{
  action?: 'create' | 'update'
  data?: Category
}>()

const isLoading = ref(false)
const categoryStore = useCategoryStore()
const state = reactive<Category>({ ...category } || {})

const emit = defineEmits<{
  close: []
}>()

async function handleSubmit() {
  isLoading.value = true
  try {
    const data = schema.parse(state)
    if (action === 'update') await categoryStore.update(category.id, data)
    else await categoryStore.create(data)
  } finally {
    isLoading.value = false
    emit('close')
  }
}
const uiStyle = {
  base: 'w-full text-zinc-300 block '
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="w-full space-y-2 flex flex-col flex-1"
    @submit="handleSubmit"
  >
    <UFormField label="Nome" name="name" required>
      <UInput
        v-model="state.name"
        class="w-full"
        placeholder="Example xyz"
        trailing-icon="lucide:chart-column-stacked"
      />
    </UFormField>
    <UFormField label="Descricao" name="description">
      <UTextarea
        v-model="state.description"
        class="w-full"
        :ui="uiStyle"
        placeholder="example@example.com"
      />
    </UFormField>

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
