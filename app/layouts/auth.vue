<template>
  <div class="h-screen flex items-center justify-center px-4">
    <UButton
      icon="i-lucide-chevron-left"
      to="/"
      size="xl"
      color="neutral"
      variant="subtle"
      class="absolute left-8 top-8 rounded-full z-10"
    />

    <div class="flex flex-col items-center">
      <AppLogo class="w-auto h-10 shrink-0" />

      <UPageCard
        variant="subtle"
        class="max-w-sm w-full mt-5"
      >
        <slot />
      </UPageCard>
    </div>
  </div>
</template>
