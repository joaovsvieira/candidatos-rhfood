<script setup lang="ts">
import { inject } from 'vue'
import { z } from 'zod'

const resume = useResumeStore()

const LevelEnum = z.enum(['Básico', 'Intermediário', 'Avançado', 'Expert'], {
  error: () => ({ message: 'Selecione um nível válido' })
})
const levelItems = LevelEnum.options

const stepper = inject<Ref>('stepperRef')

const technicalSkillSchema = z.object({
  title: z.string().min(1, 'Habilidade é obrigatório'),
  level: LevelEnum
})

const languageSchema = z.object({
  title: z.string().min(1, 'Idioma é obrigatório'),
  level: LevelEnum
})

const schema = z.object({
  technicalSkills: z.array(technicalSkillSchema),
  languages: z.array(languageSchema)
})

async function onSubmit() {
  stepper?.value?.next()
}
</script>

<template>
  <div>
    <div class="text-center">
      <h2 class="relative text-2xl text-highlighted font-bold">
        Habilidades e Idiomas
      </h2>
      <p class="leading-7 text-pretty text-muted">
        Liste suas competências técnicas e idiomas
      </p>
    </div>

    <UForm
      :schema="schema"
      :state="resume"
      @submit="onSubmit"
    >
      <div class="space-y-6 mt-14">
        <h3 class="relative text-lg text-highlighted font-bold">
          Habilidades Técnicas
        </h3>
        <div
          v-for="(skill, index) in resume.technicalSkills"
          :key="skill.id"
          class="border border-gray-300 dark:border-gray-900 rounded-lg transition-all duration-700"
        >
          <div class="flex items-center justify-between space-x-4 px-4 py-4">
            <UFormField :name="`technicalSkills.${index}.title`">
              <UInput
                v-model="skill.title"
                class="w-full"
                aria-required="true"
                placeholder="Ex:"
              />
            </UFormField>

            <UFormField :name="`technicalSkills.${index}.level`">
              <USelect
                v-model="skill.level"
                :items="levelItems"
                class="w-full"
                aria-required="true"
              />
            </UFormField>

            <UButton
              type="button"
              leading-icon="i-lucide-trash-2"
              color="error"
              variant="ghost"
              size="sm"
              @click="resume.removeTechnicalSkill(skill.id)"
            />
          </div>
        </div>

        <UButton
          type="button"
          leading-icon="i-lucide-plus"
          variant="subtle"
          class="w-full justify-center"
          @click="resume.addTechnicalSkill()"
        >
          Adicionar Habilidade
        </UButton>
      </div>

      <div class="space-y-6 mt-14">
        <h3 class="relative text-lg text-highlighted font-bold">
          Idiomas
        </h3>
        <div
          v-for="(language, index) in resume.languages"
          :key="language.id"
          class="border border-gray-300 dark:border-gray-900 rounded-lg transition-all duration-700"
        >
          <div class="flex items-center justify-between space-x-4 px-4 py-4">
            <UFormField :name="`languages.${index}.title`">
              <UInput
                v-model="language.title"
                class="w-full"
                aria-required="true"
                placeholder="Ex: Inglês, Espanhol, Francês..."
              />
            </UFormField>

            <UFormField :name="`languages.${index}.level`">
              <USelect
                v-model="language.level"
                :items="levelItems"
                class="w-full"
                aria-required="true"
              />
            </UFormField>

            <UButton
              type="button"
              leading-icon="i-lucide-trash-2"
              color="error"
              variant="ghost"
              size="sm"
              @click="resume.removeLanguage(language.id)"
            />
          </div>
        </div>

        <UButton
          type="button"
          leading-icon="i-lucide-plus"
          variant="subtle"
          class="w-full justify-center"
          @click="resume.addLanguage()"
        >
          Adicionar Idioma
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
