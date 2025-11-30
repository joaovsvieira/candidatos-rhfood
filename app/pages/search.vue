<script setup lang="ts">
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl

const { data: vacancies } = await useLazyFetch(`${apiBaseUrl}/api/vacancies`)

const cards = computed(() => {
  const items = vacancies.value || []

  return items.map((vacancy: Vacancy) => {
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
  <div>
    {{ cards }}
  </div>
</template>
