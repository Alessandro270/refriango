<script setup lang="ts">
definePageMeta({ layout: 'admin' })
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
              icon="lucide:clock"
              color="warning"
              class="rounded-full"
              variant="solid"
            >
              Pendente
            </UBadge>
          </UiH3>

          <div class="flex items-center gap-2">
            <UButton
              icon="lucide:box"
              class="rounded-sm uppercase font-bold text-zinc-900 py-0.5 text-[10.5px]"
              variant="solid"
              size="xs"
              color="warning"
            >
              Completo
            </UButton>
            <UButton
              icon="lucide:check"
              class="rounded-sm uppercase font-bold text-zinc-900 py-0.5 text-[10.5px]"
              variant="solid"
              size="xs"
              color="success"
            >
              Aprovar
            </UButton>

            <UButton
              icon="lucide:x"
              class="rounded-sm uppercase font-bold text-zinc-900 py-0.5 text-[10.5px]"
              variant="solid"
              size="xs"
              color="error"
            >
              Cancelar
            </UButton>
          </div>
        </div>

        <div class="p-4 grid grid-cols-4 gap-4">
          <UiLegend title="ID" description="DEL-001" />
          <UiLegend title="Data estimada" description="20/06/2026" />
          <UiLegend title="Data de entrega" description="21/06/2026" />
          <UiLegend title="Data do pedido" description="18/06/2026" />
        </div>
      </div>

      <div class="col-span-8 rounded-md h-max bg-white">
        <div class="p-4 border-b border-zinc-200">
          <UiH3 size="sm">Informações do produto</UiH3>
        </div>

        <div class="p-4 grid grid-cols-3 gap-8">
          <UiLegend title="ID" description="PRD-001" />
          <UiLegend title="Nome" description="Coca-Cola 1L" />

          <UiLegend title="Quantidade" description="120" />
          <UiLegend title="Preço de compra" description="500 AOA" />
          <UiLegend title="Preço de venda" description="750 AOA" />

          <UiLegend title="Categoria" description="Refrigerantes" />
          <UiLegend title="Fornecedor" description="Refriango" />

          <UiLegend title="Refrigerado" description="Sim" />

          <UiLegend title="Total" description="90.000 AOA" />
        </div>
      </div>
      <div class="col-span-4 rounded-md bg-white">
        <div class="p-4 border-b border-zinc-200">
          <UiH3 size="sm">Informações do cliente</UiH3>
        </div>

        <div class="p-4 space-y-6">
          <UiLegend title="Nome" description="João Manuel" />

          <UiLegend title="Email" description="joao@email.com" />

          <UiLegend title="Telefone" description="+244 923 000 000" />

          <UiLegend title="Endereço" description="Luanda, Maianga" />
        </div>
      </div>
    </div>
  </div>
</template>
