<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  }
})

useSeoMeta({
  title: 'Página não encontrada',
  description: 'Pedimos desculpas, mas esta página não foi encontrada.'
})

const links = [{
  label: 'Sobre',
  icon: 'i-lucide-building-2',
  to: '/about'
}, {
  label: 'Contato',
  icon: 'i-lucide-contact',
  to: '/contact'
}]
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        shortcut="meta_k"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>

    <UToaster />
  </div>
</template>
