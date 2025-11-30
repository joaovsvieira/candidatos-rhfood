<script setup lang="ts">
const logos = ref([
  {
    src: '/dominos.png',
    alt: 'Dominos'
  },
  {
    src: '/giraffas.png',
    alt: 'Giraffas'
  },
  {
    src: '/spoleto.png',
    alt: 'Spoleto'
  },
  {
    src: '/tragga.png',
    alt: 'Tragga'
  }
])
</script>

<template>
  <UContainer>
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
