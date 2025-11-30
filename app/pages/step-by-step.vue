<script setup lang="ts">
const route = useRoute()

const { data: steps } = await useAsyncData(route.path, () => queryCollection('steps').all())

useSeoMeta({
  title: 'RHFood - Passo a Passo',
  description: 'Encontre sua próxima oportunidade de emprego'
})
</script>

<template>
  <UContainer>
    <UPageHeader
      title="Como funciona para você, candidato?"
      description="Desenhamos uma plataforma simples para conectar você ao seu próximo desafio. Veja como é fácil começar a se candidatar."
      class="py-[50px]"
    />

    <UPageBody>
      <UChangelogVersions>
        <UChangelogVersion
          v-for="(step, index) in steps"
          :key="index"
          v-bind="step"
        >
          <template #body>
            <ContentRenderer :value="step.body" />
          </template>
        </UChangelogVersion>
      </UChangelogVersions>
    </UPageBody>
  </UContainer>
</template>
