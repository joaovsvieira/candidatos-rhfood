<script setup lang="ts">
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl

const { data: highlights } = await useLazyFetch(`${apiBaseUrl}/api/highlights`)

const cards = computed(() => {
  const vacancies = highlights.value || []

  return vacancies.map((vacancy: Vacancy) => {
    const address_street = vacancy.address_street ? `${vacancy.address_street},` : ''

    return {
      id: vacancy.id,
      title: truncate(vacancy.title, 32),
      description: `${address_street} ${vacancy.address_city} - ${vacancy.address_state}`,
      icon: 'i-lucide-flame'
    }
  })
})
</script>

<template>
  <UPageSection
    title="Vagas em Destaque"
    description="Não perca tempo! Estas são as vagas mais quentes para garçons, cozinheiros, baristas e entregadores. Candidate-se antes que fechem."
  >
    <UPageGrid v-if="cards.length">
      <UPageCard
        v-for="(card, index) in cards"
        :key="index"
        v-bind="card"
        :to="`/vacancies/${card.id}`"
        spotlight
      />
    </UPageGrid>

    <div class="text-center">
      <UButton
        size="xl"
        label="Todas as vagas"
        trailing-icon="i-lucide-arrow-right"
      />
    </div>
  </UPageSection>
</template>
