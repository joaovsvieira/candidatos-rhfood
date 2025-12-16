<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => queryCollection('about').first())

useSeoMeta({
  title: 'RHFood - Sobre nós',
  description: 'Encontre sua próxima oportunidade de emprego'
})
</script>

<template>
  <UContainer v-if="page">
    <UPageHeader
      title="Sobre Nós | Simples, Rápido e Eficaz"
      description="Nascemos para conectar cafés, hóteis, bares e restaurantes aos melhores profissionais do setor."
      class="py-[50px]"
    />

    <UPageBody>
      <PromotionalVideo />

      <UPageSection
        v-for="(section, index) in page.sections"
        :key="index"
        :title="section.title"
        :description="section.description"
        :orientation="section.orientation"
        :reverse="section.reverse"
        :features="section.features"
        class="mb-0"
        :ui="{
          container: 'py-10 sm:py-10 lg:pb-0 lg:pt-10'
        }"
      >
        <UPageCard
          variant="subtle"
          class="rounded-2xl"
        >
          <img
            :src="section.image"
            alt="Illustration"
            class="rounded-xl w-full h-92 object-cover"
          >
        </UPageCard>
      </UPageSection>
    </UPageBody>
  </UContainer>
</template>
