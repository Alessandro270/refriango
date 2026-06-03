<script setup lang="ts">
import * as z from 'zod'

const uiStyle = {
  label: 'text-ui-text',
  root: 'h-full',
  container: 'flex-1 flex flex-col'
}

const fileUploadStyle = { base: 'h-full text-zinc-400' }
const formFieldSize = 'lg'

const schema = z.object({
  name: z.string().min(3, 'Deve conter pelo 3 digitos'),
  supplierId: z.string('Obrigatório').nonempty('Obrigatório'),
  categoryId: z.string('Obrigatório').nonempty('Obrigatório'),
  weight: z.number('Obrigatório').gte(0, 'Peso deve ser  positivo'),
  width: z.number('Obrigatório').gte(0, 'Deve ser positiva'),
  height: z.number('Obrigatório').gte(0, 'Deve ser positiva'),
  length: z.number('Obrigatório').gte(0, 'Deve ser positivo'),
  expiresAt: z
    .string('Obrigatório')
    .refine(date => !isNaN(Date.parse(date)), 'Data de validade inválida'),
  salePrice: z.number('Obrigatório').gte(0, 'Deve ser positivo'),
  purchasePrice: z.number('Obrigatório').gte(0, 'Deve ser positivo'),
  description: z.string().nullable().optional(),
  refrigerated: z.boolean().optional()
})

const state = reactive({
  name: '',
  supplierId: null,
  categoryId: null,
  weight: null,
  width: null,
  height: null,
  length: null,
  expiresAt: null,
  salePrice: null,
  purchasePrice: null,
  description: null,
  refrigerated: false
})

const isLoading = ref(true)
const toast = useToast()
const productStore = useProductStore()
const categoryStore = useCategoryStore()
const supplierStore = useSupplierStore()

onMounted(async () => {
  try {
    isLoading.value = true
    if (!categoryStore.hasLoaded) {
      categoryStore.isLoading = true
      await categoryStore.getCategories()
      categoryStore.hasLoaded = true
    }
    if (!supplierStore.hasLoaded) {
      supplierStore.isLoading = true
      await supplierStore.getSuppliers()
      supplierStore.hasLoaded = true
    }
  } catch (e) {
    toast.add({ title: 'Nao foi possivel carregar os recursos' })
    console.log(e)
  } finally {
    supplierStore.isLoading = false
    categoryStore.isLoading = false
    isLoading.value = false
  }
})

async function handleSubmit() {
  try {
    isLoading.value = true

    const data = schema.parse(state)

    await productStore.create(data)
    await navigateTo('/products')
  } catch (e) {
    const message = e.message.split(' ').slice(2).join(' ')
    toast.add({ title: 'Ocorreu um erro', description: message })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UForm
    class="bg-white rounded-md px-6 py-6 gap-4 grid grid-cols-10 auto-rows-min"
    :state="state"
    :schema="schema"
    @submit="handleSubmit"
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
      name="name"
    >
      <UInput
        v-model="state.name"
        variant="outline"
        placeholder="example"
        trailing-icon="lucide:box"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Fornecedores"
      class="col-span-4"
      name="supplierId"
    >
      <USelect
        v-model="state.supplierId"
        variant="outline"
        color="neutral"
        value-key="id"
        label-key="name"
        :items="supplierStore.suppliers"
        :placeholder="
          supplierStore.isLoading
            ? 'carregando..'
            : supplierStore.suppliersCount > 0
              ? 'escolher..'
              : 'sem fornecedores'
        "
        class="w-full"
        icon="lucide:handshake"
        :disabled="supplierStore.suppliersCount <= 0 || supplierStore.isLoading"
      />
    </UFormField>
    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Peso"
      class="col-span-4"
      name="weight"
    >
      <UFieldGroup>
        <UBadge
          icon="lucide:weight"
          variant="outline"
          size="md"
          color="neutral"
          class="px-2"
        />
        <UInputNumber
          v-model="state.weight"
          variant="outline"
          placeholder="0.0 (kg)"
          class="w-full"
          orientation="vertical"
        />
      </UFieldGroup>
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Categoria"
      class="col-span-4"
      name="categoryId"
    >
      <USelect
        v-model="state.categoryId"
        variant="outline"
        color="neutral"
        value-key="id"
        label-key="name"
        :items="categoryStore.categories"
        :placeholder="
          categoryStore.isLoading
            ? 'carregando..'
            : categoryStore.categoryCount > 0
              ? 'escolher..'
              : 'Sem categorias'
        "
        class="w-full"
        icon="lucide:list-check"
        :disabled="categoryStore.categoryCount <= 0 || categoryStore.isLoading"
      />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Largura"
      class="col-span-4"
      name="width"
    >
      <UInputNumber
        v-model="state.width"
        orientation="vertical"
        variant="outline"
        placeholder="Largura (cm)"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Altura"
      class="col-span-4"
      name="height"
    >
      <UInputNumber
        v-model="state.height"
        variant="outline"
        orientation="vertical"
        placeholder="Altura (cm)"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Comprimento"
      class="col-span-4"
      name="length"
    >
      <UInputNumber
        v-model="state.length"
        class="w-full"
        variant="outline"
        orientation="vertical"
        placeholder="Comprimento (cm)"
      />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Data de validade"
      class="col-span-4"
      name="expiresAt"
    >
      <UInput
        v-model="state.expiresAt"
        type="date"
        variant="outline"
        class="w-full text-zinc-950"
      />
    </UFormField>

    <UFormField
      :size="formFieldSize"
      :ui="uiStyle"
      label="Preco de compra"
      class="col-span-4"
      name="purchasePrice"
    >
      <UFieldGroup>
        <UBadge
          icon="lucide:dollar-sign"
          variant="outline"
          size="md"
          color="neutral"
          class="px-2"
        />
        <UInputNumber
          v-model="state.purchasePrice"
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
      name="salePrice"
    >
      <UFieldGroup>
        <UBadge
          icon="lucide:dollar-sign"
          variant="outline"
          size="md"
          color="neutral"
          class="px-2"
        />
        <UInputNumber
          v-model="state.salePrice"
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
      name="description"
    >
      <UTextarea
        v-model="state.description"
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
      name="refrigerated"
    >
      <UCheckbox v-model="state.refrigerated" orientation="horizontal" />
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
      :icon="isLoading ? '' : 'lucide:save'"
      class="w-full flex h-max items-center disabled:bg-zinc-950 justify-center col-span-2"
      type="submit"
    >
      <template v-if="!isLoading"> Salvar </template>
      <UiLoader v-else />
    </UButton>
  </UForm>
</template>
