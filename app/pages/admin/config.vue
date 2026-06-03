<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const uiStyle = {
  label: 'text-ui-text',
  root: 'h-full',
  container: 'flex-1 flex flex-col'
}

const fileUploadStyle = { base: 'h-full' }
const formFieldSize = 'lg'
</script>

<template>
  <div class="space-y-4">
    <UiH1>CONFIGURACOES</UiH1>
    <UForm
      class="bg-white rounded-md px-6 py-6 gap-4 grid grid-cols-10 auto-rows-min"
    >
      <UiH3 class="col-start-3 row-start-1 col-span-8">
        Informacoes Da Conta
      </UiH3>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Primeiro Nome"
        class="row-start-2 col-start-3 col-span-4"
      >
        <UInput
          variant="outline"
          placeholder="Exemplo"
          trailing-icon="lucide:user"
        />
      </UFormField>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Ultimo Nome"
        class="row-start-2 col-span-4"
      >
        <UInput
          variant="outline"
          placeholder="Exemplo"
          trailing-icon="lucide:user"
        />
      </UFormField>
      <UFileUpload
        class="col-start-1 col-span-2 row-span-6"
        label="Foto De Perfil"
        :ui="fileUploadStyle"
        :size="formFieldSize"
      />
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Email"
        class="col-span-8"
      >
        <UInput
          variant="outline"
          type="email"
          trailing-icon="lucide:at-sign"
          placeholder="exemplo@exemplo.xyz"
        />
      </UFormField>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Senha"
        class="col-start-3 col-span-4"
      >
        <UInput
          variant="outline"
          type="password"
          leading-icon="lucide:user-lock"
          trailing-icon="lucide:eye"
          placeholder="exemplo123#"
        />
      </UFormField>

      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Confirmar Senha"
        class="col-span-4"
      >
        <UInput
          variant="outline"
          type="password"
          leading-icon="lucide:user-lock"
          trailing-icon="lucide:eye"
          placeholder="exemplo123#"
        />
      </UFormField>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Numero De Telefone"
        class="col-start-3 col-span-8"
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
        class="col-start-3 col-span-8"
      >
        <UInput variant="outline" type="date" />
      </UFormField>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Numero De BI"
        class="col-start-3 col-span-8"
      >
        <UInput
          variant="outline"
          trailing-icon="lucide:id-card"
          placeholder="000000000LA000"
        />
      </UFormField>
      <UButton
        icon="lucide:save-off"
        color="error"
        variant="soft"
        class="col-start-3 h-max col-span-2 flex items-center justify-center"
      >
        Descartar
      </UButton>
      <UButton
        icon="lucide:save"
        class="col-span-2 h-max flex items-center justify-center"
      >
        Salvar
      </UButton>
    </UForm>
  </div>
</template>
