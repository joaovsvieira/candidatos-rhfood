<script setup lang="ts">
const route = useRoute()
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl

const { data: vacancies } = await useLazyFetch(`${apiBaseUrl}/api/vacancies`, {
  query: computed(() => ({
    title: route.query.query,
    address_state: route.query.state,
    address_city: route.query.city
  })),

  watch: [() => route.query]
})

const cards = computed(() => {
  const items = vacancies.value as Vacancy[] || []

  return items.map((vacancy: Vacancy) => {
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
  <UContainer>
    <UPageHeader
      title="Vagas Encontradas"
      description="Use nosso filtro para personalizar sua busca!"
      class="py-12.5"
    />

    <UPageBody>
      <UPageGrid v-if="cards.length">
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

      <div
        v-else
        class="flex-1 text-center py-20"
      >
        <p class="text-lg font-medium text-gray-600">
          Nenhuma vaga encontrada. Tente ajustar seus filtros de busca.
        </p>
      </div>
    </UPageBody>
  </UContainer>
</template>
