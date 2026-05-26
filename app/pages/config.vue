<script setup lang="ts">
const uiStyle = {
  label: 'text-ui-text',
  root: 'h-full',
  container: 'flex-1 flex flex-col'
}

const inputStyle = {
  label: 'text-ui-text',
  root: 'h-full'
}

const inputDateStyle = {
  base: '[&::-webkit-calendar-picker-indicator]:hidden',
  trailingIcon: 'text-primary size-5'
}

const fileUploadStyle = { base: 'h-full' }
const formFieldSize = 'lg'
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
        :size="formFieldSize"
        :ui="uiStyle"
        label="Primeiro Nome"
        class="row-start-2 col-start-3 col-span-5"
      >
        <UInput
          variant="outline"
          :ui="inputStyle"
          placeholder="Exemplo"
          trailing-icon="lucide:user"
        />
      </UFormField>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Ultimo Nome"
        class="row-start-2 col-span-5"
      >
        <UInput
          variant="outline"
          :ui="inputStyle"
          placeholder="Exemplo"
          trailing-icon="lucide:user"
        />
      </UFormField>
      <UFileUpload
        class="col-start-1 col-span-2 row-start-1 row-span-4"
        label="Foto De Perfil"
        :ui="fileUploadStyle"
        :size="formFieldSize"
      />
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="email"
        class="col-span-10"
      >
        <UInput
          variant="outline"
          :ui="inputStyle"
          type="email"
          trailing-icon="lucide:at-sign"
          placeholder="exemplo@exemplo.xyz"
        />
      </UFormField>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Senha"
        class="col-start-3 col-span-5"
      >
        <UInput
          variant="outline"
          :ui="inputStyle"
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
        class="col-span-5"
      >
        <UInput
          variant="outline"
          :ui="inputStyle"
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
        class="col-start-3 col-span-10"
      >
        <UInput
          variant="outline"
          :ui="inputStyle"
          trailing-icon="lucide:phone-call"
          placeholder="+244 900 000 000"
        />
      </UFormField>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Data De Nascimento"
        class="col-start-3 col-span-10"
      >
        <UInput
          variant="outline"
          type="date"
          :ui="{ ...inputStyle, ...inputDateStyle }"
        />
      </UFormField>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Numero De BI"
        class="col-start-3 col-span-10"
      >
        <UInput
          variant="outline"
          :ui="inputStyle"
          trailing-icon="lucide:id-card"
          placeholder="000000000LA000"
        />
      </UFormField>
      <UButton
        icon="lucide:save-off"
        color="error"
        variant="soft"
        class="col-start-3 h-9 col-span-2 flex items-center justify-center"
      >
        Descartar Alteracoes
      </UButton>
      <UButton
        icon="lucide:save"
        class="h-10 col-span-2 flex items-center justify-center"
      >
        Salvar Alteracoes
      </UButton>
    </UForm>
  </div>
</template>
