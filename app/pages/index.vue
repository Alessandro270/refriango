<script lang="ts" setup>
import { BarChart } from "echarts/charts";

type Order = {
  id: string;
  supplierId: string;
  status: string;
  total: number;
  createdAt: string;
};

const data = ref([
  {
    id: "ORD-001",
    supplierId: "SUP-001",
    status: "completed",
    total: 125000,
    createdAt: "2026-05-09T10:30:00",
  },
  {
    id: "ORD-002",
    supplierId: "SUP-002",
    status: "pending",
    total: 45000,
    createdAt: "2026-05-08T14:10:00",
  },
  {
    id: "ORD-003",
    supplierId: "SUP-003",
    status: "cancelled",
    total: 98000,
    createdAt: "2026-05-07T09:20:00",
  },
  {
    id: "ORD-004",
    supplierId: "SUP-001",
    status: "completed",
    total: 76000,
    createdAt: "2026-05-06T16:45:00",
  },
]);

const columns = reactive<string[]>([
  "#",
  "fornecedor",
  "estado",
  "total",
  "data",
]);

const cards = ref([
  {
    title: "Total de produtos",
    description: "121",
    to: "/products",
  },
  {
    title: "Estoque baixo",
    description: "13",
    to: "/orders",
  },
  {
    title: "Esgotado",
    description: "41",
    to: "/products",
  },

  {
    title: "Fornecedores",
    description: "21",
    to: "/suppliers",
  },
]);

const option = ref<ECOption>({
  title: {
    text: "Stock por Armazém",
  },
  tooltip: {},
  xAxis: {
    type: "category",
    data: [
      "Central",
      "Viana",
      "Talatona",
      "Kilamba",
      "Viana",
      "Talatona",
      "Kilamba",
      "Kilamba",
      "Viana",
      "Talatona",
      "Kilamba",
    ],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      type: "bar",
      data: [320, 210, 180, 90, 210, 180, 90, 210, 180, 90, 341],
      itemStyle: {
        color: "#ef4444",
      },
    },
  ],
});
</script>

<template>
  <div class="space-y-4">
    <div>
      <h1 class="text-2xl font-semibold">Dashboard</h1>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
      <UiCard
        v-for="(card, index) in cards"
        :key="index"
        :to="card.to"
        :title="card.title"
        :description="card.description"
      />
    </div>

    <div class="flex gap-4 w-full h-max">
      <div class="bg-white py-2 px-4 rounded-md space-y-10 w-1/4">
        <div class="space-y-10">
          <UiH3>Valor em estoque</UiH3>
          <p class="text-3xl font-semibold text-ui-text">1.250.750,00 kz</p>
        </div>
        <div>
          <UiH3>Compras de estoque</UiH3>
          <ul>
            <li>Pendente 4</li>
            <li>Recebido 1</li>
          </ul>
        </div>
      </div>
      <div class="bg-white py-2 px-4 rounded-md min-h-96 w-3/4">
        <VChart :option="option" />
      </div>
    </div>

    <UiTable title="últimos pedidos" :columns="columns" :data="data"></UiTable>
  </div>
</template>
