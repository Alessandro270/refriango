<script setup lang="ts">
defineProps<{ title?: string; description?: string }>()
</script>

<template>
  <div class="space-y-2">
    <span
      size="sm"
      class="capitalize text-sm font-semibold gap-2 flex items-center text-zinc-500"
    >
      {{ title || '—' }}
    </span>
    <span
      class=" text-sm font-semibold gap-2 flex items-center text-grays-700"
    >
      {{ description  || '—'}}
    </span>
  </div>
</template>
