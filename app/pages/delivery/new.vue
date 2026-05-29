<script setup lang="ts">
const uiStyle = {
  label: 'text-ui-text',
  root: 'h-full',
  container: 'flex-1 flex flex-col'
}

const uiInputStyle = { base: 'h-full text-zinc-700 placeholder:text-zinc-400 ' }
const formFieldSize = 'lg'
</script>

<template>
  <UForm
    class="bg-white rounded-md px-6 py-6 gap-4 grid grid-cols-12 auto-rows-min"
  >
    <UiH3 class="col-span-full">nova entrega</UiH3>
    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Fornecedor"
      class="col-span-6"
    >
      <UInput
        variant="outline"
        trailing-icon="lucide:handshake"
        :ui="uiInputStyle"
        class="w-full"
        type="text"
        placeholder="Exemplo"
      />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Cliente"
      class="col-span-6"
    >
      <UInput
        trailing-icon="lucide:user"
        variant="outline"
        :ui="uiInputStyle"
        class="w-full"
        type="text"
        placeholder="Exemplo"
      />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Localizacao"
      class="col-span-7"
    >
      <UFieldGroup>
        <UInput
          variant="outline"
          :ui="uiInputStyle"
          class="w-full"
          type="text"
          placeholder="Pais, provincia, municipio"
        />
        <UButton variant="outline" icon="lucide:map-pin" />
      </UFieldGroup>
    </UFormField>
    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Data esperada"
      class="col-span-5"
    >
      <UFieldGroup>
        <UInput
          variant="outline"
          :ui="uiInputStyle"
          class="w-full"
          type="date"
        />
        <UButton variant="outline" icon="lucide:calendar-clock" />
      </UFieldGroup>
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Email"
      class="col-span-7"
    >
      <UFieldGroup>
        <UInput
          variant="outline"
          :ui="uiInputStyle"
          class="w-full"
          type="email"
          placeholder="exemplo@exemplo.xyz"
        />
        <UButton variant="outline" icon="lucide:mail" />
      </UFieldGroup>
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Data de entrega"
      class="col-span-5"
    >
      <UFieldGroup>
        <UInput
          variant="outline"
          :ui="uiInputStyle"
          class="w-full"
          type="date"
        />
        <UButton variant="outline" icon="lucide:calendar-check-2" />
      </UFieldGroup>
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Telefone"
      class="col-span-7"
    >
      <UInput
        variant="outline"
        :ui="uiInputStyle"
        class="w-full"
        type="text"
        trailing-icon="lucide:phone-call"
        placeholder="+244941696934"
      />
    </UFormField>
    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Data de pedido"
      class="col-span-5"
    >
      <UFieldGroup>
        <UInput
          variant="outline"
          :ui="uiInputStyle"
          class="w-full"
          type="date"
        />
        <UButton variant="outline" icon="lucide:calendar-days" />
      </UFieldGroup>
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Observacoes"
      class="col-span-full"
    >
      <UTextarea
        variant="outline"
        class="w-full"
        type="text"
        :ui="uiInputStyle"
        placeholder="Informacoes adicionais"
      />
    </UFormField>

    <UButton
      icon="i-lucide-save-off"
      color="error"
      variant="soft"
      class="w-full h-max flex items-center justify-center col-span-3"
    >
      Descartar
    </UButton>
    <UButton
      icon="i-lucide-save"
      class="w-full flex h-max items-center justify-center col-span-3"
    >
      Salvar
    </UButton>
  </UForm>
</template>
