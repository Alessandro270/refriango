<script setup lang="ts">
import { ref } from "vue";

const search = ref("");

const statusFilters = ref(["Todos", "Ativo", "Inativo", "Em falta"]);

const categoryFilters = ref([
  "Todas categorias",
  "Eletrónicos",
  "Acessórios",
  "Armazenamento",
  "Periféricos",
  "Mobiliário",
]);

const selectedStatus = ref("Todos");
const selectedCategory = ref("Todas categorias");
const products = ref([
  {
    name: "Coca-Cola 350ml",
    description: "Refrigerante gaseificado clássico.",
    unitPrice: 500,
    category: "Bebidas",
    sku: "DRK-COKE-350",
    weight: 0.35,
    height: 12,
    width: 6,
    refrigerated: true,
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e",
  },
  {
    name: "Pepsi 350ml",
    description: "Refrigerante de cola refrescante.",
    unitPrice: 500,
    category: "Bebidas",
    sku: "DRK-PEPSI-350",
    weight: 0.35,
    height: 12,
    width: 6,
    refrigerated: true,
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e",
  },
  {
    name: "Fanta Laranja 350ml",
    description: "Refrigerante com sabor laranja.",
    unitPrice: 450,
    category: "Bebidas",
    sku: "DRK-FANTA-350",
    weight: 0.35,
    height: 12,
    width: 6,
    refrigerated: true,
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423",
  },
  {
    name: "Sprite 350ml",
    description: "Refrigerante de limão refrescante.",
    unitPrice: 450,
    category: "Bebidas",
    sku: "DRK-SPRITE-350",
    weight: 0.35,
    height: 12,
    width: 6,
    refrigerated: true,
    image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca",
  },
  {
    name: "Água Mineral 500ml",
    description: "Água mineral natural engarrafada.",
    unitPrice: 200,
    category: "Bebidas",
    sku: "DRK-WATER-500",
    weight: 0.5,
    height: 20,
    width: 6,
    refrigerated: false,
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e",
  },
]);
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Produtos</h1>

      <UButton icon="lucide:plus"> Novo produto </UButton>
    </div>

    <div class="flex items-center justify-between gap-4">
      <UInput
        v-model="search"
        icon="i-lucide-search"
        placeholder="Pesquisar produto..."
        class="max-w-sm w-full"
      />

      <div class="flex gap-4">
        <USelect v-model="selectedStatus" :items="statusFilters" class="w-52" />

        <USelect
          v-model="selectedCategory"
          :items="categoryFilters"
          class="w-64"
        />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UiProduct
        v-for="product in products"
        :key="product.sku"
        :product="product"
      />
    </div>
  </div>
</template>
