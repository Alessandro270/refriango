<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  firstname: z
    .string('Obrigatório')
    .min(3, 'Deve ter pelo menos 3 digitos')
    .nonempty('Obrigatório'),
  lastname: z
    .string('Obrigatório')
    .min(3, 'Deve ter pelo menos 3 digitos')
    .nonempty('Obrigatório'),
  email: z.email('Email invalido').nonempty('Deve ter um email'),
  password: z
    .string('Obrigatório')
    .min(8, 'Deve ter pelo menos 8 digitos')
    .nonempty('Obrigatório'),
  confirmPassword: z
    .string('Obrigatório')
    .min(8, 'Deve ter pelo menos 8 digitos')
    .nonempty('Obrigatório')
})

const state = reactive({
  firstname: undefined,
  lastname: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined
})

const emit = defineEmits<{ close: [] }>()

const isLoading = ref(false)
const toast = useToast()
const userStore = useUserStore()

async function handleSubmit() {
  try {
    isLoading.value = true
    const data = schema.parse(state)
    console.log(data)
    await userStore.create(data)
  } catch (e) {
    toast.add({
      title: 'Não foi possível adicionar usuário',
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
    class="w-full grid grid-cols-12 gap-2 flex-1"
    :state="state"
    :schema="schema"
    @submit="handleSubmit"
  >
    <UFormField
      class="col-span-6"
      label="Primeiro Nome"
      name="firstname"
      required
    >
      <UInput
        v-model="state.firstname"
        trailing-icon="lucide:user"
        class="w-full"
        placeholder="Example xyz"
      />
    </UFormField>

    <UFormField class="col-span-6" label="Ultimo Nome" name="lastname" required>
      <UInput
        v-model="state.lastname"
        trailing-icon="lucide:user"
        class="w-full"
        placeholder="Example xyz"
      />
    </UFormField>
    <UFormField class="col-span-full" label="Email" name="email" required>
      <UInput
        v-model="state.email"
        type="email"
        class="w-full"
        placeholder="exemplo@exemplo.xyz"
        trailing-icon="lucide:mail"
      />
    </UFormField>

    <UFormField class="col-span-full" label="Senha" name="password" required>
      <UInput
        v-model="state.password"
        class="w-full"
        trailing-icon="lucide:key-round"
        placeholder="colocar senha.."
        type="password"
      />
    </UFormField>

    <UFormField
      class="col-span-full"
      label="Confirmar senha"
      name="confirmPassword"
      required
    >
      <UInput
        v-model="state.confirmPassword"
        class="w-full"
        trailing-icon="lucide:user-lock"
        placeholder="confirmar a senha.."
        type="password"
      />
    </UFormField>
    <UButton
      :icon="isLoading ? '' : 'lucide:save'"
      class="w-full col-span-full flex mt-auto justify-center items-center"
      type="submit"
    >
      <template v-if="!isLoading"> Salvar </template>
      <UiLoader v-else />
    </UButton>
  </UForm>
</template>
