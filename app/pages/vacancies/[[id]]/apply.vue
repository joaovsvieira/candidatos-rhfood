<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

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

const title = vacancy.value.title
const address_street = vacancy.value.address_street ? `${vacancy.value.address_street},` : ''
const description = `${address_street} ${vacancy.value.address_city} - ${vacancy.value.address_state}`
const avatar_url = vacancy.value.company_logo ? `${apiBaseUrl}/storage/${vacancy.value.company_logo}` : ''

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

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
