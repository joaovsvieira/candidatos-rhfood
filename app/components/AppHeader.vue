<script setup lang="ts">
const items = computed(() => [{
  label: 'Para Empresas',
  to: '/pricing'
}, {
  label: 'Vagas',
  to: '/search'
}, {
  label: 'Passo a Passo',
  to: '/step-by-step'
}, {
  label: 'Monte seu Currículo',
  to: '/my-resumes'
}, {
  label: 'Sobre',
  to: '/about'
}, {
  label: 'Contato',
  to: '/contact'
}])

const user = useSanctumUser<User>()

const accountLabel = computed(() => {
  if (user.value?.name) {
    const firstName = user.value.name.split(' ')[0]
    return `Olá, ${firstName}`
  }
  return 'Candidato'
})
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
        :label="accountLabel"
        color="neutral"
        variant="outline"
        to="/my-account"
        class="hidden lg:inline-flex"
      />

      <UButton
        label="Empresa"
        trailing-icon="i-lucide-arrow-right"
        variant="ghost"
        class="hidden lg:inline-flex"
        to="https://app.rhfood.com.br"
        target="_blank"
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
        :label="accountLabel"
        color="neutral"
        variant="subtle"
        to="/my-account"
        block
        class="mb-3"
      />
      <UButton
        label="Empresa"
        trailing-icon="i-lucide-arrow-right"
        variant="ghost"
        to="https://app.rhfood.com.br"
        target="_blank"
        block
      />
    </template>
  </UHeader>
</template>
