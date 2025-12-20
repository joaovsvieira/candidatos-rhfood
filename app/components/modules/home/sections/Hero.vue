<script setup lang="ts">
const items = [
  '/hero4.jpg',
  '/hero6.jpg'
]
</script>

<template>
  <UPageHero
    description="A busca inteligente para encontrar empregos em todo o Brasil."
    :ui="{
      title: 'text-4xl sm:text-5xl'
    }"
  >
    <template #top>
      <HeroBackground />
    </template>

    <template #title>
      O proximo passo da <br>sua <span class="text-primary">carreira</span> está aqui
    </template>

    <div class="flex items-center justify-center w-full max-w-xl mx-auto">
      <SearchBar />
    </div>

    <UPageCard
      variant="subtle"
      class="rounded-2xl pb-4"
    >
      <UCarousel
        v-slot="{ item }"
        :items="items"
        dots
        autoplay
        loop
      >
        <img
          :src="item"
          alt="Illustration"
          class="rounded-xl w-full h-200 object-cover"
        >
      </UCarousel>
    </UPageCard>
  </UPageHero>
</template>
