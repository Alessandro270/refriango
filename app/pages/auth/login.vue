<script setup lang="ts">
import * as z from 'zod'
definePageMeta({
  layout: 'auth'
})
const toast = useToast()

const schema = z.object({
  email: z.email('Email invalido').nonempty('Campo obrigatorio'),
  password: z
    .string('A senha deve ser uma string')
    .min(8, 'A senha deve ter no minimo 8 caracteres')
    .nonempty('Campo obrigatorio')
})

const isLoading = ref(false)

const state = reactive({
  email: undefined,
  password: undefined
})

const authStore = useAuthStore()
async function handleSubmit() {
  try {
    isLoading.value = true

    const body = schema.parse(state)

    await authStore.login(body)
    await navigateTo('/')
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

const showPass = ref(false)

const uiStyle = {
  label: 'text-ui-text',
  container: 'flex-1 flex flex-col'
}

const formFieldSize = 'lg'
</script>

<template>
  <div
    class="h-screen bg-ui-bg flex flex-col items-center justify-center gap-4 p-4"
  >
    <UPageCard
      class="w-full max-w-md rounded-sm h-max bg-white space-y-3"
      variant="ghost"
      color="neutral"
    >
      <div class="flex items-center justify-center w-full">
        <UiHeader class="text-ui-text" size="lg" />
      </div>
      <UForm :schema="schema" :state="state" @submit="handleSubmit">
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
          color="neutral"
          variant="solid"
          class="flex justify-center items-center w-full"
        >
          <template v-if="!isLoading"> Fazer login </template>
          <template v-else>
            <UiLoader />
          </template>
        </UButton>
      </UForm>
      <div class="text-center text-sm text-ui-text dark:text-zinc-500">
        Ainda nao possui uma conta?
        <NuxtLink
          to="/auth/signup"
          class="text-amber-500 font-medium hover:underline"
        >
          Cadastre-se
        </NuxtLink>
      </div>
    </UPageCard>
  </div>
</template>
