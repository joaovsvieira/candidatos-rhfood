<script setup lang="ts">
import markdownit from 'markdown-it'

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
        description: `${item_street} ${item.address_city} - ${item.address_state}`
      }
    })
  }
})

const title = vacancy.value.title
const address_street = vacancy.value.address_street ? `${vacancy.value.address_street},` : ''
const description = `${address_street} ${vacancy.value.address_city} - ${vacancy.value.address_state}`
const avatar_url = vacancy.value.company_logo ? `${apiBaseUrl}/storage/${vacancy.value.company_logo}` : ''
const remuneration_salary = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(vacancy.value.remuneration_salary / 100)
const remuneration_comission = vacancy.value.remuneration_comission ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(vacancy.value.remuneration_comission / 100) : ''
const salary = remuneration_salary + (remuneration_comission ? ` + ${remuneration_comission} de gorjeta` : '')

const md = markdownit({
  html: true,
  linkify: true,
  breaks: true
})

let markdownContent = `**Descrição da Vaga**\n${vacancy.value.description || 'Não informado'}\n\n`

if (vacancy.value.requirements) {
  markdownContent += `**Requisitos**\n${vacancy.value.requirements}\n\n`
}

if (vacancy.value.benefits) {
  markdownContent += `**Benefícios**\n${vacancy.value.benefits}\n\n`
}

const renderedBody = md.render(markdownContent)

async function share() {
  if (!navigator.clipboard) {
    toast.add({
      title: 'Houve um erro',
      description: 'Não foi possível copiar o link!',
      color: 'error'
    })
    return
  }

  try {
    await navigator.clipboard.writeText(window.location)
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
  <UContainer>
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

      <div class="flex flex-wrap items-center gap-3 mt-4">
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

        <div
          class="prose prose-primary dark:prose-invert max-w-none"
          v-html="renderedBody"
        />

        <ContentRendererMarkdown :value="markdownContent" />

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
              class="mt-2"
              @click="share"
            />
          </div>
        </div>
      </template>
    </UPage>
  </UContainer>
</template>
