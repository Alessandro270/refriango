<script lang="ts" setup>
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

type StockItem = {
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  weight: string;
  status: "low-stock" | "normal" | "overstock" | "sold-out";
  expiresAt: string;
};

const data = reactive<StockItem[]>([
  {
    name: "Coca-Cola 2L",
    category: "Soft Drinks",
    quantity: 45,
    unitPrice: 2500,
    weight: "2kg",
    status: "overstock",
    expiresAt: "2026-09-15",
  },
  {
    name: "Fanta Orange 1.5L",
    category: "Soft Drinks",
    quantity: 12,
    unitPrice: 2200,
    weight: "1.5kg",
    status: "normal",
    expiresAt: "2026-08-20",
  },
  {
    name: "Sprite 2L",
    category: "Soft Drinks",
    quantity: 3,
    unitPrice: 2400,
    weight: "2kg",
    status: "low-stock",
    expiresAt: "2026-07-10",
  },
  {
    name: "Pepsi 1L",
    category: "Soft Drinks",
    quantity: 0,
    unitPrice: 1800,
    weight: "1kg",
    status: "sold-out",
    expiresAt: "2026-06-01",
  },
  {
    name: "Schweppes Tonic 330ml",
    category: "Soft Drinks",
    quantity: 20,
    unitPrice: 950,
    weight: "330g",
    status: "normal",
    expiresAt: "2026-10-05",
  },
  {
    name: "Mirinda Orange 500ml",
    category: "Soft Drinks",
    quantity: 60,
    unitPrice: 700,
    weight: "500g",
    status: "overstock",
    expiresAt: "2026-11-12",
  },
  {
    name: "7UP 1.5L",
    category: "Soft Drinks",
    quantity: 5,
    unitPrice: 2100,
    weight: "1.5kg",
    status: "low-stock",
    expiresAt: "2026-07-30",
  },
  {
    name: "Coca-Cola Zero 330ml",
    category: "Soft Drinks",
    quantity: 28,
    unitPrice: 850,
    weight: "330g",
    status: "normal",
    expiresAt: "2026-12-01",
  },
  {
    name: "Fanta Pineapple 500ml",
    category: "Soft Drinks",
    quantity: 0,
    unitPrice: 750,
    weight: "500g",
    status: "sold-out",
    expiresAt: "2026-05-28",
  },
  {
    name: "Pepsi Black 330ml",
    category: "Soft Drinks",
    quantity: 18,
    unitPrice: 900,
    weight: "330g",
    status: "normal",
    expiresAt: "2026-09-09",
  },
  {
    name: "Red Grapes Soda 1L",
    category: "Soft Drinks",
    quantity: 75,
    unitPrice: 1900,
    weight: "1kg",
    status: "overstock",
    expiresAt: "2027-01-15",
  },
  {
    name: "Schweppes Lemon 330ml",
    category: "Soft Drinks",
    quantity: 2,
    unitPrice: 950,
    weight: "330g",
    status: "low-stock",
    expiresAt: "2026-06-18",
  },
  {
    name: "Mountain Dew 500ml",
    category: "Soft Drinks",
    quantity: 14,
    unitPrice: 1100,
    weight: "500g",
    status: "normal",
    expiresAt: "2026-10-22",
  },
  {
    name: "Big Cola 2L",
    category: "Soft Drinks",
    quantity: 52,
    unitPrice: 1700,
    weight: "2kg",
    status: "overstock",
    expiresAt: "2026-11-30",
  },
  {
    name: "Sprite Zero 500ml",
    category: "Soft Drinks",
    quantity: 0,
    unitPrice: 950,
    weight: "500g",
    status: "sold-out",
    expiresAt: "2026-06-25",
  },
]);

const filteredData = computed(() =>
  data.filter((el) => el.status == "low-stock" || el.status == "sold-out"),
);

const UBadge = resolveComponent("UBadge");

const columns = [
  {
    accessorKey: "name",
    header: "nome",
  },
  {
    accessorKey: "category",
    header: "categoria",
  },
  {
    accessorKey: "quantity",
    header: "qtd",
  },
  {
    accessorKey: "unitPrice",
    header: "preco",
  },
  {
    accessorKey: "weight",
    header: "peso",
  },

  {
    accessorKey: "status",
    header: "estado",
    cell: ({ row }) => {
      let color = "";

      switch (row.getValue("status")) {
        case "low-stock":
          color = "warning";
          break;
        case "sold-out":
          color = "error";
          break;
        case "overstock":
          color = "info";
          break;
        default:
          color = "success";
      }
      console.log(color);

      return h(UBadge, { class: "capitalize", variant: "solid", color }, () =>
        row.getValue("status"),
      );
    },
  },
];
</script>

<template>
  <div class="space-y-4">
    <div>
      <UiH1 >Dashboard</UiH1>
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

    <UiTable :data="filteredData" :columns="columns">
      <template #header>
        <div class="flex justify-between items-center">
          <UiH3>produtos em estoque baixo</UiH3>
          <UButton>ver todos</UButton>
        </div>
      </template>
    </UiTable>
  </div>
</template>
