<script setup lang="ts">
const emit = defineEmits<{
  confirm: []
  close: []
}>()
const uiModalStyle = {
  content: 'w-100! h-10!',
  title: 'uppercase'
}

defineProps<{ loading: boolean; editComponent: Component }>()

const modalOpen = ref<boolean>(false)
const editOpen = ref<boolean>(false)
</script>

<template>
  <UiLoader class="border-blue-400! border-t-transparent!" v-if="loading" />
  <div class="flex gap-2" v-else>
    <UModal title="Editar" v-model:open="editOpen">
      <UButton
        icon="lucide:pencil"
        variant="outline"
        color="neutral"
        size="xs"
      />
      <template #body>
        <component :is="editComponent" @close="editOpen = false" />
      </template>
    </UModal>
    <UModal v-model:open="modalOpen" title="Tens a certeza?" :ui="uiModalStyle">
      <UButton
        icon="lucide:trash"
        variant="outline"
        color="neutral"
        size="xs"
      />
      <template #body>
        <div class="space-y-4">
          <UiH3 icon="lucide:info" class="text-zinc-50 capitalize">
            Esta ação pode ser irreversível
          </UiH3>
          <div class="flex gap-2">
            <UButton
              icon="lucide:x"
              class="uppercase w-full text-zinc-50"
              color="error"
              @click="
                () => {
                  emit('close')
                  modalOpen = false
                }
              "
            >
              Cancelar
            </UButton>
            <UButton
              icon="lucide:check"
              class="w-full uppercase"
              @click="
                () => {
                  emit('confirm')
                  modalOpen = false
                }
              "
            >
              Aceitar
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
