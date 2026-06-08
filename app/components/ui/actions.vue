<script setup lang="ts">
const emit = defineEmits<{
  delete: []
}>()
const uiModalStyle = {
  content: 'w-100! h-10!',
  title: 'uppercase'
}
</script>

<template>
  <div class="flex gap-2">
    <UButton icon="lucide:pencil" variant="outline" color="neutral" size="xs">
    </UButton>
    <UModal title="Tens a certeza?" :ui="uiModalStyle">
      <UButton icon="lucide:trash" variant="outline" color="neutral" size="xs">
      </UButton>
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
            >
              Cancelar
            </UButton>
            <UButton icon="lucide:check" class="w-full uppercase">
              Aceitar
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
