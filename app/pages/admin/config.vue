<script setup lang="ts">
import * as z from 'zod'

definePageMeta({ layout: 'admin' })

const authStore = useAuthStore()
const userStore = useUserStore()
const uiStyle = {
  label: 'text-ui-text',
  root: 'h-full',
  container: 'flex-1 flex flex-col'
}

const formFieldSize = 'lg'
const updateUserSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().optional()
})

const passwordSchema = z.object({
  password: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional()
})

const updateUserState = reactive({
  firstname: authStore.user?.firstname,
  lastname: authStore.user?.lastname,
  email: authStore.user?.email
})

onMounted(async () => {
  await authStore.getAuthUser()
  console.log(authStore.user)

  updateUserState.firstname = authStore.user?.firstname
  updateUserState.lastname = authStore.user?.lastname
  updateUserState.email = authStore.user?.email
})

const passwordState = {
  password: undefined,
  newPassword: undefined,
  confirmPassword: undefined
}
const updateUserIsLoading = ref<boolean>(false)
const passwordIsLoading = ref<boolean>(false)

async function handleResetPassword() {
  passwordIsLoading.value = true
  try {
    const data = passwordSchema.parse(passwordState)
    await authStore.resetPassword(data)
  } finally {
    passwordIsLoading.value = false
  }
}

async function handleUpdateUser() {
  updateUserIsLoading.value = true
  try {
    const data = updateUserSchema.parse(updateUserState)

    console.log(data)

    await userStore.updateLoggedUser(data)
    await authStore.getAuthUser()
  } finally {
    updateUserIsLoading.value = false
  }
}
</script>

<template>
  <div class="space-y-4">
    <UiH1 icon="lucide:settings">CONFIGURACOES</UiH1>
    <UForm
      class="bg-white rounded-md px-6 py-6 gap-4 grid grid-cols-10 auto-rows-min"
      :state="updateUserState"
      :schema="updateUserSchema"
      @submit="handleUpdateUser"
    >
      <UiH3 class="col-span-8"> Informacoes Da Conta </UiH3>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Primeiro Nome"
        class="col-span-5"
        name="firstname"
      >
        <UInput
          v-model="updateUserState.firstname"
          variant="outline"
          placeholder="Exemplo"
          trailing-icon="lucide:user"
        />
      </UFormField>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Último Nome"
        name="lastname"
        class="col-span-5"
      >
        <UInput
          v-model="updateUserState.lastname"
          variant="outline"
          placeholder="Exemplo"
          trailing-icon="lucide:user"
        />
      </UFormField>
      <!-- <UFileUpload
        class="col-start-1 col-span-2 row-span-6"
        label="Foto De Perfil"
        :ui="fileUploadStyle"
        :size="formFieldSize"
      /> -->
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Email"
        class="col-span-full"
        name="email"
      >
        <UInput
          v-model="updateUserState.email"
          variant="outline"
          type="email"
          trailing-icon="lucide:mail"
          placeholder="exemplo@exemplo.xyz"
        />
      </UFormField>
      <UiSaveBtn class="w-max px-6 ml-auto" :is-loading="updateUserIsLoading" />
    </UForm>

    <UForm
      class="bg-white rounded-md px-6 py-6 gap-4 grid grid-cols-10 auto-rows-min"
      :state="passwordState"
      :schema="passwordSchema"
      @submit="handleResetPassword"
    >
      <UiH3 class="col-span-8"> Atualizar senha </UiH3>
      <UiPassword
        :size="formFieldSize"
        :ui="uiStyle"
        label="Senha atual"
        class="col-span-full"
        name="password"
        v-model="passwordState.password"
      />

      <UiPassword
        :size="formFieldSize"
        :ui="uiStyle"
        label="Nova senha"
        class="col-span-full"
        name="newPassword"
        v-model="passwordState.newPassword"
      />

      <UiPassword
        :size="formFieldSize"
        :ui="uiStyle"
        label="Confirmar Senha"
        name="confirmPassword"
        class="col-span-full"
        v-model="passwordState.confirmPassword"
      />

      <UiSaveBtn class="w-max px-6 ml-auto" :is-loading="passwordIsLoading" />

      <!-- <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Número De Telefone"
        class="col-span-8"
      >
        <UInput
          variant="outline"
          trailing-icon="lucide:phone-call"
          placeholder="+244 900 000 000"
        />
      </UFormField>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Data De Nascimento"
        class="col-span-8"
      >
        <UInput variant="outline" type="date" />
      </UFormField>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Número De BI"
        class="col-span-8"
      >
        <UInput
          variant="outline"
          trailing-icon="lucide:id-card"
          placeholder="000000000LA000"
        />
      </UFormField> -->
    </UForm>
  </div>
</template>
