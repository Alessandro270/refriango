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
    class="rounded-xl overflow-hidden bg-white hover:shadow-lg transition flex flex-col max-w-sm w-full"
  >
    <!-- IMAGE -->
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

      <!-- DIMENSIONS (TOP LEFT) -->
      <div
        class="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm"
      >
        {{ product.height }} × {{ product.width }}
      </div>

      <!-- BADGE (TOP RIGHT) -->
      <div class="absolute top-2 right-2">
        <UBadge
          :color="product.refrigerated ? 'primary' : 'neutral'"
          variant="subtle"
        >
          {{ product.refrigerated ? "Refrigerado" : "Normal" }}
        </UBadge>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="p-4 flex flex-col gap-2">
      <!-- Title + SKU -->
      <div>
        <h2 class="text-base font-semibold text-gray-900">
          {{ product.name }}
        </h2>

        <p class="text-xs text-gray-500">
          {{ product.sku }}
        </p>
      </div>

      <!-- Description -->
      <p class="text-sm text-gray-600 line-clamp-2">
        {{ product.description }}
      </p>

      <!-- Footer info -->
      <div class="flex items-center justify-between mt-2 text-sm">
        <span class="text-gray-500">
          {{ product.category }}
        </span>

        <span class="font-semibold text-gray-900">
          {{ product.unitPrice.toLocaleString("pt-AO") }} Kz
        </span>
      </div>

      <!-- Actions -->
      <div class="flex gap-2 mt-3">
        <UButton
          size="sm"
          color="neutral"
          variant="soft"
          class="w-full flex justify-center"
        >
          Ver detalhes
        </UButton>
      </div>
    </div>
  </div>
</template>
