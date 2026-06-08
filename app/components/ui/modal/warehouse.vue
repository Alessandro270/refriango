<script setup lang="ts">
import * as z from 'zod'

const schema = z.object({
  name: z.string('Obrigatório').min(3, 'Deve conter mais de 3 digitos'),
  email: z.email('Deve ser um email valido'),
  phone: z.e164('Formato +244900000000'),
  address: z
    .string('Deve ter uma localizacao')
    .nonempty('Deve ter uma localizacao'),
  capacity: z.number('Obrigatório').positive('Deve ser maior que zero'),
  refrigerated: z.boolean().default(false)
})

const state = reactive({
  name: null,
  email: null,
  phone: null,
  address: null,
  capacity: null,
  refrigerated: false
})

const warehouseStore = useWarehouseStore()
const isLoading = ref(false)
const toast = useToast()

const emit = defineEmits<{ close: [] }>()

async function handleSubmit() {
  try {
    isLoading.value = true
    const data = schema.parse(state)
    await warehouseStore.create(data)
  } catch (e) {
    toast.add({
      title: 'Nao foi possivel adicionar armazem',
      icon: 'lucide:file-x'
    })
  } finally {
    isLoading.value = false
    emit('close')
  }
}
</script>

<template>
  <UForm
    class="w-full flex flex-col flex-1 space-y-2"
    :state="state"
    :schema="schema"
    @submit="handleSubmit"
  >
    <UFormField label="Nome" name="name" required>
      <UInput
        v-model="state.name"
        class="w-full"
        placeholder="Example xyz"
        trailing-icon="lucide:warehouse"
      />
    </UFormField>

    <UFormField label="Email" name="email" required>
      <UInput
        v-model="state.email"
        class="w-full"
        placeholder="example@example.xyz"
        trailing-icon="lucide:mail"
      />
    </UFormField>
    <UFormField label="Telefone" name="phone" required>
      <UInput
        v-model="state.phone"
        class="w-full"
        placeholder="+244900000000"
        trailing-icon="lucide:phone-call"
      />
    </UFormField>

    <UFormField label="Endereço" name="address" required>
      <UInput
        v-model="state.address"
        class="w-full"
        placeholder="example, avenida xyz"
        trailing-icon="lucide:map-pin"
      />
    </UFormField>

    <div class="flex gap-4">
      <UFormField label="Capacidade" name="capacity" class="flex-2" required>
        <UFieldGroup class="flex items-center justify-center">
          <UButton
            variant="outline"
            icon="lucide:boxes"
            :ui="{
              base: 'ring-zinc-800 text-zinc-500 h-8.5'
            }"
          />
          <UInputNumber
            v-model="state.capacity"
            class="w-full"
            variant="solid"
            color="neutral"
            placeholder="example, avenida xyz"
            orientation="vertical"
          />
        </UFieldGroup>
      </UFormField>

      <UFormField label="Refrigerado" name="refrigerated" class="flex-1">
        <UCheckbox
          v-model="state.refrigerated"
          class="w-full"
          placeholder="example, avenida xyz"
        />
      </UFormField>
    </div>
    <UButton
      :icon="isLoading ? '' : 'lucide:save'"
      class="w-full flex mt-auto justify-center items-center"
      type="submit"
    >
      <template v-if="!isLoading"> Salvar </template>
      <UiLoader v-else />
    </UButton>
  </UForm>
</template>
