<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const route = useRoute()

const { data: vacancy } = await useAsyncData('/vacancies/' + route.params.slug, () => queryCollection('vacancies').path('/vacancies/' + route.params.slug).first())

if (!vacancy.value) {
  throw createError({ statusCode: 404, statusMessage: 'Vaga não encontrada', fatal: true })
}

const title = vacancy.value.seo?.title || vacancy.value.title
const description = vacancy.value.seo?.description || vacancy.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('RH Food')

const toast = useToast()

const schema = z.object({
    name: z.string().min(1, 'Nome é obrigatório')
})

const state = reactive({
    name: ''
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
    toast.add({ title: 'Candidatura enviada', description: 'Agora é só aguardar. Boa sorte!', color: 'success' })
    console.log('Submitted', payload)
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
                <UForm :schema="schema" :state="state" class="space-y-4 max-w-md" @submit="onSubmit">
                    <UFormField label="Nome" name="name">
                        <UInput v-model="state.name" class="w-full" aria-required="true" />
                    </UFormField>

                    <UButton type="submit">
                        Candidatar-se
                    </UButton>
            </UForm>
            </UPageBody>
        </UPage>

    </UContainer>
</template>
