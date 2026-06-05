<script lang="ts" setup>
defineProps({ isLoading: { type: Boolean, default: false } })
</script>

<template>
  <UButton
    :icon="isLoading ? '' : 'lucide:save'"
    class="col-span-full flex items-center justify-center mt-auto row-end-7"
    type="submit"
  >
    <template v-if="!isLoading"> Salvar </template>
    <UiLoader v-else />
  </UButton>
</template>
