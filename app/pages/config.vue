<script setup lang="ts">
const uiStyle = {
  label: 'text-ui-text',
  root: 'h-full',
  container: 'flex-1 flex flex-col mt-1'
}
const inputStyle = {
  label: 'text-ui-text',
  root: 'h-full',
  container: 'flex-1 flex flex-col mt-1'
}

const fileUploadStyle = { base: 'h-full' }
</script>

<template>
  <div class="space-y-4">
    <UiH1>CONFIGURACOES</UiH1>
    <UForm
      class="bg-white rounded-md px-6 py-6 gap-4 grid grid-cols-12 auto-rows-fr"
    >
      <UFormField
        :ui="uiStyle"
        label="Primeiro Nome"
        class="col-start-3 col-span-5"
      >
        <UInput :ui="inputStyle" />
      </UFormField>
      <UFormField :ui="uiStyle" label="Ultimo Nome" class="col-span-5">
        <UInput :ui="inputStyle" />
      </UFormField>
      <UFileUpload
        class="col-start-1 col-span-2 row-start-1 row-span-2"
        label="Foto de perfil"
        :ui="fileUploadStyle"
      />

      <UFormField :ui="uiStyle" label="Senha" class="row-start-2 col-span-5">
        <UInput :ui="inputStyle" />
      </UFormField>
      <UFormField
        :ui="uiStyle"
        label="Confirmar Senha"
        class="row-start-2 col-span-5"
      >
        <UInput :ui="inputStyle" />
      </UFormField>
      <UFormField
        :ui="uiStyle"
        label="Numero De Telefone"
        class="row-start-3 col-start-3 col-span-10"
      >
        <UInput :ui="inputStyle" />
      </UFormField>
      <UFormField
        :ui="uiStyle"
        label="Data De Nascimento"
        class="row-start-4 col-start-3 col-span-10"
      >
        <UInput :ui="inputStyle" />
      </UFormField>
      <UFormField
        :ui="uiStyle"
        label="Numero De BI"
        class="row-start-5 col-start-3 col-span-10"
      >
        <UInput :ui="inputStyle" />
      </UFormField>
    </UForm>
  </div>
</template>
