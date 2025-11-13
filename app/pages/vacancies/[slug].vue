<script setup lang="ts">
const route = useRoute()

const { data: vacancy } = await useAsyncData(route.path, () => queryCollection('vacancies').path(route.path).first())

if (!vacancy.value) {
  throw createError({ statusCode: 404, statusMessage: 'Vaga não encontrada', fatal: true })
}

const surround = ref([
  {
    title: 'Cozinheiro(a) de Chapa (Hamburgueria)',
    path: '/vacancies/cozinheiro-de-chapa-hamburgueria',
    stem: 'vacancies/cozinheiro-de-chapa-hamburgueria',
    description: 'Av. Olegário Maciel, 120 - Barra da Tijuca, Rio de Janeiro - RJ'
  },
  {
    title: 'Cozinheiro(a) de Chapa (Hamburgueria)',
    path: '/vacancies/cozinheiro-de-chapa-hamburgueria',
    stem: 'vacancies/cozinheiro-de-chapa-hamburgueria',
    description: 'Av. Olegário Maciel, 120 - Barra da Tijuca, Rio de Janeiro - RJ'
  }
])

const title = vacancy.value.seo?.title || vacancy.value.title
const description = vacancy.value.seo?.description || vacancy.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const toast = useToast()

function share() {
    toast.add({ title: 'Link copiado', description: 'Use o link para compartilhar esta vaga!', color: 'success' })
}
</script>

<template>
    <UContainer v-if="vacancy">
        <UPageHeader
        :title="vacancy.title"
         :description="vacancy.description"
        >
            <template #headline>
                <UBadge
                    v-bind="vacancy.badge"
                    variant="subtle"
                />
                <span class="text-muted">&middot;</span>
                <time class="text-muted">{{ new Date(vacancy.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
        </template>

        <div class="flex flex-wrap items-center gap-3 mt-4">
            <UButton
                color="neutral"
                variant="subtle"
                target="_blank"
                size="sm"
            >
            <UAvatar
                v-bind="vacancy.company.avatar"
                alt="Author avatar"
                size="2xs"
            />

                {{ vacancy.company.name }}
            </UButton>
        </div>
        </UPageHeader>

        <UPage>
            <UPageBody>
                <div class="grid grid-cols-2 lg:grid-cols-3">
                    <UPageCard
                        title="Modalidade"
                        description="Presencial"
                        variant="subtle"
                        class="rounded-none"
                    />
                    <UPageCard
                        title="Salário"
                        description="R$ 1.200,00 + R$ 500,00 (comissão)"
                        variant="subtle"
                        class="rounded-none"
                    />
                    <UPageCard
                        title="Por"
                        description="Mês"
                        variant="subtle"
                        class="rounded-none"
                    />
                    <UPageCard
                        title="Tipo de contratação"
                        description="CLT"
                        variant="subtle"
                        class="rounded-none"
                    />
                    <UPageCard
                        title="Nível de experiência"
                        description="Primeiro emprego"
                        variant="subtle"
                        class="rounded-none"
                    />
                    <UPageCard
                        title="Formação mínima"
                        description="Ensino médio"
                        variant="subtle"
                        class="rounded-none"
                    />
                </div>

                <ContentRenderer v-if="vacancy" :value="vacancy" />

                <UButton label="Candidatar-se" trailing-icon="i-lucide-arrow-right" to="/vacancies/cozinheiro-de-chapa-hamburgueria/apply" />

                <USeparator v-if="surround?.length" />

                <UContentSurround :surround="surround" />
            </UPageBody>

            <template #right>
                <div class="sticky top-(--ui-header-height) z-10 bg-default/75 lg:bg-[initial] backdrop-blur -mx-4 px-4 sm:px-6 sm:-mx-6 overflow-y-auto max-h-[calc(100vh-var(--ui-header-height))]">
                    <div class="pt-4 sm:pt-6 pb-2.5 sm:pb-4.5 lg:py-8 border-b border-dashed border-default lg:border-0 flex flex-col">
                        <UButton label="Candidatar-se" trailing-icon="i-lucide-arrow-right" to="/vacancies/cozinheiro-de-chapa-hamburgueria/apply" />
                        <UButton label="Compartilhar" color="success" variant="subtle" trailing-icon="i-lucide-copy" @click="share" class="mt-2" />
                    </div>
                </div>
            </template>
        </UPage>

    </UContainer>
</template>
