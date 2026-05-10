<script lang="ts" setup>
import { LineChart } from "vue-chrts";

type Order = {
  id: string;
  supplierId: string;
  status: string;
  total: number;
  createdAt: string;
};
const UBadge = resolveComponent("UBadge");
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

const categories = {
  stock: { name: "Estoque", color: "red" },
  month: { name: "Mês", color: "purple" },
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex space-x-4 w-full mt-8">
      <UiCard description="1,912,182.00kz" title="valor total em estoque" />
      <UiCard description="1,912,182.00kz" title="entradas do mês" />
      <UiCard description="1,912,182.00kz" title="saídas do mês" />
    </div>
    <div class="flex gap-4 w-full">
      <div class="bg-white py-2 px-4 rounded-md w-2/3">
        <div class="flex items-center justify-between">
          <h3 class="font-medium text-ui-text">Níveis de estoque</h3>
          <div class="space-x-2 w-max">
            <UButton label="semanal" color="neutral"></UButton>
            <UButton label="mensal" color="neutral"></UButton>
          </div>
        </div>
        <LineChart
          :data="[
            { month: 'Jan', stock: 11 },
            { month: 'Feb', stock: 26 },
            { month: 'Mar', stock: 59 },
            { month: 'Apr', stock: 40 },
            { month: 'May', stock: 67 },
            { month: 'Jun', stock: 79 },
            { month: 'Jul', stock: 75 },
            { month: 'Aug', stock: 89 },
            { month: 'Sept', stock: 129 },
            { month: 'Oct', stock: 112 },
            { month: 'Nov', stock: 142 },
            { month: 'Dec', stock: 150 },
            { month: 'Jan', stock: 156 },
            { month: 'Feb', stock: 145 },
            { month: 'Mar', stock: 179 },
            { month: 'Apr', stock: 150 },
            { month: 'May', stock: 90 },
            { month: 'Jun', stock: 160 },
            { month: 'Jul', stock: 130 },
            { month: 'Aug', stock: 150 },
          ]"
          :categories="categories"
        />
      </div>
      <div class="bg-white py-2 px-4 rounded-md w-1/3">
        <h3 class="font-medium text-ui-text">Alerta estoque baixo</h3>
        <ul class="py-2 flex flex-col gap-2">
          <UiLevel>Agua Pura</UiLevel>
          <UiLevel>Speed</UiLevel>
          <UiLevel>Fanta</UiLevel>
          <li
            class="pt-4 border-t mt-30 text-center flex items-center justify-center gap-2 font-medium text-primary-600 border-t-grays-200"
          >
            <span class="inline-block"> Verificar estoque </span>
            <UIcon name="lucide:move-right" />
          </li>
        </ul>
      </div>
    </div>
    <UiTable :columns="columns" :data="data"></UiTable>
  </div>
</template>
