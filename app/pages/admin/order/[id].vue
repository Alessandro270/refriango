<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const route = useRoute()
const id = route.params.id

const orderStore = useOrderStore()
const order = ref(null)

const statusMap = {
  pending: {
    label: 'pendente',
    icon: 'lucide:clock',
    color: 'warning'
  },
  approved: {
    label: 'aprovado',
    icon: 'lucide:check',
    color: 'success'
  },
  completed: {
    label: 'concluído',
    icon: 'lucide:check-circle',
    color: 'success'
  },
  cancelled: {
    label: 'cancelado',
    icon: 'lucide:x',
    color: 'error'
  }
}

const currentStatus = ref(statusMap.pending)

watch(
  () => order.value?.status,
  () => (currentStatus.value = statusMap[order.value?.status ?? 'pending'])
)

async function updateStatus(status: string) {
  await orderStore.update(id, { status })
  order.value.status = status
}

onMounted(async () => {
  order.value = await orderStore.getOne(id)
})

const uiModalStyle = {
  content: 'w-100! h-10!',
  title: 'uppercase'
}

const approveOpen = ref<boolean>(false)
const cancelOpen = ref<boolean>(false)
const completeOpen = ref<boolean>(false)
</script>

<template>
  <div class="min-h-screen flex-1">
    <UiH3 size="lg" class="mb-4">Detalhes do pedido</UiH3>

    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 rounded-md bg-white">
        <div
          class="p-4 border-b border-zinc-200 flex items-center justify-between"
        >
          <UiH3 size="sm">
            <span> Informações básicas </span>

            <UBadge
              :icon="currentStatus.icon"
              :color="currentStatus.color"
              class="rounded-full"
              variant="solid"
            >
              {{ currentStatus.label }}
            </UBadge>
          </UiH3>

          <div class="flex items-center gap-2">
            <UModal
              :ui="uiModalStyle"
              title="Tem certeza?"
              v-model:open="completeOpen"
            >
              <UButton
                icon="lucide:box"
                class="rounded-sm uppercase font-bold text-zinc-900 py-0.5 text-[10.5px]"
                variant="solid"
                size="xs"
                color="warning"
              >
                Completo
              </UButton>
              <template #body>
                <UiModalConfirm
                  @close="completeOpen = false"
                  @confirm="
                    () => {
                      updateStatus('completed')
                      completeOpen = false
                    }
                  "
                />
              </template>
            </UModal>

            <UModal
              :ui="uiModalStyle"
              title="Tem certeza?"
              v-model:open="approveOpen"
            >
              <UButton
                icon="lucide:check"
                class="rounded-sm uppercase font-bold text-zinc-900 py-0.5 text-[10.5px]"
                variant="solid"
                size="xs"
                color="success"
              >
                Aprovar
              </UButton>
              <template #body>
                <UiModalConfirm
                  @close="approveOpen = false"
                  @confirm="
                    () => {
                      updateStatus('approved')
                      approveOpen = false
                    }
                  "
                />
              </template>
            </UModal>

            <UModal
              :ui="uiModalStyle"
              title="Tem certeza?"
              v-model:open="cancelOpen"
            >
              <UButton
                icon="lucide:x"
                class="rounded-sm uppercase font-bold text-zinc-900 py-0.5 text-[10.5px]"
                variant="solid"
                size="xs"
                color="error"
              >
                Cancelar
              </UButton>

              <template #body>
                <UiModalConfirm
                  @close="cancelOpen = false"
                  @confirm="
                    () => {
                      updateStatus('cancelled')
                      cancelOpen = false
                    }
                  "
                />
              </template>
            </UModal>
          </div>
        </div>

        <div class="p-4 grid grid-cols-4 gap-4">
          <UiLegend title="ID" :description="order?._id" />
          <UiLegend
            title="Data estimada"
            :description="
              order?.expectedDate
                ? new Date(order?.expectedDate).toLocaleDateString()
                : null
            "
          />
          <UiLegend
            title="Data do pedido"
            :description="
              order?.createdAt
                ? new Date(order?.createdAt).toLocaleDateString()
                : null
            "
          />
          <UiLegend
            title="Data de entrega"
            :description="
              order?.actualDate
                ? new Date(order?.actualDate).toLocaleDateString()
                : null
            "
          />
        </div>
      </div>

      <div class="col-span-8 rounded-md h-max bg-white">
        <div class="p-4 border-b border-zinc-200">
          <UiH3 size="sm">Informações do produto</UiH3>
        </div>

        <div class="p-4 grid grid-cols-3 gap-8">
          <UiLegend title="ID" :description="order?.product?._id" />
          <UiLegend title="Nome" :description="order?.productName" />

          <UiLegend
            title="Categoria"
            :description="order?.product?.categoryName"
          />
          <UiLegend
            title="Fornecedor"
            :description="order?.product?.supplierName"
          />

          <UiLegend
            title="Refrigerado"
            :description="order?.product?.refrigerated ? 'sim' : 'não'"
          />
          <UiLegend
            title="Preço"
            :description="order?.price ? order?.price : '0'"
          />
          <UiLegend title="Quantidade" :description="order?.quantity" />

          <UiLegend title="Total" :description="order?.total" />
        </div>
      </div>
      <div class="col-span-4 rounded-md bg-white">
        <div class="p-4 border-b border-zinc-200">
          <UiH3 size="sm">Informações do fornecedor</UiH3>
        </div>

        <div class="p-4 space-y-6">
          <UiLegend title="Nome" :description="order?.supplier?.name" />

          <UiLegend title="Email" :description="order?.supplier?.email" />

          <UiLegend title="Telefone" :description="order?.supplier?.phone" />

          <UiLegend title="Endereço" :description="order?.supplier?.address" />
        </div>
      </div>
    </div>
  </div>
</template>
