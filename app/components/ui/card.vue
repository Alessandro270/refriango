<script setup lang="ts">
defineProps<{
  description: string;
  title: string;
  to: string;
}>();
</script>

<template>
  <div class="px-6 py-4 rounded-md bg-white min-h-20 space-y-3">
    <h3
      class="uppercase font-semibold text-md flex items-center justify-between text-grays-700"
    >
      <span>{{ title }}</span>
      <ULink :to="to">
        <UIcon name="lucide:arrow-up-right" class="text-xl" />
      </ULink>
    </h3>
    <div class="flex items-center gap-4">
      <span class="text-4xl inline-block font-semibold text-ui-text">{{
        description
      }}</span>
      <div class="flex gap-2 items-center">
        <UIcon
          name="streamline:graph-arrow-increase"
          class="size-4 text-success"
        />
        <span class="inline-block text-md text-green-400">+4.2%</span>
      </div>
    </div>
  </div>
</template>
