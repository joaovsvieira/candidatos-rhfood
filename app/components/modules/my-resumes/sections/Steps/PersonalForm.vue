<script setup lang="ts">
import { inject } from 'vue'
import { z } from 'zod'
import { vMaska } from 'maska/vue'

const resume = useResumeStore()

const stepper = inject<Ref>('stepperRef')

const schema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Digite um e-mail válido'),
  phone: z.string().min(15, 'Telefone inválido'),
  location: z.string().min(1, 'Localização é obrigatória'),
  linkedin: z.string().optional(),
  website: z.string().url('URL inválida').optional().or(z.literal('')),
  description: z.string().min(10, 'Escreva um resumo de pelo menos 10 caracteres')
})

async function onSubmit() {
  stepper?.value?.next()
}
</script>

<template>
  <div>
    <div class="text-center">
      <h2 class="relative text-2xl text-highlighted font-bold">
        Informações Pessoais
      </h2>
      <p class="leading-7 text-pretty text-muted">
        Preencha seus dados de contato e um resumo profissional
      </p>
    </div>

    <UForm
      :schema="schema"
      :state="resume"
      @submit="onSubmit"
    >
      <div class="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0 mt-14">
        <UFormField
          label="Nome Completo *"
          name="name"
          class="lg:w-1/2"
        >
          <UInput
            v-model="resume.name"
            class="w-full"
            aria-required="true"
            placeholder="João Silva"
          />
        </UFormField>

        <UFormField
          label="E-mail *"
          name="email"
          class="lg:w-1/2"
        >
          <UInput
            v-model="resume.email"
            type="email"
            class="w-full"
            aria-required="true"
            placeholder="joao@email.com"
          />
        </UFormField>
      </div>

      <div class="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0 mt-6">
        <UFormField
          label="Telefone *"
          name="phone"
          class="lg:w-1/2"
        >
          <UInput
            v-model="resume.phone"
            v-maska="'(##) #####-####'"
            class="w-full"
            aria-required="true"
            placeholder="(11) 99999-9999"
          />
        </UFormField>

        <UFormField
          label="Localização *"
          name="location"
          class="lg:w-1/2"
        >
          <UInput
            v-model="resume.location"
            class="w-full"
            aria-required="true"
            placeholder="São Paulo, SP"
          />
        </UFormField>
      </div>

      <div class="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0 mt-6">
        <UFormField
          label="LinkedIn"
          name="linkedin"
          class="lg:w-1/2"
        >
          <UInput
            v-model="resume.linkedin"
            class="w-full"
            placeholder="linkedin.com/in/joaosilva"
          />
        </UFormField>

        <UFormField
          label="Website / Portfólio"
          name="website"
          class="lg:w-1/2"
        >
          <UInput
            v-model="resume.website"
            class="w-full"
            placeholder="joaosilva.com"
          />
        </UFormField>
      </div>

      <div class="mt-6">
        <UFormField
          label="Resume Profissional *"
          name="description"
        >
          <UTextarea
            v-model="resume.description"
            class="w-full"
            aria-required="true"
            placeholder="Descreva brevemente sua experiência profissional, principais habilidades e objetivos de carreira..."
          />
        </UFormField>
      </div>

      <div class="flex gap-2 justify-between mt-10">
        <UButton
          type="button"
          leading-icon="i-lucide-arrow-left"
          :disabled="!stepper?.hasPrev"
          @click="stepper?.prev()"
        >
          Anterior
        </UButton>

        <UButton
          type="submit"
          trailing-icon="i-lucide-arrow-right"
          :disabled="!stepper?.hasNext"
        >
          Próximo
        </UButton>
      </div>
    </UForm>
  </div>
</template>
