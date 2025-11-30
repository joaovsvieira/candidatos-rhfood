<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const config = useRuntimeConfig()
const API_BASE = config.public.apiBaseUrl

useSeoMeta({
  title: 'RHFood - Entrar em contato',
  description: 'Encontre sua próxima oportunidade de emprego'
})

const toast = useToast()

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  message: z.string().min(1, 'Mensagem é obrigatório')
})

const state = reactive({
  name: '',
  email: '',
  message: ''
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const ticket = {
    name: payload.data.name,
    email: payload.data.email,
    message: payload.data.message
  }

  try {
    const token = await getCsrfToken()

    if (!token) {
      toast.add({ title: 'Ocorreu um erro', description: 'Tente novamente, mais tarde.', color: 'error' })
      throw new Error('CSRF Token não foi obtido.')
    }

    await $fetch(`${API_BASE}/api/ticket`, {
      method: 'POST',
      body: ticket,
      headers: {
        'X-XSRF-TOKEN': token
      },
      credentials: 'include'
    })

    toast.add({ title: 'Sucesso', description: 'Sua mensagem foi enviada com sucesso!', color: 'success' })
  } catch (e) {
    const error = useApiError(e)

    if (error.isValidationError) {
      Object.entries(error.bag).forEach((err) => {
        toast.add({ title: 'Ocorreu um erro', description: err[1][0], color: 'error' })
      })
    } else {
      toast.add({ title: 'Ocorreu um erro', description: 'Tente novamente, mais tarde.', color: 'error' })
    }
  }
}
</script>

<template>
  <UContainer>
    <UPageHeader
      title="Tem alguma dúvida?"
      description="Entre em contato com nossa equipe de suporte. Estamos prontos para te atender!"
      class="py-[50px]"
    />

    <UPageBody>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 max-w-md"
        @submit="onSubmit"
      >
        <UFormField
          label="Nome"
          name="name"
        >
          <UInput
            v-model="state.name"
            class="w-full"
            aria-required="true"
          />
        </UFormField>

        <UFormField
          label="E-mail"
          name="email"
        >
          <UInput
            v-model="state.email"
            class="w-full"
            aria-required="true"
          />
        </UFormField>

        <UFormField
          label="Mensagem"
          name="message"
        >
          <UTextarea
            v-model="state.message"
            class="w-full"
            aria-required="true"
          />
        </UFormField>

        <UButton type="submit">
          Enviar mensagem
        </UButton>
      </UForm>
    </UPageBody>
  </UContainer>
</template>
