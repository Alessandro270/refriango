<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  name: z
    .string()
    .min(3, 'Deve ter pelo menos 3 digitos')
    .nonempty('Nome obrigatorio'),
  email: z.email('Email invalido').nonempty('Deve ter um email'),
  phone: z.e164('Formato +244900000000').optional(),
  address: z.string().optional()
})

const state = reactive({
  name: '',
  email: '',
  phone: '',
  address: undefined
})
const emit = defineEmits<{ close: [] }>()

const isLoading = ref(false)
const toast = useToast()
const supplierStore = useSupplierStore()

async function handleSubmit() {
  try {
    isLoading.value = true
    const data = schema.parse(state)
    await supplierStore.createSupplier(data)
  } catch (e) {
    toast.add({
      title: 'Nao foi possivel adicionar fornecedor',
      icon: 'lucide:file-x'
    })
  } finally {
    isLoading.value = false
    emit('close')
  }
}
</script>

<template>
  <UForm
    class="w-full flex flex-col flex-1 space-y-2"
    :state="state"
    :schema="schema"
    @submit="handleSubmit"
  >
    <UFormField label="Nome" name="name" required>
      <UInput
        v-model="state.name"
        trailing-icon="lucide:users"
        class="w-full"
        placeholder="Example xyz"
      />
    </UFormField>
    <UFormField label="Email" name="email" required>
      <UInput
        v-model="state.email"
        type="email"
        class="w-full"
        placeholder="exemplo@exemplo.xyz"
        trailing-icon="lucide:mail"
      />
    </UFormField>

    <UFormField label="Telefone" name="phone" required>
      <UInput
        v-model="state.phone"
        class="w-full"
        trailing-icon="lucide:phone-call"
        placeholder="+244900000000"
      />
    </UFormField>

    <UFormField label="Endereco" name="address">
      <UInput
        v-model="state.address"
        class="w-full"
        trailing-icon="lucide:map-pin"
        placeholder="example, avenida xyz"
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
