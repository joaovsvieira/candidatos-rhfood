<script setup lang="ts">
import { inject } from 'vue'
import { vMaska } from 'maska/vue'
import { z } from 'zod'

const resume = useResumeStore()

const stepper = inject<Ref>('stepperRef')

const educationSchema = z.object({
  institution: z.string().min(1, 'Nome da instituição é obrigatório'),
  title: z.string().min(1, 'Título do curso é obrigatório'),
  studyArea: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional()
})

const schema = z.object({
  educations: z.array(educationSchema)
})

async function onSubmit() {
  stepper?.value?.next()
}

function onError(event: any) {
  const error = event.errors?.[0]

  if (!error) return

  if (!error.name) return

  const parts = error.name.split('.')

  if (parts[0] === 'educations' && parts[1]) {
    const index = parseInt(parts[1])

    const educationId = resume.educations[index]?.id

    if (educationId) {
      resume.activeEducationId = educationId

      nextTick(() => {
        const inputName = `educations.${index}.${parts[2]}`
        const inputElement = document.getElementsByName(inputName)[0]
        if (inputElement) inputElement.focus()
      })
    }
  }
}
</script>

<template>
  <div>
    <div class="text-center">
      <h2 class="relative text-2xl text-highlighted font-bold">
        Formação Acadêmica
      </h2>
      <p class="leading-7 text-pretty text-muted">
        Adicione sua formação educacional
      </p>
    </div>

    <UForm
      :schema="schema"
      :state="resume"
      @submit="onSubmit"
      @error="onError"
    >
      <div class="space-y-6 mt-14">
        <div
          v-for="(education, index) in resume.educations"
          :key="education.id"
          class="border border-gray-900 rounded-lg transition-all duration-700"
          :class="{ 'border-primary/50': resume.activeEducationId === education.id }"
        >
          <div
            class="flex items-center justify-between px-4 py-4"
            :class="{ 'border-b border-gray-900': resume.activeEducationId === education.id }"
            @click="resume.activeEducationId = resume.activeEducationId === education.id ? null : education.id"
          >
            <div class="flex items-center space-x-4 flex-1">
              <div class="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                {{ index + 1 }}
              </div>

              <div>
                <h2 class="relative text-highlighted font-bold">
                  {{ education.title || 'Novo Curso' }}
                </h2>
                <p class="leading-5 text-sm text-pretty text-muted">
                  {{ education.institution || 'Instituição' }}
                </p>
              </div>
            </div>

            <div>
              <UButton
                type="button"
                leading-icon="i-lucide-trash-2"
                color="error"
                variant="ghost"
                size="sm"
                @click="resume.removeEducation(education.id)"
              />
            </div>
          </div>

          <div
            v-if="resume.activeEducationId === education.id"
            class="px-4 py-4"
          >
            <div class="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0">
              <UFormField
                label="Instituição *"
                :name="`educations.${index}.institution`"
                class="lg:w-1/2"
              >
                <UInput
                  v-model="education.institution"
                  class="w-full"
                  aria-required="true"
                  placeholder="Nome da universidade/escola"
                />
              </UFormField>

              <UFormField
                label="Grau/Título *"
                :name="`educations.${index}.title`"
                class="lg:w-1/2"
              >
                <UInput
                  v-model="education.title"
                  class="w-full"
                  aria-required="true"
                  placeholder="Bacharelado, Mestrado, etc."
                />
              </UFormField>
            </div>

            <div class="mt-4">
              <UFormField
                label="Área de Estudo *"
                :name="`educations.${index}.studyArea`"
              >
                <UInput
                  v-model="education.studyArea"
                  class="w-full"
                  aria-required="true"
                  placeholder="Ciência da Computação, Administração, etc."
                />
              </UFormField>
            </div>

            <div class="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0 mt-4">
              <UFormField
                label="Data de Início"
                :name="`educations.${index}.startDate`"
                class="lg:w-1/2"
              >
                <UInput
                  v-model="education.startDate"
                  v-maska="'##/##/####'"
                  class="w-full"
                  placeholder="dd/mm/aaaa"
                />
              </UFormField>

              <UFormField
                label="Data de Conclusão"
                :name="`educations.${index}.endDate`"
                class="lg:w-1/2"
              >
                <UInput
                  v-model="education.endDate"
                  v-maska="'##/##/####'"
                  class="w-full"
                  placeholder="dd/mm/aaaa"
                />
              </UFormField>
            </div>

            <div class="mt-4">
              <UFormField
                label="Descrição (opcional)"
                :name="`educations.${index}.description`"
              >
                <UTextarea
                  v-model="education.description"
                  class="w-full"
                  placeholder="Principais atividades, honras, projetos relevantes..."
                />
              </UFormField>
            </div>
          </div>
        </div>

        <UButton
          type="button"
          leading-icon="i-lucide-plus"
          variant="subtle"
          class="w-full justify-center"
          @click="resume.addEducation()"
        >
          Adicionar Formação
        </UButton>
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
