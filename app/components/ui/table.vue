<script setup lang="ts">
defineProps<{
  data: object[];
  columns: string[];
}>();
</script>

<template>
  <div class="bg-white py-2 rounded-md">
    <div class="flex justify-between px-4 border-b border-grays-200 pb-1">
      <span class="text-ui-text font-medium">Últimos pedidos</span>
      <UButton color="neutral" icon="i-lucide-download">
        Exportar relatório
      </UButton>
    </div>
    <ul
      class="grid grid-cols-5 capitalize font-semibold py-2 border-b border-b-ui-border bg-grays-50 px-4 text-grays-700"
    >
      <li v-for="column in columns" :key="column">
        {{ column }}
      </li>
    </ul>
    <ul class="*:not-last:border-b *:not-last:border-b-ui-border">
      <li
        v-for="obj in data"
        :key="obj.id"
        class="px-4 font-medium text-grays-700 py-2 grid grid-cols-5"
      >
        <div v-for="key in obj" :key="key">{{ key }}</div>
      </li>
    </ul>
  </div>
</template>
