<script setup lang="ts">
withDefaults(defineProps<{ readonly?: boolean }>(), { readonly: true });
// const supplier = ref("fanta");
</script>

<template>
  <UForm class="w-full space-y-4">
    <div class="grid grid-cols-3 gap-5 w-full">
      <UFormField label="Nome">
        <UInput :disabled="readonly" placeholder="example" class="w-full" />
      </UFormField>
      <UFormField label="Fornecedor">
        <USelect
          :disabled="readonly"
          :items="['fanta', 'coca-cola']"
          class="w-full"
          placeholder="escolher.."
        />
      </UFormField>
      <UFormField label="Peso">
        <UInput :disabled="readonly" placeholder="0.0 g" class="w-full" />
      </UFormField>
    </div>
    <div class="grid grid-cols-3 gap-5 w-full">
      <UFormField label="Categoria">
        <USelect
          :disabled="readonly"
          :items="['refrigerantes', 'bebidas']"
          placeholder="escolher.."
          class="w-full"
        />
      </UFormField>
      <UFormField label="Unidade de medida">
        <USelect
          :disabled="readonly"
          :items="['cm', 'm', 'in']"
          placeholder="escolher.."
          class="w-full"
        />
      </UFormField>
      <UFormField label="Dimensoes">
        <UInput :disabled="readonly" placeholder="L,A,C" />
      </UFormField>
    </div>

    <div class="grid grid-cols-3 gap-5 w-full">
      <UFormField label="Codigo SKU">
        <UInput :disabled="readonly" class="w-full" placeholder="WA-005-26" />
      </UFormField>
      <UFormField label="Data de expiracao">
        <UInputDate :disabled="readonly" class="w-full" />
      </UFormField>

      <UFormField label="Refrigerado">
        <UCheckbox :disabled="readonly" class="w-full" />
      </UFormField>
    </div>
    <div class="flex gap-5 w-full h-max">
      <UFileUpload
        class="w-1/3"
        :disabled="readonly"
        label="imagem do produto"
      />

      <div class="w-2/3 space-y-4">
        <div class="flex gap-5">
          <UFormField label="Preco de compra">
            <UInputNumber
              :disabled="readonly"
              orientation="vertical"
              placeholder="5000,00 kz"
            />
          </UFormField>

          <UFormField label="Preco de venda">
            <UInputNumber
              :disabled="readonly"
              orientation="vertical"
              placeholder="7500,00 kz"
            />
          </UFormField>
        </div>
        <UFormField label="Descricao do produto" class="h-full">
          <UTextarea
            :disabled="readonly"
            class="w-full"
            placeholder="sobre o produto.."
          />
        </UFormField>
      </div>
    </div>
    <div class="w-full grid grid-cols-4 gap-4">
      <UFormField
        label="Upload *.xsls, *.csv"
        class="flex gap-4 col-span-2 items-center"
        v-if="!readonly"
      >
        <UFileUpload type="file" class="w-20" variant="button" />
      </UFormField>
      <UButton
        v-if="!readonly"
        icon="i-lucide-save"
        class="w-full flex items-center justify-center col-span-2"
      >
        Salvar
      </UButton>
    </div>
  </UForm>
</template>
