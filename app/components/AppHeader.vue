<script setup lang="ts">
const items = computed(() => [{
  label: 'Sobre',
  to: '/about'
}, {
  label: 'Vagas',
  to: '/search'
}, {
  label: 'Para Empresas',
  to: '/pricing'
}, {
  label: 'Passo a Passo',
  to: '/step-by-step'
}, {
  label: 'Contato',
  to: '/contact'
}])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="w-auto h-10 shrink-0" />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton />

      <UButton
        label="Minha conta"
        color="neutral"
        variant="outline"
        to="/my-account"
        class="hidden lg:inline-flex"
      />

      <UButton
        label="Vagas"
        trailing-icon="i-lucide-arrow-right"
        class="hidden lg:inline-flex"
        to="/search"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />

      <UButton
        label="Minha conta"
        color="neutral"
        variant="subtle"
        to="/my-account"
        block
        class="mb-3"
      />
      <UButton
        label="Vagas"
        to="/search"
        block
      />
    </template>
  </UHeader>
</template>
