<script setup lang="ts"></script>

<template>
  <UForm class="grid grid-cols-2 gap-6 flex-1">
    <UFormField label="Fornecedor">
      <UInput class="w-full" disabled type="text" />
    </UFormField>

    <UFormField label="Cliente">
      <UInput class="w-full" disabled type="text" />
    </UFormField>

    <UFormField label="Email" class="col-span-2">
      <UInput class="w-full" disabled type="email" />
    </UFormField>

    <UFormField label="Data de entrega">
      <UInput class="w-full" disabled type="date" />
    </UFormField>

    <UFormField label="Data esperada">
      <UInput class="w-full" disabled type="date" />
    </UFormField>

    <UFormField label="Localizacao">
      <UInput class="w-full" disabled type="text" />
    </UFormField>

    <UFormField label="Data de pedido">
      <UInput class="w-full" disabled type="date" />
    </UFormField>

    <UFormField label="Telefone">
      <UInput class="w-full" disabled type="text" />
    </UFormField>

    <UFormField label="Estado">
      <UInput class="w-full" disabled type="text" />
    </UFormField>
    <UFormField label="Observacoes" class="col-span-2">
      <UTextarea class="w-full" disabled type="text" />
    </UFormField>
  </UForm>
</template>
