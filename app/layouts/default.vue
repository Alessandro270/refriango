<script setup lang="ts">
const open = ref<boolean>(true)
const items: NavigationMenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'lucide:layout-dashboard',
    to: '/'
  },

  {
    label: 'Categorias',
    icon: 'lucide:list-check',
    to: '/categories'
  },
  {
    label: 'Produtos',
    icon: 'lucide:box',
    to: '/products',
    children: [
      {
        label: 'Novo',
        icon: 'lucide:plus-circle',
        to: '/products/new'
      }
    ]
  },
  {
    label: 'Pedidos de compra',
    icon: 'lucide:shopping-cart',
    to: '/purchases'
  },
  {
    label: 'Pedidos de venda',
    icon: 'material-symbols:point-of-sale-rounded',
    to: '/sales'
  },
  {
    label: 'Entregas',
    icon: 'lucide:van',
    to: '/delivery',
    children: [
      {
        to: '/delivery/new',
        label: 'Novo',
        icon: 'lucide:plus-circle'
      }
    ]
  },
  {
    label: 'Fornecedores',
    icon: 'lucide:truck',
    to: '/suppliers'
  },
  {
    label: 'Estoque',
    icon: 'lucide:boxes',
    to: '/stock'
  },
  {
    label: 'Armazens',
    icon: 'lucide:warehouse',
    to: '/warehouses'
  },
  {
    label: 'Configuracoes',
    icon: 'lucide:settings',
    to: '/config'
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
              name="lucide:menu"
              class="size-6 text-zinc-400 hover:text-zinc-200 transition"
              @click="open = !open"
            ></UIcon>
          </div>
          <UIcon
            v-if="!open"
            name="lucide:menu"
            class="size-6 text-zinc-400 hover:text-zinc-200 transition"
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
          <UButton
            v-if="open"
            icon="lucide:arrow-right-to-line"
            variant="ghost"
            color="neutral"
            size="sm"
          ></UButton>
        </div>
      </template>
    </USidebar>

    <div class="min-h-screen h-max bg-ui-bg w-full text-ui-text">
      <div class="px-4 py-5">
        <slot />
      </div>
    </div>
  </div>
</template>
