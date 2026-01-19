<script setup lang="ts">
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl

const toast = useToast()

const { data: highlights } = await useLazyFetch(`${apiBaseUrl}/api/highlights`)

const cards = computed(() => {
  const vacancies = highlights.value || []

  return vacancies.map((vacancy: Vacancy) => {
    const address_street = vacancy.address_street ? `${vacancy.address_street},` : ''

    return {
      id: vacancy.id,
      title: truncate(vacancy.title, 32),
      description: `${address_street} ${vacancy.address_city} - ${vacancy.address_state}`,
      badge: vacancy.role_name,
      level_of_experience: vacancy.level_of_experience,
      pwd: vacancy.pwd
    }
  })
})

async function share(title: string, href: string) {
  if (!navigator.share) {
    await copyToClipboard(href)
    return
  }

  navigator.share({
    url: href,
    text: 'Vaga de ' + title + ' na RHFood',
    title: title
  })
}

async function copyToClipboard(href: string) {
  if (!navigator.clipboard) {
    toast.add({
      title: 'Houve um erro',
      description: 'Não foi possível copiar o link!',
      color: 'error'
    })
    return
  }

  try {
    await navigator.clipboard.writeText(href)
    toast.add({
      title: 'Link copiado',
      description: 'Use o link para compartilhar esta vaga!',
      color: 'success'
    })
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <UPageSection
    v-if="cards.length"
    title="Vagas em Destaque"
    description="Não perca tempo! Estas são as vagas mais quentes para garçons, cozinheiros, baristas e entregadores. Candidate-se antes que fechem."
    :ui="{
      container: 'py-10 pt-20 sm:py-10 sm:pt-20 lg:pb-0 lg:pt-20'
    }"
  >
    <UPageGrid>
      <UPageCard
        v-for="(card, index) in cards"
        :key="index"
        v-bind="card"
        :to="`/vacancies/${card.id}`"
        spotlight
        :ui="{
          header: 'flex justify-between w-full'
        }"
      >
        <template #header>
          <div class="flex space-x-1">
            <UBadge variant="subtle">
              {{ card.badge }}
            </UBadge>

            <UBadge v-if="card.level_of_experience === '60+' || card.level_of_experience === 'Primeiro emprego' || card.level_of_experience === 'Aprendiz' || card.level_of_experience === 'Estágio'" variant="subtle">
              {{ card.level_of_experience }}
            </UBadge>

            <UBadge v-if="card.pwd" variant="subtle" color="info">
              PCD
            </UBadge>
          </div>

          <div class="z-50">
            <UButton
              size="xs"
              color="success"
              variant="subtle"
              trailing-icon="i-lucide-share-2"
              class="cursor-pointer"
              @click="share(card.title, `/vacancies/${card.id}`)"
            />
          </div>
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
