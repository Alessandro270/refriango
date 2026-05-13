<script setup lang="ts">
defineProps<{
  data: object[];
  columns: string[];
  title?: string;
}>();
</script>

<template>
  <div class="bg-white py-2 rounded-md">
    <div class="flex justify-between px-4 border-b border-grays-200 pb-1">
      <span class="text-ui-text capitalize font-medium">{{ title }}</span>
      <UButton color="neutral" icon="i-lucide-download">
        Exportar relatório
      </UButton>
    </div>
    <table class="w-full border-collapse">
      <thead>
        <tr
          class="capitalize font-semibold border-b border-b-ui-border bg-grays-50 text-grays-700"
        >
          <th
            v-for="column in columns"
            :key="column"
            class="px-4 py-3 text-left"
          >
            {{ column.slice(0, 10) + (column.length > 10 ? "." : "") }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="obj in data"
          :key="obj.id"
          class="border-b border-b-ui-border font-medium text-grays-700"
        >
          <td v-for="key in obj" :key="key" class="px-4 py-3">
            {{ key }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
