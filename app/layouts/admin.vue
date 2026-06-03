<script setup lang="ts">
const open = ref<boolean>(true)
const items: NavigationMenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'lucide:layout-dashboard',
    to: '/admin/'
  },

  {
    label: 'Categorias',
    icon: 'lucide:list-check',
    to: '/admin/categories'
  },
  {
    label: 'Produtos',
    icon: 'lucide:shopping-cart',
    to: '/admin/products',
    children: [
      {
        label: 'Novo',
        icon: 'lucide:plus-circle',
        to: '/admin/products/new'
      }
    ]
  },
  {
    label: 'Pedidos',
    icon: 'lucide:hand-platter',
    to: '/admin/orders'
  },
  {
    label: 'Fornecedores',
    icon: 'lucide:truck',
    to: '/admin/suppliers'
  },
  {
    label: 'Estoque',
    icon: 'lucide:package',
    to: '/admin/stock'
  },
  {
    label: 'Armazens',
    icon: 'lucide:warehouse',
    to: '/admin/warehouses'
  },
  {
    label: 'Usuarios',
    icon: 'lucide:users',
    to: '/admin/users'
  },
  {
    label: 'Relatorios',
    icon: 'lucide:scroll-text',
    to: '/admin/logs'
  },
  {
    label: 'Configuracoes',
    icon: 'lucide:settings',
    to: '/admin/config'
  }
]

const user = ref({
  name: 'Jose Luis',
  email: 'joseluis075@example.com'
})
</script>

<template>
  <div class="flex min-h-screen">
    <USidebar v-model:open="open" collapsible="icon">
      <template #title>
        <div class="flex flex-col items-center w-full pb-2">
          <div class="flex justify-between items-center w-full">
            <UiHeader :show-text="open" />

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
                user.name
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
                {{ user.name }}
              </span>
              <span class="inline-block text-xs font-semibold text-zinc-400">
                Funcionario
              </span>
            </div>
          </div>
          <UButton icon="lucide:arrow-right-to-line" variant="ghost"></UButton>
        </div>
      </template>
    </USidebar>
    <div class="min-h-screen h-max bg-ui-bg w-full text-black">
      <div class="px-50 py-5">
        <slot />
      </div>
    </div>
  </div>
</template>
