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

const columns = reactive<string[]>([
  "#",
  "fornecedor",
  "estado",
  "total",
  "data",
]);

const statusFilters = ref(["Todos", "Concluído", "Pendente", "Cancelado"]);

const supplierFilters = ref([
  "Todos os fornecedores",
  "SUP-001",
  "SUP-002",
  "SUP-003",
  "SUP-004",
]);

const selectedStatus = ref("Todos");
const selectedSupplier = ref("Todos os fornecedores");
const search = ref("");

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesStatus =
      selectedStatus.value === "Todos" || order.status === selectedStatus.value;

    const matchesSupplier =
      selectedSupplier.value === "Todos os fornecedores" ||
      order.supplierId === selectedSupplier.value;

    const matchesSearch =
      order.id.toLowerCase().includes(search.value.toLowerCase()) ||
      order.supplierId.toLowerCase().includes(search.value.toLowerCase());

    return matchesStatus && matchesSupplier && matchesSearch;
  });
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Pedidos</h1>

      <UButton icon="lucide:plus"> Novo Pedido </UButton>
    </div>

    <div class="flex items-center justify-between gap-4">
      <UInput
        v-model="search"
        icon="i-lucide-search"
        placeholder="Pesquisar pedido..."
        class="max-w-sm w-full text-white"
      />

      <div class="flex gap-4">
        <USelect v-model="selectedStatus" :items="statusFilters" class="w-52" />

        <USelect
          v-model="selectedSupplier"
          :items="supplierFilters"
          class="w-64"
        />
      </div>
    </div>

    <UiTable title="Pedidos" :columns="columns" :data="filteredOrders" />
  </div>
</template>
