<script setup lang="ts">
import Hero from '@/components/modules/home/sections/Hero.vue'
import Highlights from '@/components/modules/home/sections/Highlights.vue'

const { data: page } = await useAsyncData('index', () => queryCollection('index').first())

useSeoMeta({
  title: 'RHFood - Encontre sua próxima oportunidade de emprego',
  description: 'Encontre sua próxima oportunidade de emprego'
})
</script>

<template>
  <div v-if="page">
    <Hero />

    <PartnersLogo />

    <Highlights />

    <UPageSection
      id="testimonials"
      title="Histórias de Sucesso"
      description="De estagiários a gerentes, de startups a multinacionais. Estamos orgulhosos de fazer parte da jornada de milhares de pessoas."
      :ui="{
        container: 'py-10 sm:py-10 lg:py-10'
      }"
    >
      <UPageColumns class="xl:columns-4">
        <UPageCard
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          variant="subtle"
          :description="testimonial.quote"
          :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
        >
          <template #footer>
            <UUser
              v-bind="testimonial.user"
              size="lg"
            />
          </template>
        </UPageCard>
      </UPageColumns>
    </UPageSection>

    <Faq />

    <USeparator />

    <UPageCTA
      v-bind="page.cta"
      variant="naked"
      class="overflow-hidden"
    >
      <LazyStarsBg />

      <template #description>
        <div class="max-w-xl mx-auto">
          {{ page.cta.description }}
        </div>
      </template>
    </UPageCTA>
  </div>
</template>
