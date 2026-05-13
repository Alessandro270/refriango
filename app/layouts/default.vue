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
const user = ref({
  name: "Alessandro Almeida",
  email: "alessandro@example.com",
});
const footerItems: NavigationMenuItem[] = [
  {
    label: "Configurações",
    icon: "i-lucide-settings",
    to: "/settings",
  },
  {
    label: "Terminar sessão",
    icon: "i-lucide-log-out",
    click: () => logout(),
  },
];
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
      <template #footer>
        <div class="flex flex-col gap-4 mt-auto w-full">
          <UNavigationMenu :items="footerItems" orientation="vertical" />

          <div class="flex items-center gap-3 rounded-xl bg-ui-bg-elevated p-3">
            <UAvatar :alt="user.name" size="md" />

            <div v-if="open" class="flex flex-col overflow-hidden">
              <span class="text-sm font-medium truncate">
                {{ user.name }}
              </span>

              <span class="text-xs text-gray-500 truncate">
                {{ user.email }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </USidebar>
    <div class="min-h-screen h-max bg-ui-bg w-full text-black">
      <div class="px-6 py-5">
        <slot />
      </div>
    </div>
  </div>
</template>
