<script setup lang="ts">
const logos = ref([
  {
    src: '/dominos.png',
    alt: 'Dominos'
  },
  {
    src: '/spoleto.png',
    alt: 'Spoleto'
  },
  {
    src: '/tragga.png',
    alt: 'Tragga'
  },
  {
    src: '/giraffas.png',
    alt: 'Giraffas'
  }
])
</script>

<template>
  <UContainer>
    <h2 class="text-center mb-8 text-lg text-pretty text-muted">
      Empresas que confiam no RHFood
    </h2>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
      <img
        v-for="(logo, index) in logos"
        :key="index"
        :src="logo.src"
        :alt="logo.alt"
        class="w-40 mx-auto grayscale opacity-60 hover:opacity-100 transition duration-300"
      >
    </div>
  </UContainer>
</template>
