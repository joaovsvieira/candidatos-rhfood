<script setup lang="ts">
import { inject } from 'vue'

const resume = useResumeStore()

const levelItems = ref(['Básico', 'Intermediário', 'Avançado', 'Expert'])

const stepper = inject<Ref>('stepperRef')
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

    <div class="space-y-6 mt-14">
      <h3 class="relative text-lg text-highlighted font-bold">
        Habilidades Técnicas
      </h3>
      <div
        v-for="skill in resume.technicalSkills"
        :key="skill.id"
        class="border border-gray-900 rounded-lg transition-all duration-700"
      >
        <div class="flex items-center justify-between space-x-4 px-4 py-4">
          <UInput
            v-model="skill.title"
            class="w-full"
            aria-required="true"
            placeholder="Ex:"
          />

          <USelect
            v-model="skill.level"
            :items="levelItems"
            class="w-full"
            aria-required="true"
          />

          <UButton
            leading-icon="i-lucide-trash-2"
            color="error"
            variant="ghost"
            size="sm"
            @click="resume.removeTechnicalSkill(skill.id)"
          />
        </div>
      </div>

      <UButton
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
        v-for="language in resume.languages"
        :key="language.id"
        class="border border-gray-900 rounded-lg transition-all duration-700"
      >
        <div class="flex items-center justify-between space-x-4 px-4 py-4">
          <UInput
            v-model="language.title"
            class="w-full"
            aria-required="true"
            placeholder="Ex: Inglês, Espanhol, Francês..."
          />

          <USelect
            v-model="language.level"
            :items="levelItems"
            class="w-full"
            aria-required="true"
          />

          <UButton
            leading-icon="i-lucide-trash-2"
            color="error"
            variant="ghost"
            size="sm"
            @click="resume.removeLanguage(language.id)"
          />
        </div>
      </div>

      <UButton
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
