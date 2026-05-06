<script setup lang="ts">
const items: NavigationMenuItem[] = [
  {
    label: "Home",
    icon: "i-lucide-house",
    active: true,
  },
  {
    label: "Inbox",
    icon: "i-lucide-inbox",
    badge: "4",
  },
  {
    label: "Contacts",
    icon: "i-lucide-users",
  },
];
</script>

<template>
  <div class="flex">
    <USidebar title="Refriango dashboard"></USidebar>
    <div class="h-screen bg-white w-full text-black">
      <div class="h-16 bg-slate-900 flex items-center px-6">
        <UIcon
          name="cuida:sidebar-collapse-outline"
          class="size-6 text-slate-200"
        ></UIcon>
      </div>
      <div class="px-6 py-5">
        <slot />
      </div>
    </div>
  </div>
</template>
