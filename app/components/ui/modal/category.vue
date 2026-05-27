<template>
  <UForm class="w-full space-y-2">
    <UFormField label="Nome">
      <UInput class="w-full" placeholder="Example xyz" />
    </UFormField>
    <UFormField label="Descricao">
      <UTextarea class="w-full" placeholder="example@example.com" />
    </UFormField>

    <UButton
      icon="i-lucide-save"
      class="w-full flex justify-center items-center"
    >
      Salvar
    </UButton>
  </UForm>
</template>
