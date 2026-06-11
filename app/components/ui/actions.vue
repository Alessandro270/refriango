<script setup lang="ts">
const emit = defineEmits<{
  confirm: []
  close: []
}>()
const uiModalStyle = {
  content: 'w-100! h-10!',
  title: 'uppercase'
}

defineProps<{ loading: boolean; edit?: boolean; editComponent: Component }>()

const modalOpen = ref<boolean>(false)
const editOpen = ref<boolean>(false)
</script>

<template>
  <UiLoader class="border-blue-400! border-t-transparent!" v-if="loading" />
  <div class="flex gap-2" v-else>
    <template v-if="edit">
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
    </template>
    <UModal v-model:open="modalOpen" title="Tens a certeza?" :ui="uiModalStyle">
      <UButton
        icon="lucide:trash"
        variant="outline"
        color="neutral"
        size="xs"
      />
      <template #body>
        <UiModalConfirm
          @close="
            () => {
              emit('close')
              modalOpen = false
            }
          "
          @confirm="
            () => {
              emit('confirm')
              modalOpen = false
            }
          "
        />
      </template>
    </UModal>
  </div>
</template>
