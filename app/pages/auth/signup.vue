<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const toast = useToast();

const fields: AuthFormField[] = [
  {
    name: "firstname",
    type: "text",
    label: "Primeiro nome",
    placeholder: "Seu primeiro nome",
    color: "neutral",
    required: true,
  },
  {
    name: "lastname",
    type: "text",
    label: "Último nome",
    placeholder: "Seu último nome",
    color: "neutral",
    required: true,
  },
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
];

async function onSubmit(payload: Record<string, any>) {
  try {
    console.log(payload);

    toast.add({
      title: "Conta criada",
      description: "Seu cadastro foi realizado com sucesso.",
      color: "success",
    });
  } catch (error) {
    toast.add({
      title: "Erro",
      description: "Não foi possível criar a conta.",
      color: "error",
    });
  }
}
</script>

<template>
  <div
    class="h-screen bg-grays-800 flex flex-col items-center justify-center gap-4 p-4"
  >
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        title="Criar conta"
        description="Preencha os dados abaixo para criar sua conta"
        :fields="fields"
        variant="ghost"
        :submit="{
          label: 'Criar conta',
          color: 'error',
          variant: 'subtle',
        }"
        @submit="onSubmit"
      >
        <template #title>
          <div class="flex items-center justify-center w-full py-3">
            <UiHeader size="lg" />
          </div>
        </template>

        <template #footer>
          <div class="text-center text-sm text-gray-400">
            Já possui uma conta?
            <NuxtLink
              to="/login"
              class="text-primary font-medium hover:underline"
            >
              Fazer login
            </NuxtLink>
          </div>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
