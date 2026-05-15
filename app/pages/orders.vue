<script lang="ts" setup>
import { computed, ref } from "vue";

type Order = {
  id: string;
  supplierId: string;
  status: string;
  total: number;
  createdAt: string;
};

const orders = ref<Order[]>([
  {
    id: "ORD-001",
    supplierId: "SUP-001",
    status: "Concluído",
    total: 125000,
    createdAt: "10/05/2026",
  },
  {
    id: "ORD-002",
    supplierId: "SUP-002",
    status: "Pendente",
    total: 45000,
    createdAt: "09/05/2026",
  },
  {
    id: "ORD-003",
    supplierId: "SUP-003",
    status: "Cancelado",
    total: 98000,
    createdAt: "08/05/2026",
  },
  {
    id: "ORD-004",
    supplierId: "SUP-001",
    status: "Concluído",
    total: 76000,
    createdAt: "07/05/2026",
  },
  {
    id: "ORD-005",
    supplierId: "SUP-004",
    status: "Pendente",
    total: 51000,
    createdAt: "06/05/2026",
  },
]);

const statusFilters = ref(["Todos", "Concluído", "Pendente", "Cancelado"]);

const selectedStatus = ref("Todos");
const search = ref("");

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesStatus =
      selectedStatus.value === "Todos" || order.status === selectedStatus.value;

    const matchesSearch =
      order.id.toLowerCase().includes(search.value.toLowerCase()) ||
      order.supplierId.toLowerCase().includes(search.value.toLowerCase());

    return matchesStatus && matchesSearch;
  });
});
</script>

<template>
  <div class="space-y-6">
    <UiH1>pedidos</UiH1>

    <UiTable :data="filteredOrders">
      <template #header>
        <div class="flex justify-between items-center space-x-4 w-full">
          <UInput
            v-model="search"
            icon="i-lucide-search"
            placeholder="Pesquisar pedido..."
          />
          <div class="flex items-center gap-4">
          <USelect v-model="selectedStatus" :items="statusFilters" />
            <UButton icon="lucide:plus"> Novo Pedido </UButton>
          </div>
        </div>
      </template>
    </UiTable>
  </div>
</template>
