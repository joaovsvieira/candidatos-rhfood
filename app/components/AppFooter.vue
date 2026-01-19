<script setup lang="ts">
const columns = [{
  label: 'Empresa',
  children: [{
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
  }]
}]
</script>

<template>
  <USeparator />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns" />
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        RHFood • © {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <UButton
        to="https://instagram.com/rhfoodbr"
        target="_blank"
        icon="i-simple-icons-instagram"
        aria-label="RHFood no Instagram"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
