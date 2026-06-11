<script setup lang="ts">
defineProps<{ icon?: string; size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' }>()
</script>

<template>
  <h3
    :class="`text-${size ?? 'md'}`"
    class="uppercase font-semibold gap-2 flex items-center text-grays-700"
  >
    <UIcon v-if="icon" :size="size ?? 'xl'" :name="icon" />
    <slot />
  </h3>
</template>
