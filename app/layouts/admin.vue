<script setup lang="ts">
const open = ref<boolean>(true)
const items = reactive([
  {
    label: 'Dashboard',
    icon: 'lucide:layout-dashboard',
    to: '/admin'
  },
  {
    label: 'Categorias',
    icon: 'lucide:list-check',
    to: '/admin/categories'
  },
  {
    label: 'Produtos',
    icon: 'lucide:box',
    to: '/admin/products'
  },
  {
    label: 'Pedidos',
    icon: 'lucide:shopping-cart',
    to: '/admin/order'
  },
  {
    label: 'Entregas',
    icon: 'lucide:van',
    to: '/admin/delivery'
  },
  {
    label: 'Fornecedores',
    icon: 'lucide:truck',
    to: '/admin/suppliers'
  },
  {
    label: 'Estoque',
    icon: 'lucide:boxes',
    to: '/admin/stock'
  },
  {
    label: 'Armazéns',
    icon: 'lucide:warehouse',
    to: '/admin/warehouses'
  },
  {
    label: 'Usuarios',
    icon: 'lucide:users',
    to: '/admin/users'
  },
  {
    label: 'Configuracoes',
    icon: 'lucide:settings',
    to: '/admin/config'
  }
])
const authStore = useAuthStore()

const fullName = computed(
  () => `${authStore.user?.firstname} ${authStore.user?.lastname}`
)
</script>

<template>
  <div class="flex min-h-screen h-max">
    <USidebar v-model:open="open" collapsible="icon">
      <template #title>
        <div class="flex flex-col items-center w-full pb-2">
          <div class="flex justify-between items-center w-full">
            <UiHeader :show-text="open" />

            <UIcon
              v-if="open"
              name="lucide:menu"
              class="size-6 text-zinc-400 hover:text-zinc-200 transition hidden lg:inline-block"
              @click="open = !open"
            />
          </div>
          <UIcon
            v-if="!open"
            name="lucide:menu"
            class="size-6 text-zinc-400 hover:text-zinc-200 transition"
            @click="open = !open"
          />
        </div>
      </template>
      <template #default>
        <UNavigationMenu
          :ui="{ link: 'p-1.5 overflow-hidden' }"
          :items="items"
          orientation="vertical"
        />
      </template>
      <template #footer>
        <div class="flex justify-between w-full">
          <div variant="ghost" class="flex items-center gap-2 pl-2">
            <UAvatar
              :text="
                fullName
                  .split(' ')
                  .map(name => name.at(0))
                  .join('')
              "
              size="xs"
            />

            <div class="flex flex-col" v-if="open">
              <span
                class="inline-block w-max text-xs font-medium text-zinc-400"
              >
                {{ fullName }}
              </span>
              <span class="inline-block text-xs font-semibold text-zinc-400">
                {{ authStore.user?.role }}
              </span>
            </div>
          </div>
          <UButton
            v-if="open"
            icon="lucide:arrow-right-to-line"
            variant="ghost"
            color="neutral"
            size="sm"
            @click="authStore.logout()"
          ></UButton>
        </div>
      </template>
    </USidebar>

    <div class="min-h-screen h-max w-full bg-ui-bg text-ui-text relative">
      <div
        @click="open = !open"
        v-if="!open"
        class="size-10 flex items-center justify-center bg-zinc-900 rounded-md lg:hidden absolute left-4 top-4 z-10 hover:bg-zinc-800"
      >
        <UIcon
          name="lucide:menu"
          class="size-6 text-zinc-500 hover:text-zinc-300 transition"
        />
      </div>
      <div class="px-4 py-5 min-h-screen h-max">
        <slot />
      </div>
    </div>
  </div>
</template>
