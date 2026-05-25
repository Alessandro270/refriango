<script setup lang="ts">
const open = ref<boolean>(true);
const items: NavigationMenuItem[] = [
  {
    label: "Dashboard",
    icon: "lucide:house",
    to: "/",
  },
  {
    label: "Pedidos",
    icon: "lucide:van",
    to: "/orders",
  },
  {
    label: "Fornecedores",
    icon: "lucide:briefcase",
    to: "/suppliers",
  },

  {
    label: "Produtos",
    icon: "lucide:boxes",
    to: "/products",
  },
  {
    label: "Estoque",
    icon: "lucide:box",
    to: "/stock",
  },
  {
    label: "Armazens",
    icon: "lucide:warehouse",
    to: "/warehouses",
  },
  {
    label: "Configuracoes",
    icon: "lucide:cog",
    to: "/config",
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
      <template #footer>
        <div class="space-y-3">
          <div class="flex items-center gap-2 pl-2">
            <UAvatar text="AA" size="xs" />

            <div class="flex flex-col">
              <span class="inline-block text-xs font-medium text-zinc-400">
                {{ user.name }}
              </span>
              <span class="inline-block text-xs font-semibold text-zinc-400">
                {{ user.email }}
              </span>
            </div>
          </div>

          <UButton
            icon="lucide:arrow-right-circle"
            label="Terminar sessao"
            variant="ghost"
            class="w-full flex items-center text-zinc-400 font-semibold"
          />
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
