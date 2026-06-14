<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="grid grid-cols-12 w-full items-center">
    <h3 class="font-semibold col-span-5"><slot /></h3>

    <UButton
      @click="emit('close')"
      icon="lucide:x"
      variant="ghost"
      class="w-max col-start-12 ml-auto"
    ></UButton>
  </div>
</template>
