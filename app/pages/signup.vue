<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const config = useRuntimeConfig()
const API_BASE = config.public.apiBaseUrl

definePageMeta({
  layout: 'auth',
  middleware: ['sanctum:guest']
})

useSeoMeta({
  title: 'RHFood - Crie sua conta',
  description: 'Encontre sua próxima oportunidade de emprego'
})

const { login } = useSanctumAuth()

const toast = useToast()

const fields = [{
  name: 'name',
  type: 'text' as const,
  label: 'Nome',
  placeholder: 'Insira o seu nome',
  required: true
}, {
  name: 'email',
  type: 'text' as const,
  label: 'E-mail',
  placeholder: 'Insira o seu e-mail',
  required: true
}, {
  name: 'password',
  label: 'Senha',
  type: 'password' as const,
  placeholder: 'Insira sua senha',
  required: true
}, {
  name: 'password_confirmation',
  label: 'Repita sua senha',
  type: 'password' as const,
  placeholder: 'Repita sua senha',
  required: true
}]

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Deve ter pelo menos 8 caracteres'),
  password_confirmation: z.string().min(8, 'Deve ter pelo menos 8 caracteres')
}).refine(data => data.password === data.password_confirmation, {
  message: 'O campo senha de confirmação não confere.',
  path: ['password_confirmation']
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const credentials = {
    name: payload.data.name,
    email: payload.data.email,
    password: payload.data.password,
    password_confirmation: payload.data.password_confirmation
  }

  try {
    const token = await getCsrfToken()

    if (!token) {
      toast.add({ title: 'Ocorreu um erro', description: 'Tente novamente, mais tarde.', color: 'error' })
      throw new Error('CSRF Token não foi obtido.')
    }

    await $fetch(`${API_BASE}/api/register`, {
      method: 'POST',
      body: credentials,
      headers: {
        'X-XSRF-TOKEN': token
      },
      credentials: 'include'
    })

    await login(credentials)
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
    title="Criar uma conta"
    :submit="{ label: 'Criar conta' }"
    @submit="onSubmit"
  >
    <template #description>
      Já tem uma conta? <ULink
        to="/login"
        class="text-primary font-medium"
      >Login</ULink>.
    </template>

    <template #footer>
      Ao criar uma conta, você concorda com os nossos <ULink
        to="/"
        class="text-primary font-medium"
      >Termos de Serviço</ULink>.
    </template>
  </UAuthForm>
</template>
