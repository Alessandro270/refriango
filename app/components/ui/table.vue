<script setup lang="ts">
const { data, columns, loading } = defineProps<{
  data: any[] | []
  columns: any[] | []
  loading?: boolean
}>()

const page = ref(1)
const limit = ref(8)
const totalPages = computed(() => data.length)
const currData = computed(() =>
  data.slice((page.value - 1) * limit.value, page.value * limit.value)
)

const pages = computed(() => Math.ceil(totalPages.value / limit.value))

function next(): void {
  if (page.value < pages.value) page.value++
}

function prev(): void {
  if (page.value > 1) page.value--
}
</script>

<template>
  <div
    class="bg-white rounded-md flex flex-col pt-3 pb-2 flex-1 px-3 space-y-3"
  >
    <slot name="header" />
    <div v-if="loading" class="mt-4 space-y-2">
      <UiRowLoader />
      <UiRowLoader />
      <UiRowLoader />
      <UiRowLoader />
    </div>
    <UTable v-else-if="totalPages > 0" :data="currData" :columns="columns" />
    <div v-else class="min-h-90 flex justify-center items-center">
      <div class="space-y-4 flex items-center justify-center flex-col">
        <UIcon name="lucide:file-plus-corner" class="size-30 bg-zinc-300" />
        <UiH3 class="text-zinc-400">Sem dados no momento..</UiH3>
      </div>
    </div>
    <UiPagination
      :pages="pages"
      @prev="prev"
      @next="next"
      :page="page"
      @select="val => (page = val)"
      class="mt-auto"
    />
  </div>
</template>
