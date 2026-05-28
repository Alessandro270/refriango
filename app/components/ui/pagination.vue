<script setup lang="ts">
defineProps<{ pages: number; page: number }>()
const emit = defineEmits<{
  next: [void]
  prev: [void]
  select: [page: number]
}>()

const btnStyle = {
  base: ' flex items-center justify-center text-zinc-500 text-sm'
}
</script>

<template>
  <div
    class="flex justify-between gap-2 items-center p-2 w-full"
    v-if="pages > 1"
  >
    <UButton
      variant="outline"
      :ui="btnStyle"
      class="capitalize"
      icon="lucide:arrow-left"
      @click="emit('prev')"
      v-if="page > 1"
    >
      Anterior
    </UButton>

    <div class="flex items-center gap-2" v-if="pages > 2">
      <UButton
        variant="outline"
        color="neutral"
        class="w-7.5! h-7.5!"
        v-for="idx in Math.min(pages, 3)"
        :ui="btnStyle"
        :class="{
          'bg-zinc-800 ring-transparent text-zinc-50 hover:text-zinc-500 hover:ring-zinc-500':
            idx === page
        }"
        @click="emit('select', idx)"
        :key="idx"
      >
        {{ idx }}
      </UButton>
      <UButton variant="outline" v-if="pages > 3">...</UButton>
      <UButton
        variant="outline"
        color="neutral"
        v-for="idx in Math.max(Math.min(pages - 3, 3), 0)"
        :ui="btnStyle"
        :class="{
          'bg-zinc-800 ring-transparent text-zinc-50 hover:text-zinc-500 hover:ring-zinc-500':
            idx === page
        }"
        :key="idx"
      >
        {{ idx }}
      </UButton>
    </div>
    <UButton
      variant="outline"
      :ui="btnStyle"
      trailing-icon="lucide:arrow-right"
      @click="emit('next')"
      v-if="page < pages"
      class="ml-auto"
    >
      Proximo
    </UButton>
  </div>
</template>
