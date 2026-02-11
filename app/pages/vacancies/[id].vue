<script setup lang="ts">
const route = useRoute()
const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl

const toast = useToast()

const { data: vacancy, error } = await useFetch<Vacancy>(`${apiBaseUrl}/api/vacancies/${route.params.id}`)

if (error.value || !vacancy.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Vaga não encontrada ou removida.',
    fatal: true
  })
}

const { data: surround } = await useFetch<Vacancy[]>(`${apiBaseUrl}/api/vacancies/${route.params.id}/similar`, {
  default: () => [],
  transform: (response: Vacancy[]) => {
    const items = response || []

    return items.map((item: Vacancy) => {
      const item_street = item.address_street ? `${item.address_street},` : ''

      return {
        title: item.title,
        path: `/vacancies/${item.id}`,
        stem: `vacancies/${item.id}`,
        description: item.show_address ? `${item_street}, ${item.address_city} - ${item.address_state}` : `${item.address_district}, ${item.address_city} - ${item.address_state}`
      }
    })
  }
})

const title = vacancy.value.title
const address_street = vacancy.value.address_street ? `${vacancy.value.address_street},` : ''
const description = vacancy.value.show_address ? `${address_street} ${vacancy.value.address_city} - ${vacancy.value.address_state}` : `${vacancy.value.address_district}, ${vacancy.value.address_city} - ${vacancy.value.address_state}`
const avatar_url = vacancy.value.company_logo ? `${apiBaseUrl}/storage/${vacancy.value.company_logo}` : ''
const remuneration_salary = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(vacancy.value.remuneration_salary) / 100)
const remuneration_comission = vacancy.value.remuneration_comission ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(vacancy.value.remuneration_comission) / 100) : ''
const salary = remuneration_salary + (remuneration_comission ? ` + ${remuneration_comission} de gorjeta` : '')

async function share() {
  if (!navigator.share) {
    await copyToClipboard()
    return
  }

  navigator.share({
    url: window.location.href,
    text: vacancy.value ? 'Vaga de ' + vacancy.value.title + ' na RHFood' : 'Vaga de emprego na RHFood',
    title: vacancy.value ? vacancy.value.title : 'Vaga de emprego'
  })
}

async function copyToClipboard() {
  if (!navigator.clipboard) {
    toast.add({
      title: 'Houve um erro',
      description: 'Não foi possível copiar o link!',
      color: 'error'
    })
    return
  }

  try {
    await navigator.clipboard.writeText(window.location.href)
    toast.add({
      title: 'Link copiado',
      description: 'Use o link para compartilhar esta vaga!',
      color: 'success'
    })
  } catch (err) {
    console.log(err)
  }
}

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <UContainer v-if="vacancy">
    <UPageHeader
      :title="title"
      :description="description"
    >
      <template #headline>
        <UBadge
          :label="vacancy.role_name"
          variant="subtle"
        />
        <span class="text-muted">&middot;</span>
        <time class="text-muted">{{ new Date(vacancy.created_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
      </template>

      <div
        v-if="vacancy.show_company"
        class="flex flex-wrap items-center gap-3 mt-4"
      >
        <UButton
          color="neutral"
          variant="subtle"
          target="_blank"
          size="sm"
        >
          <UAvatar
            :src="avatar_url"
            alt="Company avatar"
            size="2xs"
          />
          {{ vacancy.company_name }}
        </UButton>
      </div>
    </UPageHeader>

    <UPage>
      <UPageBody>
        <div class="grid grid-cols-2 lg:grid-cols-3">
          <UPageCard
            title="Modalidade"
            :description="vacancy.modality"
            variant="subtle"
            class="rounded-none"
          />
          <UPageCard
            title="Salário"
            :description="salary"
            variant="subtle"
            class="rounded-none"
          />
          <UPageCard
            title="Por"
            :description="vacancy.remuneration_frequency"
            variant="subtle"
            class="rounded-none"
          />
          <UPageCard
            title="Tipo de contratação"
            :description="vacancy.remuneration_type"
            variant="subtle"
            class="rounded-none"
          />
          <UPageCard
            title="Nível de experiência"
            :description="vacancy.level_of_experience"
            variant="subtle"
            class="rounded-none"
          />
          <UPageCard
            title="Formação mínima"
            :description="vacancy.minimum_training"
            variant="subtle"
            class="rounded-none"
          />
        </div>

        <div v-if="vacancy.description">
          <h2 class="text-lg text-pretty font-semibold text-highlighted">
            Descrição
          </h2>
          <p class="text-[15px] text-pretty">
            {{ vacancy.description }}
          </p>
        </div>

        <div v-if="vacancy.requirements">
          <h2 class="text-lg text-pretty font-semibold text-highlighted">
            Requisitos
          </h2>
          <p class="text-[15px] text-pretty">
            {{ vacancy.requirements }}
          </p>
        </div>

        <div v-if="vacancy.benefits">
          <h2 class="text-lg text-pretty font-semibold text-highlighted">
            Benefícios
          </h2>
          <p class="text-[15px] text-pretty">
            {{ vacancy.benefits }}
          </p>
        </div>

        <UButton
          size="lg"
          label="Candidatar-se"
          trailing-icon="i-lucide-arrow-right"
          :to="`/vacancies/${vacancy.id}/apply`"
        />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template #right>
        <div class="sticky top-(--ui-header-height) z-10 bg-default/75 lg:bg-[initial] backdrop-blur -mx-4 px-4 sm:px-6 sm:-mx-6 overflow-y-auto max-h-[calc(100vh-var(--ui-header-height))]">
          <div class="pt-4 sm:pt-6 pb-2.5 sm:pb-4.5 lg:py-8 border-b border-dashed border-default lg:border-0 flex flex-col">
            <UButton
              size="lg"
              label="Candidatar-se"
              trailing-icon="i-lucide-arrow-right"
              :to="`/vacancies/${vacancy.id}/apply`"
            />
            <UButton
              size="lg"
              label="Compartilhar"
              color="success"
              variant="subtle"
              trailing-icon="i-lucide-copy"
              class="mt-2 cursor-pointer"
              @click="share"
            />
            <UButton
              size="lg"
              label="Ver no mapa"
              color="info"
              variant="subtle"
              trailing-icon="i-lucide-map-pin"
              class="mt-2"
              :to="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vacancy.show_address ? `${address_street}, ${vacancy.address_city} - ${vacancy.address_state}` : `${vacancy.address_district}, ${vacancy.address_city} - ${vacancy.address_state}`)}`"
              target="_blank"
            />
          </div>
        </div>
      </template>
    </UPage>
  </UContainer>
</template>
