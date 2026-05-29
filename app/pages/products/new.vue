<script setup lang="ts">
const uiStyle = {
  label: 'text-ui-text',
  root: 'h-full',
  container: 'flex-1 flex flex-col'
}

const fileUploadStyle = { base: 'h-full text-zinc-400' }
const formFieldSize = 'lg'
const items = ref(['Sim', 'Nao'])
const value = ref('System')
</script>

<template>
  <UForm
    class="bg-white rounded-md px-6 py-6 gap-4 grid grid-cols-10 auto-rows-min"
  >
    <UiH3 class="col-start-3 col-span-8">Cadastrar novo produto</UiH3>
    <UFileUpload
      class="w-full row-span-6 row-start-1 col-span-2"
      label="Imagem do produto"
    />

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Nome"
      class="col-span-4"
    >
      <UInput
        variant="outline"
        placeholder="example"
        trailing-icon="lucide:box"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Fornecedor"
      class="col-span-4"
    >
      <USelect
        variant="outline"
        :items="['fanta', 'coca-cola']"
        class="w-full"
        placeholder="escolher.."
        icon="lucide:van"
      />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Peso"
      class="col-span-4"
    >
      <UInput
        variant="outline"
        placeholder="0.0kg"
        class="w-full"
        trailing-icon="lucide:weight"
      />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Categoria"
      class="col-span-4"
    >
      <USelect
        variant="outline"
        :items="['refrigerantes', 'bebidas']"
        placeholder="escolher.."
        class="w-full"
        icon="lucide:list-check"
      />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Dimensoes"
      class="col-span-4"
    >
      <UInput
        variant="outline"
        placeholder="L,A,C"
        trailing-icon="lucide:ruler-dimension-line"
      />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Unidade de medida"
      class="col-span-4"
    >
      <USelect
        variant="outline"
        :items="['cm', 'm', 'in']"
        placeholder="escolher.."
        class="w-full"
        icon="lucide:ruler"
      />
    </UFormField>
    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Codigo SKU"
      class="col-span-4"
    >
      <UFieldGroup>
        <UButton icon="lucide:barcode" variant="outline" />
        <UInput variant="outline" class="w-full" placeholder="WA-005-26" />
        <UButton icon="lucide:qr-code" variant="outline" />
      </UFieldGroup>
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Data de validade"
      class="col-span-4"
    >
      <UInput type="date" variant="outline" class="w-full" />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Preco de compra"
      class="col-span-4"
    >
      <UFieldGroup>
        <UBadge
          icon="lucide:dollar-sign"
          variant="outline"
          size="md"
          color="neutral"
        />
        <UInputNumber
          variant="outline"
          orientation="vertical"
          placeholder="5000,00 kz"
          class="w-full"
        />
      </UFieldGroup>
    </UFormField>
    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Preco de venda"
      class="col-span-4"
    >
      <UFieldGroup>
        <UBadge
          icon="lucide:dollar-sign"
          variant="outline"
          size="md"
          color="neutral"
        />
        <UInputNumber
          variant="outline"
          orientation="vertical"
          placeholder="7500,00 kz"
          class="w-full"
        />
      </UFieldGroup>
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Descricao do produto"
      class="h-full col-start-3 col-span-6"
    >
      <UTextarea
        class="w-full h-full"
        variant="outline"
        placeholder="sobre o produto.."
      />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Refrigerado"
      class="w-full col-span-2"
    >
      <URadioGroup orientation="horizontal" :items="items" v-model="value" />
    </UFormField>
    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Fazer upload de *.xsls, *.csv"
      class="col-start-1 row-start-7 col-span-2 items-center"
    >
      <UFileUpload
        :ui="fileUploadStyle"
        type="file"
        label="Upload *.xsls, *.csv"
        class="w-full"
        variant="button"
      />
    </UFormField>
    <UButton
      icon="i-lucide-save-off"
      color="error"
      variant="soft"
      class="w-full h-max col-start-3 flex items-center justify-center col-span-2"
    >
      Descartar
    </UButton>
    <UButton
      icon="i-lucide-save"
      class="w-full flex h-max items-center justify-center col-span-2"
    >
      Salvar
    </UButton>
  </UForm>
</template>
