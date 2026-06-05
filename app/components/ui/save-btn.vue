<script lang="ts" setup>
defineProps({ isLoading: { type: Boolean, default: false } })
</script>

<template>
  <UButton
    :icon="isLoading ? '' : 'lucide:save'"
    class="col-span-full flex-1 flex items-center justify-center mt-auto"
    type="submit"
  >
    <template v-if="!isLoading"> Salvar </template>
    <UiLoader v-else />
  </UButton>
</template>
