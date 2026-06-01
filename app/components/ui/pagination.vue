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
      class="capitalize mr-auto"
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
        v-for="idx in Math.min(pages, 2)"
        :key="idx"
        :ui="btnStyle"
        :class="{
          'bg-zinc-800 ring-transparent text-zinc-50 hover:text-zinc-500 hover:ring-zinc-500':
            idx === page
        }"
        @click="emit('select', idx)"
      >
        {{ idx }}
      </UButton>

      <template v-if="pages > 2">
        <UButton
          variant="outline"
          color="neutral"
          class="w-7.5! h-7.5! bg-zinc-800 ring-transparent text-zinc-50 hover:text-zinc-500 hover:ring-zinc-500"
          disabled
          >...</UButton
        >

        <UButton
          variant="outline"
          color="neutral"
          class="w-7.5! h-7.5!"
          v-for="idx in pages - 2"
          :key="idx + 2"
          :ui="btnStyle"
          :class="{
            'bg-zinc-800 ring-transparent text-zinc-50 hover:text-zinc-500 hover:ring-zinc-500':
              idx + 2 === page
          }"
          @click="emit('select', idx + 2)"
        >
          {{ idx + 2 }}
        </UButton>
      </template>
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
