<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  name: z
    .string('Deve conter um nome!')
    .min(3, 'Deve conter 3 caracteres min.!')
    .nonempty('Deve conter um nome!'),
  description: z.string().optional()
})

const isLoading = ref(false)
const toast = useToast()
const categoryStore = useCategoryStore()
const state = reactive({ name: '', description: '' })
const emit = defineEmits<{
  close: []
}>()

async function handleSubmit() {
  isLoading.value = true
  try {
    const data = schema.parse(state)
    await categoryStore.createCategory(data)
  } catch (e) {
    toast.add({
      title: 'Categoria nao adicionada',
      icon: 'lucide:file-x'
    })
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
      <UInput v-model="state.name" class="w-full" placeholder="Example xyz" />
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
