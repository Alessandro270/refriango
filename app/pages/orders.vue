<script lang="ts" setup>
import { computed, ref } from "vue";

type Order = {
  id: string;
  supplierId: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
};

const orders = ref<Order[]>([
  {
    id: "ORD-001",
    supplierId: "SUP-001",
    status: "completed",
    total: 125,
    createdAt: "10/05/2026",
    updatedAt: "06/05/2026",
  },
  {
    id: "ORD-002",
    supplierId: "SUP-002",
    status: "pending",
    total: 45,
    createdAt: "09/05/2026",
    updatedAt: "06/05/2026",
  },
  {
    id: "ORD-003",
    supplierId: "SUP-003",
    status: "cancelled",
    total: 98,
    createdAt: "08/05/2026",
    updatedAt: "06/05/2026",
  },
  {
    id: "ORD-004",
    supplierId: "SUP-001",
    status: "completed",
    total: 70,
    createdAt: "07/05/2026",
    updatedAt: "06/05/2026",
  },
  {
    id: "ORD-005",
    supplierId: "SUP-004",
    status: "pending",
    total: 51,
    createdAt: "06/05/2026",
    updatedAt: "06/05/2026",
  },
]);

const UBadge = resolveComponent("UBadge");
const UButton = resolveComponent("UButton");

const columns = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "supplierId",
    header: "fornecedor",
  },
  {
    accessorKey: "total",
    header: "total",
  },
  {
    accessorKey: "createdAt",
    header: "data",
  },
  {
    accessorKey: "updatedAt",
    header: "Ultima atualizacao",
  },
  {
    accessorKey: "status",
    header: "estado",
    cell: ({ row }) => {
      let color = "";
      let value = "";
      switch (row.getValue("status")) {
        case "pending":
          color = "warning";
          value = "pendente";
          break;
        case "completed":
          color = "success";
          value = "completo";
          break;
        case "cancelled":
          color = "error";
          value = "cancelado";
          break;
        default:
          color = "neutral";
      }

      return h(UBadge, { variant: "solid", color }, () => value);
    },
  },
];

const statusFilters = ref(["Todos", "completed", "pending", "cancelled"]);

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

    <UiTable :data="filteredOrders" :columns="columns">
      <template #header>
        <div class="flex justify-between items-center space-x-4 w-full">
          <UInput
            v-model="search"
            icon="i-lucide-search"
            placeholder="Pesquisar pedido..."
          />
          <div class="flex items-center gap-4">
            <USelect v-model="selectedStatus" :items="statusFilters" />
            <UModal title="Novo pedido">
              <UButton icon="lucide:plus"> Novo Pedido </UButton>
              <template #body>
                <UiModalOrder />
              </template>
            </UModal>
          </div>
        </div>
      </template>
    </UiTable>
  </div>
</template>
