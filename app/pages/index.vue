<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";

const cards = ref([
  {
    title: "Total de produtos",
    description: "121",
    to: "/products",
    icon: "material-symbols:shopping-cart",
  },
  {
    title: "Estoque baixo",
    description: "13",
    to: "/orders",
    icon: "material-symbols:hourglass-check-outline",
  },
  {
    title: "Esgotado",
    description: "41",
    to: "/products",
    icon: "material-symbols:stroller-rounded",
  },

  {
    title: "Fornecedores",
    description: "21",
    to: "/suppliers",
    icon: "material-symbols:account-balance-wallet",
  },
]);

const option = {
  title: {
    text: "Comparação de vendas",
    textStyle: {
      color: "#fff",
    },
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["2024", "2025"],
    textStyle: {
      color: "#000",
    },
  },
  xAxis: {
    type: "category",
    data: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    axisLabel: {
      color: "#333",
    },
    axisLine: {
      lineStyle: {
        color: "#475569",
      },
    },
  },
  yAxis: {
    type: "value",
    axisLabel: {
      color: "#444",
    },
    splitLine: {
      lineStyle: {
        color: "#ddd",
      },
    },
  },
  series: [
    {
      name: "2024",
      type: "line",
      smooth: true,
      showSymbol: false,
      data: [17, 12, 18, 14, 22, 30, 28, 35, 40, 38, 45, 50],
      lineStyle: {
        width: 2,
        color: "rgba(245, 39, 39, 0.5)",
      },
      areaStyle: {
        color: "rgba(245, 39, 39, 0.47)",
      },
    },
    {
      name: "2025",
      type: "line",
      smooth: true,
      showSymbol: false,
      data: [12, 20, 25, 19, 35, 40, 42, 48, 55, 60, 58, 70],
      lineStyle: {
        width: 2,
        color: "#22c55e",
      },
      areaStyle: {
        color: "rgba(34,197,94,0.2)",
      },
    },
  ],
};

type Order = {
  id: string;
  supplierId: string;
  productsCount: number;
  totalItems: number;
  status: string;
  warehouseId: string;
  total: number;
  createdAt: string;
  expectedArrival: string;
};

const data: Order[] = ref([
  {
    id: "ENT-001",
    supplierId: "SUP-001",
    productsCount: 12,
    status: "Recebido",
    warehouseId: "WAR-001",
    total: 1850000,
    createdAt: "2026-05-12",
  },
  {
    id: "ENT-002",
    supplierId: "SUP-002",
    productsCount: 8,
    status: "Pendente",
    warehouseId: "WAR-002",
    total: 920000,
    createdAt: "2026-05-11",
  },
  {
    id: "ENT-003",
    supplierId: "SUP-003",
    productsCount: 15,
    status: "Em trânsito",
    warehouseId: "WAR-003",
    total: 1435000,
    createdAt: "2026-05-10",
  },
  {
    id: "ENT-004",
    supplierId: "SUP-004",
    productsCount: 5,
    status: "Recebido",
    warehouseId: "WAR-001",
    total: 410000,
    createdAt: "2026-05-09",
  },
  {
    id: "ENT-005",
    supplierId: "SUP-005",
    productsCount: 20,
    status: "Cancelado",
    warehouseId: "WAR-004",
    total: 2750000,
    createdAt: "2026-05-08",
  },
]);

const columns: TableColumn[Order] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "supplierId",
    header: "Fornecedor",
  },
  {
    accessorKey: "productsCount",
    header: "Produtos",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    accessorKey: "warehouseId",
    header: "Armazem",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "createdAt",
    header: "Pedido em",
  },
];
</script>

<template>
  <div class="space-y-4">
    <div>
      <h1 class="text-2xl font-semibold">Dashboard</h1>
    </div>
    <div class="flex gap-4 w-full h-max">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-1/2">
        <UiCard
          v-for="(card, index) in cards"
          :key="index"
          :icon="card.icon"
          :to="card.to"
          :title="card.title"
          :description="card.description"
        />
      </div>

      <div class="bg-white py-4 px-4 rounded-md min-h-96 w-2/4">
        <UiH3>Entradas de estoque</UiH3>
        <VChart class="w-full" :option="option" />
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div class="bg-white rounded-md py-3 px-3 space-y-2">
        <h3>Pedidos recentes</h3>
        <UTable :data="data" :columns="columns" />
      </div>
      <div class="bg-white rounded-md py-3 px-3 space-y-2">
        <h3>Estoque baixo</h3>
        <UTable :data="data" :columns="columns" />
      </div>
    </div>
    <!-- <UiTable title="últimos pedidos" :columns="columns" :data="data"></UiTable> -->
  </div>
</template>
