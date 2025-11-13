<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { data: page } = await useAsyncData('contact', () => queryCollection('contact').first())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description
})

defineOgImageComponent('RH Food')

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

function onSubmit(payload: FormSubmitEvent<Schema>) {
    toast.add({ title: 'Mensagem enviada', description: 'Obrigado por entrar em contato!', color: 'success' })
    console.log('Submitted', payload)
}
</script>

<template>
    <UContainer>
        <UPageHeader v-bind="page" class="py-[50px]" />

        <UPageBody>
            <UForm :schema="schema" :state="state" class="space-y-4 max-w-md" @submit="onSubmit">
                <UFormField label="Nome" name="name">
                    <UInput v-model="state.name" class="w-full" aria-required="true" />
                </UFormField>

                <UFormField label="E-mail" name="email">
                    <UInput v-model="state.email" class="w-full" aria-required="true" />
                </UFormField>

                <UFormField label="Mensagem" name="message">
                    <UTextarea v-model="state.message" class="w-full" aria-required="true" />
                </UFormField>

                <UButton type="submit">
                    Enviar mensagem
                </UButton>
            </UForm>
        </UPageBody>
    </UContainer>
</template>
