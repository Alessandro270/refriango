<script setup lang="ts">
const { data, fields } = defineProps<{ data: object; fields?: any[] }>()

// const supplier = ref("fanta");
</script>

<template>
  <div class="w-full space-y-2 grid grid-cols-3">
    <template v-for="(value, key) in data" :key="key">
      <UFormField
        v-if="!(value instanceof Object) && key !== 'id'"
        :label="key"
      >
        <div class="text-zinc-400 h-18">
          {{ value }}
        </div>
      </UFormField>
    </template>
  </div>
</template>
