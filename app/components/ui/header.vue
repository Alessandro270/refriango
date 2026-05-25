<script setup lang="ts">
const { size } = withDefaults(defineProps<{ showText?: boolean, size?: "sm" | "md" | "lg" }>(),{
  showText: true,
  size: 'sm'
} );


const actualSize = computed(() => {
  if (!size) return "text-xl";
  switch (size) {
    case "lg":
      return "text-3xl";

    case "md":
      return "text-2xl";

    case "sm":
      return "text-xl";
  }
});

const imgSize = computed(() => {
  if (!size) return "size-9";
  switch (size) {
    case "lg":
      return "size-13";
    case "md":
      return "size-11";
  }
  return "size-9";
});
</script>

<template>
  <h1
    class="capitalize h-max font-serif font-medium flex items-center"
    :class="actualSize"
  >
    <img src="~/assets/refri.png" alt="refriango" :class="imgSize" />
    <span v-if="showText" class="inline-block w-max">refriango</span>
  </h1>
</template>
