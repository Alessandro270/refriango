<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const deliveryStore = useDeliveryStore()
const delivery = ref(null)
const route = useRoute()
const id = route.params.id

onMounted(async () => {
  delivery.value = await deliveryStore.getOne(id)
})

async function updateStatus(status: string) {
  await deliveryStore.update(id, { status })
  delivery.value.status = status
}

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
  () => delivery.value?.status,
  () => (currentStatus.value = statusMap[delivery.value?.status ?? 'pending'])
)

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
    <UiH3 size="lg" class="mb-4">Detalhes da entrega</UiH3>

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
              v-model:open="completeOpen"
              title="Tens a certeza?"
              :ui="uiModalStyle"
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
              v-model:open="approveOpen"
              title="Tens a certeza?"
              :ui="uiModalStyle"
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
              v-model:open="cancelOpen"
              title="Tens a certeza?"
              :ui="uiModalStyle"
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
          <UiLegend title="ID" :description="delivery?._id" />
          <UiLegend
            title="Data estimada"
            :description="
              delivery?.expectedDate
                ? new Date(delivery?.expectedDate).toLocaleDateString()
                : null
            "
          />
          <UiLegend
            title="Data do pedido"
            :description="
              delivery?.createdAt
                ? new Date(delivery?.createdAt).toLocaleDateString()
                : null
            "
          />
          <UiLegend
            title="Data de entrega"
            :description="
              delivery?.actualDate
                ? new Date(delivery?.actualDate).toLocaleDateString()
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
          <UiLegend title="ID" :description="delivery?.product?._id" />
          <UiLegend title="Nome" :description="delivery?.productName" />

          <UiLegend
            title="Categoria"
            :description="delivery?.product?.categoryName"
          />
          <UiLegend
            title="Fornecedor"
            :description="delivery?.product?.supplierName"
          />

          <UiLegend
            title="Refrigerado"
            :description="delivery?.product?.refrigerated ? 'sim' : 'não'"
          />
          <UiLegend
            title="Preço"
            :description="delivery?.price ? delivery?.price : '0'"
          />
          <UiLegend title="Quantidade" :description="delivery?.quantity" />

          <UiLegend title="Total" :description="delivery?.total" />
        </div>
      </div>
      <div class="col-span-4 rounded-md bg-white">
        <div class="p-4 border-b border-zinc-200">
          <UiH3 size="sm">Informações do cliente</UiH3>
        </div>

        <div class="p-4 space-y-6">
          <UiLegend title="Nome" :description="delivery?.customerName" />

          <UiLegend title="Email" :description="delivery?.customerEmail" />

          <UiLegend title="Telefone" :description="delivery?.customerPhone" />

          <UiLegend title="Endereço" :description="delivery?.address" />
        </div>
      </div>
    </div>
  </div>
</template>
