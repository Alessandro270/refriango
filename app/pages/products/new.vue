<script setup lang="ts">
const uiStyle = {
  label: 'text-ui-text',
  root: 'h-full',
  container: 'flex-1 flex flex-col'
}

const fileUploadStyle = { base: 'h-full text-zinc-400' }
const formFieldSize = 'lg'
</script>

<template>
  <div class="space-y-6">
    <UiH1>Novo Produto</UiH1>
    <UForm
      class="bg-white rounded-md px-6 py-6 gap-4 grid grid-cols-12 auto-rows-min"
    >
      <UFileUpload
        class="w-full row-span-4 row-start-1 col-span-2"
        label="Imagem Do Produto"
      />

      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Upload *.xsls, *.csv"
        class="col-start-1 row-start-5 col-span-2 items-center"
      >
        <UFileUpload
          :ui="fileUploadStyle"
          type="file"
          label="Upload *.xsls, *.csv"
          class="w-full"
          variant="button"
        />
      </UFormField>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Nome"
        class="col-span-3"
      >
        <UInput variant="outline" placeholder="example" class="w-full" />
      </UFormField>

      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Fornecedor"
        class="col-span-3"
      >
        <USelect
          variant="outline"
          :items="['fanta', 'coca-cola']"
          class="w-full"
          placeholder="escolher.."
        />
      </UFormField>

      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Peso"
        class="col-span-3"
      >
        <UInput variant="outline" placeholder="0.0 g" class="w-full" />
      </UFormField>

      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Categoria"
        class="col-start-3 col-span-3"
      >
        <USelect
          variant="outline"
          :items="['refrigerantes', 'bebidas']"
          placeholder="escolher.."
          class="w-full"
        />
      </UFormField>

      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Unidade de medida"
        class="col-span-3"
      >
        <USelect
          variant="outline"
          :items="['cm', 'm', 'in']"
          placeholder="escolher.."
          class="w-full"
        />
      </UFormField>

      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Dimensoes"
        class="col-span-3"
      >
        <UInput variant="outline" placeholder="L,A,C" />
      </UFormField>

      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Codigo SKU"
        class="col-span-3"
      >
        <UInput variant="outline" class="w-full" placeholder="WA-005-26" />
      </UFormField>

      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Data de expiracao"
        class="col-span-3"
      >
        <UInput type="date" variant="outline" class="w-full" />
      </UFormField>

      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Preco de compra"
        class="col-span-3"
      >
        <UInputNumber
          variant="outline"
          orientation="vertical"
          placeholder="5000,00 kz"
        />
      </UFormField>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Descricao do produto"
        class="h-full col-span-6 row-span-4"
      >
        <UTextarea
          class="w-full h-full"
          variant="outline"
          :rows="6"
          placeholder="sobre o produto.."
        />
      </UFormField>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Preco de venda"
        class="col-span-3"
      >
        <UInputNumber
          variant="outline"
          orientation="vertical"
          placeholder="7500,00 kz"
        />
      </UFormField>
      <UFormField
        :size="formFieldSize"
        :ui="uiStyle"
        label="Refrigerado"
        class="col-start-9"
      >
        <UCheckbox class="w-full" />
      </UFormField>

      <UButton
        v-if="!readonly"
        icon="i-lucide-save"
        class="w-full flex items-center justify-center col-span-2"
      >
        Salvar
      </UButton>
    </UForm>
  </div>
</template>
