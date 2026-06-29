<script lang="ts" setup>
const { onSearch } = defineProps<{ onSearch: Function }>()

const model = defineModel<string>()

watch(model, onSearch)
</script>

<template>
  <UInput
    v-model="model"
    variant="outline"
    placeholder="Pesquisar..."
    icon="lucide:search"
  />
</template>
