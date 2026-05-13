<template>
  <li class="flex gap-4 items-center w-full">
    <UButton icon="lucide:cup-soda" variant="outline" />
    <div class="flex flex-col text-ui-text font-medium">
      <slot></slot>
      <span>1.5L</span>
    </div>
    <UBadge class="ml-auto" label="4 UN" variant="outline" />
  </li>
</template>
