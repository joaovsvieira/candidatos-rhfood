<script setup lang="ts">
import brasilDataRaw from '~/../assets/data/estados-cidades.json'

interface Estado {
  sigla: string
  nome: string
  cidades: string[]
}

interface BrasilData {
  estados: Estado[]
}

const items = brasilDataRaw as BrasilData

const selectedState = ref<Estado | undefined>()

const selectedCity = ref<string | undefined>()

const stateOptions = computed(() => items.estados || [])

const cityOptions = computed(() => {
  if (!selectedState.value) return []

  return selectedState.value.cidades
})

watch(selectedState, () => {
  selectedCity.value = undefined
})

const search = ref<string | null>()

async function onSubmit() {
  const state = selectedState.value?.sigla
  const city = selectedCity.value
  const query = search.value

  const queryParams = {
    ...(state && { state }),
    ...(city && { city }),
    ...(query && { q: query })
  }

  await navigateTo({
    path: '/search',
    query: queryParams
  })
}
</script>

<template>
  <div class="w-full lg:w-3/4 space-y-4">
    <UInput
      v-model="search"
      icon="i-lucide-search"
      placeholder="Procure categoria, bairro ou vaga de interesse..."
      size="xl"
      class="w-full"
    />

    <div class="flex flex-col lg:flex-row items-center gap-4">
      <USelectMenu
        v-model="selectedState"
        :items="stateOptions"
        label-key="nome"
        placeholder="Selecione o Estado"
        size="xl"
        class="w-full lg:w-1/2"
      />

      <USelectMenu
        v-model="selectedCity"
        :items="cityOptions"
        :disabled="!selectedState"
        placeholder="Selecione a Cidade"
        size="xl"
        class="w-full lg:w-1/2"
      />
    </div>

    <UButton
      class="w-full text-center"
      size="xl"
      color="primary"
      variant="subtle"
      @click="onSubmit"
    >
      Buscar
    </UButton>
  </div>
</template>
