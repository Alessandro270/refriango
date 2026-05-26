<script lang="ts" setup>
const model = defineModel()
defineProps<{ placeholder?: string; type?: string; icon?: string }>()
</script>

<template>
  <div
    class="hover:outline-2 hover:outline-primary-400 focus-within:outline-2 focus-within:outline-primary-400 flex gap-2 border py-0.5 px-2 items-center border-zinc-200 rounded-md transition outline-2 outline-transparent"
  >
    <label for="input" class="h-max">
      <UIcon
        class="cursor-pointer text-zinc-500"
        v-if="icon"
        :name="icon"
        size="xl"
      />
    </label>
    <input
      id="input"
      :placeholder="placeholder"
      :type="type"
      v-model="model"
      class="outline-0 placeholder:text-sm text-sm text-zinc-700"
    />
  </div>
</template>
