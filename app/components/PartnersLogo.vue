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

const logos2 = ref([
  {
    src: '/bobs.png',
    alt: 'Bobs'
  },
  {
    src: '/baladamix.png',
    alt: 'Balada Mix'
  },
  {
    src: '/villario.png',
    alt: 'Villa Rio'
  },
  {
    src: '/americas.png',
    alt: 'Américas Hotéis'
  }
])
</script>

<template>
  <UContainer>
    <h2 class="text-center mb-8 text-lg text-pretty text-muted">
      Empresas que confiam no RHFood
    </h2>
    <UMarquee pause-on-hover :repeat="6" class="py-4">
      <UPageCard
        v-for="(logo, index) in logos"
        :key="index"
        class="bg-black/10"
      >
        <img
          :src="logo.src"
          :alt="logo.alt"
          class="w-40 mx-auto grayscale opacity-60 hover:opacity-100 transition duration-300"
        />
      </UPageCard>
    </UMarquee>

    <UMarquee reverse pause-on-hover :repeat="6" class="py-4">
      <UPageCard
        v-for="(logo, index) in logos2"
        :key="index"
        class="bg-black/10"
      >
        <img
          :src="logo.src"
          :alt="logo.alt"
          class="w-40 mx-auto grayscale opacity-60 hover:opacity-100 transition duration-300"
        />
      </UPageCard>
    </UMarquee>
  </UContainer>
</template>
