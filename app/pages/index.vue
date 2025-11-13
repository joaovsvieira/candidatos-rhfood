<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('index', () => queryCollection('index').first())
const { data: steps } = await useAsyncData(route.path, () => queryCollection('steps').all())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <div v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
    >
      <template #top>
        <HeroBackground />
      </template>

      <template #title>
        <MDC
          :value="page.title"
          unwrap="p"
        />
      </template>

      <div class="w-full xl:w-3xl mx-auto -my-10">
        <SearchBar />
      </div>

      <UPageCard
        variant="subtle"
        class="rounded-2xl"
        >
            <img
                src="https://images.unsplash.com/photo-1723744910051-da35a92321af?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Illustration"
                class="rounded-xl w-full h-200 object-cover"
            />
        </UPageCard>
    </UPageHero>

    <UPageSection
      :title="page.vacancies.title"
      :description="page.vacancies.description"
    >
      <UPageGrid>
        <UPageCard
          v-for="(item, index) in page.vacancies.items"
          :key="index"
          v-bind="item"
          to="/vacancies/cozinheiro-de-chapa-hamburgueria"
          spotlight
        />
      </UPageGrid>

        <div class="text-center">
            <UButton label="Todas as vagas" trailing-icon="i-lucide-arrow-right" />
        </div>
    </UPageSection>

    <UPageSection
        :title="page.steps.title"
        :description="page.steps.description"
    >
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
    </UPageSection>

    <UPageSection
      id="testimonials"
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    >
      <UPageColumns class="xl:columns-4">
        <UPageCard
          v-for="(testimonial, index) in page.testimonials.items"
          :key="index"
          variant="subtle"
          :description="testimonial.quote"
          :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
        >
          <template #footer>
            <UUser
              v-bind="testimonial.user"
              size="lg"
            />
          </template>
        </UPageCard>
      </UPageColumns>
    </UPageSection>

    <UPageSection
      :title="page.faq.title"
      :description="page.faq.description"
    >
        <UAccordion
            :items="page.faq.items"
            :unmount-on-hide="false"
            :default-value="['0']"
            type="multiple"
            class="max-w-3xl mx-auto"
            :ui="{
                trigger: 'text-base text-highlighted',
                body: 'text-base text-muted'
            }"
        />
    </UPageSection>

    <USeparator />

    <UPageCTA
      v-bind="page.cta"
      variant="naked"
      class="overflow-hidden"
    >
      <LazyStarsBg />

      <template #description>
        <div class="max-w-xl mx-auto">
            {{ page.cta.description }}
        </div>
      </template>
    </UPageCTA>
  </div>
</template>
