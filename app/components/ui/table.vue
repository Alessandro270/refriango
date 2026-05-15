<script setup lang="ts">
const { data, columns } = defineProps<{
  data: Array<any>;
  columns: Array<any> | [];
}>();

const page = ref(1);
const limit = ref(8);
const totalPages = computed(() => data.length);
const currData = computed(() =>
  data.slice((page.value - 1) * limit.value, page.value * limit.value),
);

const pages = Math.ceil(totalPages.value / limit.value);

function next(): void {
  if (page.value < pages) page.value++;
}

function prev(): void {
  if (page.value > 1) page.value--;
}
</script>

<template>
  <div class="bg-white rounded-md flex flex-col pt-3 pb-2 px-3 space-y-3">
    <slot name="header" />
    <UTable :data="currData" :columns="columns" />
    <UiPagination
      :pages="pages"
      @prev="prev"
      @next="next"
      :page="page"
      class="ml-auto"
    />
  </div>
</template>
