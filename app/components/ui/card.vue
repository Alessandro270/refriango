<script setup lang="ts">
defineProps<{
  description: string;
  title: string;
}>();
</script>

<template>
  <div class="px-6 py-4 rounded-md bg-white min-h-20 w-1/3 space-y-3">
    <h1 class="uppercase font-semibold text-sm text-grays-700">{{ title }}</h1>
    <p class="text-3xl font-semibold text-grays-800">{{ description }}</p>
    <p class="flex items-center space-x-2">
      <UIcon
        name="streamline:graph-arrow-increase"
        class="size-4 text-success"
      />
      <span class="inline-block">+4.2% que no mês anterior</span>
    </p>
  </div>
</template>
