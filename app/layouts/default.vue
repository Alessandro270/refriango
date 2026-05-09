<script setup lang="ts">
const open = ref<boolean>(true);
const items: NavigationMenuItem[] = [
  {
    label: "Visao geral",
    icon: "i-lucide-house",
    to: "/",
  },
  {
    label: "Produtos",
    icon: "lucide:boxes",
    to: "/products",
  },
  {
    label: "Entregas",
    icon: "carbon:van",
    to: "/delivery",
  },
  {
    label: "Pedidos",
    icon: "material-symbols:border-color-outline",
    to: "/orders",
  },
  {
    label: "Clientes",
    icon: "i-lucide-users",
    to: "/clients",
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
    label: "Transferencias",
    icon: "tabler:arrows-left-right",
    to: "/transfers",
  },
  {
    label: "localizacoes",
    icon: "material-symbols:location-on",
    to: "/locations",
  },
  {
    label: "Armazens",
    icon: "ph:warehouse-duotone",
    to: "/warehouses",
  },
];
</script>

<template>
  <div class="flex">
    <USidebar v-model:open="open" collapsible="icon">
      <template #title>
        <h1
          class="capitalize text-xl font-serif font-medium flex space-x-6 items-center"
        >
          <img src="~/assets/refri.png" alt="refriango" class="size-9" />
          refriango
        </h1>
      </template>
      <template #default>
        <UNavigationMenu :items="items" orientation="vertical" />
      </template>
    </USidebar>
    <div class="h-screen bg-white w-full text-black">
      <div
        class="h-16 bg-grays-900 flex items-center px-6"
        @click="open = !open"
      >
        <UIcon
          name="cuida:sidebar-collapse-outline"
          class="size-6 text-grays-400 hover:text-grays-200 transition"
        ></UIcon>
      </div>
      <div class="px-6 py-5">
        <slot />
      </div>
    </div>
  </div>
</template>
