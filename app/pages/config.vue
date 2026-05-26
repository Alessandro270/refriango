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
      class="bg-white rounded-md px-6 py-6 gap-4 grid grid-cols-12 auto-rows-max"
    >
      <UiH3 class="col-start-3 col-span-full row-start-1">
        Informacoes Da Conta
      </UiH3>
      <UFormField
        size="xl"
        :ui="uiStyle"
        label="Primeiro Nome"
        class="row-start-2 col-start-3 col-span-5"
      >
        <UInput :ui="inputStyle" />
      </UFormField>
      <UFormField
        size="xl"
        :ui="uiStyle"
        label="Ultimo Nome"
        class="row-start-2 col-span-5"
      >
        <UInput :ui="inputStyle" />
      </UFormField>
      <UFileUpload
        class="col-start-1 col-span-2 row-start-1 row-span-4"
        label="Foto de perfil"
        :ui="fileUploadStyle"
        size="xl"
      />

      <UFormField
        size="xl"
        :ui="uiStyle"
        label="Senha"
        class="col-start-3 row-start-3 col-span-5"
      >
        <UInput :ui="inputStyle" />
      </UFormField>
      <UFormField
        size="xl"
        :ui="uiStyle"
        label="Confirmar Senha"
        class="row-start-3 col-span-5"
      >
        <UInput :ui="inputStyle" />
      </UFormField>
      <UFormField
        size="xl"
        :ui="uiStyle"
        label="Numero De Telefone"
        class="row-start-4 col-start-3 col-span-10"
      >
        <UInput :ui="inputStyle" />
      </UFormField>
      <UFormField
        size="xl"
        :ui="uiStyle"
        label="Data De Nascimento"
        class="row-start-5 col-start-3 col-span-10"
      >
        <UInput :ui="inputStyle" />
      </UFormField>
      <UFormField
        size="xl"
        :ui="uiStyle"
        label="Numero De BI"
        class="row-start-6 col-start-3 col-span-10"
      >
        <UInput :ui="inputStyle" />
      </UFormField>
      <UButton
        icon="lucide:save-off"
        color="error"
        variant="solid"
        class="col-start-9 col-span-2 flex items-center justify-center"
      >
        Descartar Alteracoes
      </UButton>
      <UButton
        icon="lucide:save"
        class="col-span-2 flex items-center justify-center"
      >
        Salvar Alteracoes
      </UButton>
    </UForm>
  </div>
</template>
