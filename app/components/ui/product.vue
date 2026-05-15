<script setup lang="ts">
type Product = {
  name: string;
  description: string;
  unitPrice: number;
  category: string;
  sku: string;
  weight: number;
  height: number;
  width: number;
  refrigerated: boolean;
  expiresAt?: string;
  image?: string;
};

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div
    class="rounded-md overflow-hidden bg-white transition flex flex-col w-full"
  >
    <div class="h-48 w-full bg-gray-100 relative">
      <img
        v-if="product.image"
        :src="product.image"
        class="w-full h-full object-cover"
        alt="product image"
      />

      <div
        v-else
        class="w-full h-full flex items-center justify-center text-gray-400 text-sm"
      >
        Sem imagem
      </div>

      <div
        class="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm"
      >
        {{ product.height }} × {{ product.width }}
      </div>

      <div class="absolute top-2 right-2">
        <UBadge
          :color="product.refrigerated ? 'success' : 'neutral'"
          variant="solid"
        >
          {{ product.refrigerated ? "Refrigerado" : "Normal" }}
        </UBadge>
      </div>
    </div>

    <div class="p-4 flex flex-col gap-2">
      <div class="flex justify-between">
        <h2 class="text-base font-semibold text-gray-900">
          {{ product.name }}
        </h2>

        <p class="text-xs text-gray-500">
          {{ product.sku }}
        </p>
      </div>

      <!-- <p class="text-sm text-gray-600 line-clamp-2">
        {{ product.description }}
      </p> -->

      <div class="flex items-center justify-between mt-2 text-sm">
        <UBadge>
          {{ product.category }}
        </UBadge>

        <span class="font-semibold text-gray-900 flex items-center">
          <span>{{ product.unitPrice.toLocaleString("pt-AO") }} Kz</span>
          <UIcon
            name="material-symbols:attach-money"
            class="text-green-500 size-5"
          />
        </span>
      </div>

      <div class="flex gap-2 mt-3">
        <UButton
          size="sm"
          color="neutral"
          variant="soft"
          class="w-full flex justify-center"
          to="/stock"
        >
          Ver estoque
        </UButton>
      </div>
    </div>
  </div>
</template>
