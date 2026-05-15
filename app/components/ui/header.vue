<script setup lang="ts">
const { size } = defineProps<{ size?: "sm" | "md" | "lg" }>();

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
    class="capitalize font-serif font-medium flex space-x-6 items-center"
    :class="actualSize"
  >
    <img src="~/assets/refri.png" alt="refriango" :class="imgSize" />
    refriango
  </h1>
</template>
