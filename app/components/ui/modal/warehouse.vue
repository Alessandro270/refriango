<template>
  <UForm class="w-full space-y-2">
    <UFormField label="Nome ">
      <UInput class="w-full" placeholder="Example xyz" />
    </UFormField>

    <UFormField label="Email">
      <UInput class="w-full" placeholder="example@example.xyz" />
    </UFormField>
    <UFormField label="Telefone">
      <UInput class="w-full" placeholder="+244 900 000 000" />
    </UFormField>

    <UFormField label="Localizacao">
      <UInput class="w-full" placeholder="example, avenida xyz" />
    </UFormField>

    <UFormField label="Capacidade">
      <UInput class="w-full" placeholder="example, avenida xyz" />
    </UFormField>
    <UButton
      icon="i-lucide-save"
      class="w-full flex justify-center items-center"
    >
      Salvar
    </UButton>
  </UForm>
</template>
