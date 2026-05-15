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
    class="h-screen bg-grays-800 flex flex-col items-center justify-center gap-4 p-4"
  >
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        description="Coloque suas credenciais para fazer login"
        :fields="fields"
        variant="ghost"
        :submit="{
          label: 'Fazer login',
          color: 'error',
          variant: 'subtle',
        }"
      >
        <template #title>
          <div class="flex items-center justify-center w-full py-3">
            <UiHeader size="lg" />
          </div>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
