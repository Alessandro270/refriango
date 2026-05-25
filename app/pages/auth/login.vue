<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const toast = useToast();
const fields: AuthFormField[] = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "example@example.xyz",
    color: "neutral",
    required: true,
  },
  {
    name: "password",
    label: "Senha",
    type: "password",
    placeholder: "Sua senha",
    color: "neutral",
    required: true,
  },
  {
    name: "remember",
    label: "Lembrar de mim",
    type: "checkbox",
  },
];
</script>

<template>
  <div
    class="h-screen bg-ui-bg dark:bg-grays-800 flex flex-col items-center justify-center gap-4 p-4"
  >
    <UPageCard
      class="w-full max-w-md bg-white dark:bg-grays-900"
      variant="ghost"
      color="neutral"
    >
      <UAuthForm
        :fields="fields"
        variant="solid"
        :submit="{
          label: 'Fazer login',
          color: 'neutral',
          variant: 'solid',
        }"
      >
        <template #header>
          <div class="flex items-center justify-center w-full">
            <UiHeader size="lg" />
          </div>
        </template>
        
        <template #footer>
          <div class="text-center text-sm text-ui-text dark:text-gray-400">
            Ainda nao possui uma conta?
            <NuxtLink
              to="/auth/signup"
              class="text-primary font-medium hover:underline"
            >
              Cadastre-se
            </NuxtLink>
          </div>
        </template>
      </UAuthForm>
      
    </UPageCard>
  </div>
</template>
