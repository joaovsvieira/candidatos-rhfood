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
      badge: vacancy.role_name
    }
  })
})
</script>

<template>
  <UPageSection
    v-if="cards.length"
    title="Vagas em Destaque"
    description="Não perca tempo! Estas são as vagas mais quentes para garçons, cozinheiros, baristas e entregadores. Candidate-se antes que fechem."
    :ui="{
      container: 'py-10 sm:py-10 lg:pb-0 lg:pt-20'
    }"
  >
    <UPageGrid>
      <UPageCard
        v-for="(card, index) in cards"
        :key="index"
        v-bind="card"
        :to="`/vacancies/${card.id}`"
        spotlight
      >
        <template #header>
          <UBadge variant="subtle">
            {{ card.badge }}
          </UBadge>
        </template>
      </UPageCard>
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
