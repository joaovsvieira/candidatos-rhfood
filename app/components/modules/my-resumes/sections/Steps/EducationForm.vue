<script setup lang="ts">
import { inject } from 'vue'
import { vMaska } from 'maska/vue'

const resume = useResumeStore()

const stepper = inject<Ref>('stepperRef')
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
              name="institution"
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
              name="title"
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
              name="studyArea"
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
              name="startDate"
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
              name="endDate"
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
              name="description"
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
</template>
