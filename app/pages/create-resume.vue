<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'
import StepCard from '@/components/modules/my-resumes/partials/StepCard.vue'
import PersonalForm from '@/components/modules/my-resumes/sections/Steps/PersonalForm.vue'
import ExperienceForm from '@/components/modules/my-resumes/sections/Steps/ExperienceForm.vue'
import EducationForm from '@/components/modules/my-resumes/sections/Steps/EducationForm.vue'
import SkillsForm from '@/components/modules/my-resumes/sections/Steps/SkillsForm.vue'
import Preview from '@/components/modules/my-resumes/sections/Steps/Preview.vue'

const user = useSanctumUser<User>()

definePageMeta({
  middleware: ['sanctum:auth']
})

const items = [
  {
    slot: '1' as const,
    title: 'Dados Pessoais',
    icon: 'i-lucide-user'
  }, {
    slot: '2' as const,
    title: 'Experiência',
    icon: 'i-lucide-briefcase'
  }, {
    slot: '3' as const,
    title: 'Educação',
    icon: 'i-lucide-graduation-cap'
  }, {
    slot: '4' as const,
    title: 'Habilidades',
    icon: 'i-lucide-star'
  }, {
    slot: '5' as const,
    title: 'Visualizar',
    icon: 'i-lucide-file-text'
  }
] satisfies StepperItem[]

// @ts-expect-error undefined template ref
const stepper = useTemplateRef('stepper')
</script>

<template>
  <UContainer>
    <UPageHeader
      :title="`Olá, ${user?.name}`"
      description="Crie seu curriculo"
    />

    <div class="w-full mt-10">
      <UStepper
        ref="stepper"
        :items="items"
      >
        <template #1>
          <StepCard>
            <PersonalForm />
          </StepCard>
        </template>

        <template #2>
          <StepCard>
            <ExperienceForm />
          </StepCard>
        </template>

        <template #3>
          <StepCard>
            <EducationForm />
          </StepCard>
        </template>

        <template #4>
          <StepCard>
            <SkillsForm />
          </StepCard>
        </template>

        <template #5>
          <Preview />
        </template>
      </UStepper>

      <div class="flex gap-2 justify-between mt-10">
        <UButton
          leading-icon="i-lucide-arrow-left"
          :disabled="!stepper?.hasPrev"
          @click="stepper?.prev()"
        >
          Anterior
        </UButton>

        <UButton
          trailing-icon="i-lucide-arrow-right"
          :disabled="!stepper?.hasNext"
          @click="stepper?.next()"
        >
          Próximo
        </UButton>
      </div>
    </div>
  </UContainer>
</template>
