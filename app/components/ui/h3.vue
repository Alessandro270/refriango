<script setup lang="ts">
defineProps<{ icon?: string }>()
</script>

<template>
  <h3
    class="uppercase font-semibold gap-2 text-md flex items-center text-grays-700"
  >
    <UIcon v-if="icon" size="xl" :name="icon" />
    <slot />
  </h3>
</template>
