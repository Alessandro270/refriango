<script setup lang="ts">
const open = ref<boolean>(true);
const items: NavigationMenuItem[] = [
  {
    label: "Dashboard",
    icon: "i-lucide-house",
    to: "/",
  },
  {
    label: "Produtos",
    icon: "lucide:boxes",
    to: "/products",
  },
  {
    label: "Pedidos",
    icon: "material-symbols:border-color-outline",
    to: "/orders",
  },
  {
    label: "Fornecedores",
    icon: "material-symbols-light:business-center-outline-sharp",
    to: "/suppliers",
  },
  {
    label: "Estoque",
    icon: "lsicon:management-stockout-outline",
    to: "/stock",
  },
  {
    label: "Armazens",
    icon: "ph:warehouse-duotone",
    to: "/warehouses",
  },
];

const user = ref({
  name: "Alessandro Almeida",
  email: "alessandro@example.com",
});
</script>

<template>
  <div class="flex min-h-screen">
    <USidebar v-model:open="open" collapsible="icon">
      <template #title>
        <div class="flex flex-col items-center w-full">
          <div class="flex justify-between items-center w-full">
            <UiHeader />

            <UIcon
              v-if="open"
              name="cuida:sidebar-collapse-outline"
              class="size-6 text-grays-400 hover:text-grays-200 transition"
              @click="open = !open"
            ></UIcon>
          </div>
          <UIcon
            v-if="!open"
            name="cuida:sidebar-collapse-outline"
            class="size-6 text-grays-400 hover:text-grays-200 transition"
            @click="open = !open"
          ></UIcon>
        </div>
      </template>
      <template #default>
        <UNavigationMenu :items="items" orientation="vertical" />
      </template>
    </USidebar>
    <div class="min-h-screen h-max bg-ui-bg w-full text-black">
      <div class="px-6 py-5">
        <slot />
      </div>
    </div>
  </div>
</template>
