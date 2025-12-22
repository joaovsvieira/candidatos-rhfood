<script setup lang="ts">
import { inject } from 'vue'
import ResumePreview from '@/components/modules/my-resumes/sections/ResumePreview.vue'

const config = useRuntimeConfig()
const API_BASE = config.public.apiBaseUrl

const toast = useToast()
const resume = useResumeStore()

const stepper = inject<Ref>('stepperRef')

async function onSubmit() {
  const payload = {
    name: resume.name,
    email: resume.email,
    phone: resume.phone,
    location: resume.location,
    linkedin: resume.linkedin,
    website: resume.website,
    description: resume.description,
    experiences: resume.experiences,
    educations: resume.educations,
    technical_skills: resume.technicalSkills,
    languages: resume.languages
  }

  try {
    const token = await getCsrfToken()

    if (!token) {
      toast.add({ title: 'Ocorreu um erro', description: 'Tente novamente, mais tarde.', color: 'error' })
      throw new Error('CSRF Token não foi obtido.')
    }

    await $fetch(`${API_BASE}/api/my-resumes`, {
      method: 'POST',
      body: payload,
      headers: {
        'X-XSRF-TOKEN': token
      },
      credentials: 'include'
    })

    toast.add({ title: 'Sucesso', description: 'Seu currículo foi salvo com sucesso!', color: 'success' })
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
  <div>
    <ResumePreview />
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
        trailing-icon="i-lucide-download"
        @click="onSubmit"
      >
        Salvar e Baixar
      </UButton>
    </div>
  </div>
</template>
