<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="grid grid-cols-12 w-full items-center">
    <h3 class="font-semibold col-span-5"><slot /></h3>

    <UButton
      icon="lucide:import"
      variant="ghost"
      class="col-start-10 w-max flex items-center justify-center col-span-2"
    >
      Fazer upload
    </UButton>
    <UButton
      @click="emit('close')"
      icon="lucide:x"
      variant="ghost"
      class="w-max col-start-12 ml-auto"
    ></UButton>
  </div>
</template>
