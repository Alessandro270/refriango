<script setup lang="ts">
defineProps<{ icon?: string }>()
</script>

<template>
  <h1
    class="uppercase font-semibold gap-2 text-2xl flex items-center text-grays-700"
  >
    <UIcon v-if="icon" :name="icon" />
    <slot />
  </h1>
</template>
