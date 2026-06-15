<script setup lang="ts">
defineProps<{ name: string; label: string }>()

const model = defineModel()
const showPass = ref<boolean>(false)
</script>

<template>
  <UFormField :label="label" :name="name">
    <UFieldGroup>
      <UInput
        v-model="model"
        :type="showPass ? 'text' : 'password'"
        variant="outline"
        placeholder="sua senha"
        class="w-full"
        icon="lucide:user-lock"
      />
      <UButton
        variant="outline"
        :icon="showPass ? 'lucide:eye-closed' : 'lucide:eye'"
        @click="showPass = !showPass"
      >
      </UButton>
    </UFieldGroup>
  </UFormField>
</template>
