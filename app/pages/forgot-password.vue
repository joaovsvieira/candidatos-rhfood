<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Login',
  description: 'Faça login na sua conta para continuar.'
})

const toast = useToast()

const fields = [{
  name: 'email',
  type: 'text' as const,
  label: 'E-mail',
  placeholder: 'Insira seu e-mail',
  required: true
}]

const schema = z.object({
  email: z.string().email('E-mail inválido')
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Link enviado', description: 'Verifique o seu e-mail.', color: 'success' })
  console.log('Submitted', payload)
}
</script>

<template>
  <UAuthForm
    :fields="fields"
    :schema="schema"
    title="Recuperar senha"
    description="Insira o seu e-mail para receber um link de redefinição de senha."
    :submit="{ label: 'Enviar link de redefinição' }"
    @submit="onSubmit"
  />
</template>
