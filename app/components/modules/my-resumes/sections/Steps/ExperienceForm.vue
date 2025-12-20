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
        Experiência Profissional
      </h2>
      <p class="leading-7 text-pretty text-muted">
        Adicione suas experiências de trabalho mais relevantes
      </p>
    </div>

    <div class="space-y-6 mt-14">
      <div
        v-for="(experience, index) in resume.experiences"
        :key="experience.id"
        class="border border-gray-900 rounded-lg transition-all duration-700"
        :class="{ 'border-primary/50': resume.activeExperienceId === experience.id }"
      >
        <div
          class="flex items-center justify-between px-4 py-4"
          :class="{ 'border-b border-gray-900': resume.activeExperienceId === experience.id }"
          @click="resume.activeExperienceId = resume.activeExperienceId === experience.id ? null : experience.id"
        >
          <div class="flex items-center space-x-4 flex-1">
            <div class="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              {{ index + 1 }}
            </div>

            <div>
              <h2 class="relative text-highlighted font-bold">
                {{ experience.role || 'Nova Experiência' }}
              </h2>
              <p class="leading-5 text-sm text-pretty text-muted">
                {{ experience.company || 'Empresa' }}
              </p>
            </div>
          </div>

          <div>
            <UButton
              leading-icon="i-lucide-trash-2"
              color="error"
              variant="ghost"
              size="sm"
              @click="resume.removeExperience(experience.id)"
            />
          </div>
        </div>

        <div
          v-if="resume.activeExperienceId === experience.id"
          class="px-4 py-4"
        >
          <div class="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0">
            <UFormField
              label="Empresa *"
              name="company"
              class="lg:w-1/2"
            >
              <UInput
                v-model="experience.company"
                class="w-full"
                aria-required="true"
                placeholder="Nome da Empresa"
              />
            </UFormField>

            <UFormField
              label="Cargo *"
              name="role"
              class="lg:w-1/2"
            >
              <UInput
                v-model="experience.role"
                class="w-full"
                aria-required="true"
                placeholder="Cozinheiro"
              />
            </UFormField>
          </div>

          <div class="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0 mt-4">
            <UFormField
              label="Data de Início *"
              name="startDate"
              class="lg:w-1/2"
            >
              <UInput
                v-model="experience.startDate"
                v-maska="'##/##/####'"
                class="w-full"
                aria-required="true"
                placeholder="dd/mm/aaaa"
              />
            </UFormField>

            <UFormField
              label="Data de Término"
              name="endDate"
              class="lg:w-1/2"
            >
              <UInput
                v-model="experience.endDate"
                v-maska="'##/##/####'"
                class="w-full"
                placeholder="dd/mm/aaaa"
                :disabled="experience.currentlyWorking"
              />
            </UFormField>
          </div>

          <div class="mt-4">
            <UCheckbox
              v-model="experience.currentlyWorking"
              label="Trabalho atualmente nesta empresa"
            />
          </div>

          <div class="mt-4">
            <UFormField
              label="Descrição das Atividades"
              name="description"
            >
              <UTextarea
                v-model="experience.description"
                class="w-full"
                placeholder="Descreva suas principais responsabilidades e conquistas..."
              />
            </UFormField>
          </div>
        </div>
      </div>

      <UButton
        leading-icon="i-lucide-plus"
        variant="subtle"
        class="w-full justify-center"
        @click="resume.addExperience()"
      >
        Adicionar Experiência
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
