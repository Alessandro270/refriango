<script setup lang="ts">
import * as z from 'zod'

definePageMeta({
  layout: 'auth'
})

const toast = useToast()

const uiStyle = {
  label: 'text-ui-text',
  container: 'flex-1 flex flex-col'
}

const formFieldSize = 'lg'

const showPass = ref(false)

const schema = z.object({
  firstname: z
    .string('Deve conter o primeiro nome')
    .min(3, 'Deve conter 3 digitos no minimo')
    .nonempty(),
  lastname: z
    .string('Deve conter o primeiro nome')
    .min(3, 'Deve conter 3 digitos no minimo'),
  email: z.email('Deve conter um email valido'),
  password: z
    .string('Deve conter a senha')
    .min(8, 'Deve conter 8 digitos no minimo')
    .nonempty('Senha não deve estar vazia')
})
const isLoading = ref(false)
const state = reactive({
  firstname: '',
  lastname: '',
  email: '',
  password: ''
})
const authStore = useAuthStore()

async function handleSubmit() {
  try {
    isLoading.value = true

    const body = schema.parse(state)

    await authStore.signup(body)
  } catch (e) {
    const tokens = e.message.split(' ')
    const message = tokens.slice(2).join(' ')

    toast.add({
      title: 'Nao foi possivel efetuar o login',
      description: message,
      icon: 'lucide:user-x'
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="h-screen bg-ui-bg flex flex-col items-center justify-center gap-4 p-4"
  >
    <UPageCard class="w-full max-w-md bg-white" variant="ghost">
      <UForm :schema="schema" :state="state" @submit="handleSubmit">
        <div class="flex items-center justify-center w-full py-3">
          <UiHeader size="lg" class="text-ui-text" />
        </div>

        <UFormField
          label="Primeiro nome"
          name="firstname"
          :size="formFieldSize"
          :ui="uiStyle"
          class="mb-4"
          required
        >
          <UInput
            v-model="state.firstname"
            variant="outline"
            placeholder="exemplo"
            trailing-icon="lucide:user"
          />
        </UFormField>

        <UFormField
          label="Ultimo nome"
          name="lastname"
          :size="formFieldSize"
          :ui="uiStyle"
          class="mb-4"
          required
        >
          <UInput
            v-model="state.lastname"
            variant="outline"
            placeholder="exemplo"
            trailing-icon="lucide:user"
          />
        </UFormField>

        <UFormField
          label="Email"
          name="email"
          :size="formFieldSize"
          :ui="uiStyle"
          class="mb-4"
          required
        >
          <UInput
            v-model="state.email"
            type="email"
            variant="outline"
            placeholder="exemplo@gmail.com"
            trailing-icon="lucide:mail"
          />
        </UFormField>
        <UFormField
          label="Senha"
          name="password"
          :size="formFieldSize"
          :ui="uiStyle"
          class="mb-6"
          required
        >
          <UFieldGroup>
            <UInput
              v-model="state.password"
              :type="showPass ? 'text' : 'password'"
              variant="outline"
              placeholder="sua senha"
              class="w-full"
              icon="lucide:user-lock"
            />
            <UButton
              variant="outline"
              :icon="showPass ? 'lucide:eye-closed' : 'lucide:eye'"
              @click="showPass = !showPass"
            >
            </UButton>
          </UFieldGroup>
        </UFormField>
        <UButton
          type="submit"
          class="flex items-center justify-center w-full mb-4"
          :icon="isLoading ? '' : 'lucide:save'"
          variant="solid"
          color="neutral"
        >
          <template v-if="!isLoading"> Cadastrar usuario </template>
          <template v-else>
            <UiLoader />
          </template>
        </UButton>
        <div class="text-center text-sm text-ui-text dark:text-gray-400">
          <NuxtLink to="/" class="text-primary font-medium hover:underline">
            Voltar ao dashboard
          </NuxtLink>
        </div>
      </UForm>
    </UPageCard>
  </div>
</template>
