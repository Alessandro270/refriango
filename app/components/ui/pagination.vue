<script setup lang="ts">
defineProps<{ pages: number; page: number }>();
const emit = defineEmits<{
next: [void],
prev: [void],
}>()

const style =
  "px-2.5 py-1 uppercase text-xs font-semibold bg-grays-800 text-white rounded-sm hover:bg-grays-600 hover:text-grays-100 transition";
</script>

<template>
  <div class="space-x-2" v-if="pages > 1">
    <button v-if="page > 1" @click="emit('prev')" :class="style"><</button>
    <button v-if="page > 1" :class="style">..</button>
    <button :class="style">{{ page }}</button>
    <button v-if="page < pages" :class="style">..</button>
    <button v-if="page < pages" @click="emit('next')" :class="style">></button>
  </div>
</template>
