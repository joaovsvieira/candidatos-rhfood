<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => queryCollection('about').first())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description
})

defineOgImageComponent('RH Food')
</script>

<template>
    <UContainer v-if="page">
        <UPageHeader v-bind="page" class="py-[50px]" />

        <UPageBody>
            <PromotionalVideo />

            <UPageSection
                v-for="(section, index) in page.sections"
                :key="index"
                :title="section.title"
                :description="section.description"
                :orientation="section.orientation"
                :reverse="section.reverse"
                :features="section.features"
                class="mb-0"
            >
                <UPageCard
                    variant="subtle"
                    class="rounded-2xl"
                >
                    <img
                        :src="section.image"
                        alt="Illustration"
                        class="rounded-xl w-full h-92 object-cover"
                    />
                </UPageCard>
            </UPageSection>
        </UPageBody>
    </UContainer>
</template>
