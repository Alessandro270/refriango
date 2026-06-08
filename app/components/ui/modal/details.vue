<script setup lang="ts">
const { data, fields } = defineProps<{ data: object; fields?: any[] }>()

console.log(fields)

// const supplier = ref("fanta");
</script>

<template>
  <div class="w-full space-y-2 grid grid-cols-3">
    <UFormField v-for="(value, key) in data" :label="key" :key="key">
      <div class="text-zinc-400 h-18">
        {{ value }}
      </div>
    </UFormField>
  </div>
</template>
