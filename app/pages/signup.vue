<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Cadastro',
  description: 'Crie uma conta para começar'
})

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
}]

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Deve ter pelo menos 8 caracteres')
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
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
