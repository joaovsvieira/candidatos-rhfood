<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { FetchError } from 'ofetch'

definePageMeta({
  layout: 'auth',
  middleware: ['sanctum:guest']
})

useSeoMeta({
  title: 'RHFood - Entrar',
  description: 'Encontre sua próxima oportunidade de emprego'
})

const { login } = useSanctumAuth()

const toast = useToast()

const fields = [{
  name: 'email',
  type: 'text' as const,
  label: 'E-mail',
  placeholder: 'Insira seu e-mail',
  required: true
}, {
  name: 'password',
  label: 'Senha',
  type: 'password' as const,
  placeholder: 'Insira sua senha',
  required: true
}, {
  name: 'remember',
  label: 'Lembrar de mim',
  type: 'checkbox' as const
}]

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Deve ter pelo menos 8 caracteres'),
  remember: z.boolean().optional()
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const credentials = {
    email: payload.data.email,
    password: payload.data.password,
    remember: payload.data.remember
  }

  try {
    await login(credentials)
  } catch (error) {
    if (error instanceof FetchError && error.response?.status === 422) toast.add({ title: 'Ocorreu um erro', description: 'E-mail ou senha inválidos.', color: 'error' })
    else toast.add({ title: 'Ocorreu um erro', description: 'Tente novamente, mais tarde.', color: 'error' })
  }
}
</script>

<template>
  <UAuthForm
    :fields="fields"
    :schema="schema"
    title="Bem-vindo de volta"
    :submit="{ label: 'Entrar' }"
    icon="i-lucide-lock"
    @submit="onSubmit"
  >
    <template #description>
      Não tem uma conta? <ULink
        to="/signup"
        class="text-primary font-medium"
      >Cadastre-se</ULink>.
    </template>

    <template #password-hint>
      <ULink
        to="forgot-password"
        class="text-primary font-medium"
        tabindex="-1"
      >Esqueceu sua senha?</ULink>
    </template>

    <template #footer>
      Ao iniciar sessão, você concorda com os nossos <ULink
        to="/"
        class="text-primary font-medium"
      >Termos de Serviço</ULink>.
    </template>
  </UAuthForm>
</template>
