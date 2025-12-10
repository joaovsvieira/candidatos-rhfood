<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const route = useRoute()
const config = useRuntimeConfig()
const API_BASE = config.public.apiBaseUrl

definePageMeta({
  layout: 'auth',
  middleware: ['sanctum:guest']
})

useSeoMeta({
  title: 'RHFood - Redefinir senha',
  description: 'Encontre sua próxima oportunidade de emprego'
})

const toast = useToast()

const fields = [{
  name: 'email',
  type: 'text' as const,
  label: 'E-mail',
  placeholder: 'Insira seu e-mail',
  required: true,
  readonly: true,
  value: route.query.email
}, {
  name: 'password',
  type: 'password' as const,
  label: 'Senha',
  placeholder: 'Senha',
  required: true
}, {
  name: 'password_confirmation',
  type: 'password' as const,
  label: 'Repita sua senha',
  placeholder: 'Repita sua senha',
  required: true
}]

const schema = z.object({
  password: z.string().min(8, 'Deve ter pelo menos 8 caracteres'),
  password_confirmation: z.string().min(8, 'Deve ter pelo menos 8 caracteres')
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const data = {
    email: route.query.email,
    password: payload.data.password,
    password_confirmation: payload.data.password_confirmation,
    token: route.query.token
  }

  try {
    const token = await getCsrfToken()

    if (!token) {
      toast.add({ title: 'Ocorreu um erro', description: 'Tente novamente, mais tarde.', color: 'error' })
      throw new Error('CSRF Token não foi obtido.')
    }

    await $fetch(`${API_BASE}/api/reset-password`, {
      method: 'POST',
      body: data,
      headers: {
        'X-XSRF-TOKEN': token
      },
      credentials: 'include'
    })

    toast.add({ title: 'Sucesso', description: 'Sua senha foi redefinida!', color: 'success' })

    await navigateTo({
      path: '/login'
    })
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
  <UAuthForm
    :fields="fields"
    :schema="schema"
    title="Redefinir senha"
    description="Por favor, digite sua nova senha abaixo"
    :submit="{ label: 'Redefinir senha' }"
    @submit="onSubmit"
  />
</template>
