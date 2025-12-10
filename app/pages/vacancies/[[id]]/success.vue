<script setup lang="ts">
const route = useRoute()

const { data: success } = await useAsyncData(route.path, () => queryCollection('success').first())
</script>

<template>
  <UContainer v-if="success">
    <UPageHeader
      title="Candidatura enviada com sucesso!"
      description="Agradecemos seu interesse na vaga"
    />

    <UPage>
      <UPageBody>
        <ContentRenderer :value="success" />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
