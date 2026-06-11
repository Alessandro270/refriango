<script setup lang="ts">
const emit = defineEmits<{ close: []; confirm: [] }>()
</script>

<template>
  <div class="space-y-4">
    <UiH3 icon="lucide:info" class="text-zinc-50 capitalize">
      Esta ação pode ser irreversível
    </UiH3>
    <div class="flex gap-2">
      <UButton
        icon="lucide:x"
        class="uppercase w-full text-zinc-50"
        color="error"
        @click="() => emit('close')"
      >
        Cancelar
      </UButton>
      <UButton
        icon="lucide:check"
        class="w-full uppercase"
        @click="() => emit('confirm')"
      >
        Aceitar
      </UButton>
    </div>
  </div>
</template>
