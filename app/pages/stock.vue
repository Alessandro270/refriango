<script setup lang="ts">
const stocks = ref([
  {
    id: "STK-2026-001",
    product: "MacBook Pro M3",
    sku: "APL-MBP-M3",
    warehouse: "Armazém Central",
    quantity: 24,
    minimumStock: 10,
    maximumStock: 50,
    reorderQuantity: 15,
    status: "Disponível",
    lastUpdated: "10/05/2026",
  },
  {
    id: "STK-2026-002",
    product: "Teclado Mecânico RGB",
    sku: "KEY-RGB-87",
    warehouse: "Filial Talatona",
    quantity: 6,
    minimumStock: 10,
    maximumStock: 40,
    reorderQuantity: 20,
    status: "Baixo",
    lastUpdated: "10/05/2026",
  },
  {
    id: "STK-2026-003",
    product: 'Monitor UltraWide 34"',
    sku: "MON-UW34",
    warehouse: "Armazém Viana",
    quantity: 0,
    minimumStock: 5,
    maximumStock: 25,
    reorderQuantity: 10,
    status: "Esgotado",
    lastUpdated: "09/05/2026",
  },
  {
    id: "STK-2026-004",
    product: "Mouse Logitech MX",
    sku: "MSE-MX3",
    warehouse: "Armazém Central",
    quantity: 38,
    minimumStock: 12,
    maximumStock: 60,
    reorderQuantity: 15,
    status: "Disponível",
    lastUpdated: "10/05/2026",
  },
  {
    id: "STK-2026-005",
    product: "SSD NVMe 1TB",
    sku: "SSD-NV1TB",
    warehouse: "Filial Kilamba",
    quantity: 11,
    minimumStock: 10,
    maximumStock: 45,
    reorderQuantity: 20,
    status: "Crítico",
    lastUpdated: "10/05/2026",
  },
  {
    id: "STK-2026-006",
    product: "Cadeira Gamer Pro",
    sku: "CHR-GMR-PRO",
    warehouse: "Armazém Benfica",
    quantity: 19,
    minimumStock: 8,
    maximumStock: 30,
    reorderQuantity: 10,
    status: "Disponível",
    lastUpdated: "10/05/2026",
  },
]);

const columns = [
  "#",
  "produto",
  "codigo",
  "armazem",
  "qtd",
  "Min",
  "Max",
  "qtd. Reposicao",
  "estado",
  "ultima Atualizacao",
];
const statusFilters = ref([
  "Todos",
  "Disponível",
  "Baixo",
  "Crítico",
  "Esgotado",
]);

const warehouseFilters = ref([
  "Todos os Armazéns",
  "Armazém Central",
  "Armazém Viana",
  "Armazém Benfica",
  "Filial Talatona",
  "Filial Kilamba",
]);

const selectedStatus = ref("Todos");
const selectedWarehouse = ref("Todos os Armazéns");
</script>

<template>
  <div class="space-y-6">
    <div class="w-full flex justify-between">
      <h1 class="text-2xl font-semibold">Estoque</h1>
      <UButton icon="lucide:plus">Novo Estoque</UButton>
    </div>
    <div class="flex justify-between">
      <UInput
        icon="i-lucide-search"
        size="md"
        variant="outline"
        placeholder="Pesquisar..."
      />
      <div class="flex gap-4">
        <USelect
          v-model="selectedStatus"
          :items="statusFilters"
          placeholder="Filtrar por estado"
          class="w-52"
        />

        <USelect
          v-model="selectedWarehouse"
          :items="warehouseFilters"
          placeholder="Filtrar por armazém"
          class="w-64"
        />
      </div>
    </div>

    <UiTable :columns="columns" :data="stocks" />
  </div>
</template>
