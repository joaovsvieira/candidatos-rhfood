<script setup lang="ts">
const items = ref([
  {
    label: 'Preciso pagar para me candidatar às vagas?',
    content: 'Não. O RHFood é 100% gratuito para candidatos. Você pode buscar vagas, criar seu perfil completo, cadastrar seu currículo e se candidatar a quantas oportunidades desejar, sem nenhum custo.'
  },
  {
    label: 'Como funciona o processo de candidatura?',
    content: 'É muito simples, basta encontrar a vaga que voce gostou usando nossa busca, em seguida clique no botão "Candidatar-se". Recomendamos que você crie seu perfil e cadastre seu currículo em nossa plataforma. Isso agiliza suas candidaturas futuras e permite que as empresas também encontrem o seu perfil.'
  },
  {
    label: 'Sou uma empresa. Como faço para anunciar uma vaga?',
    content: 'Ficamos felizes com seu interesse! Para publicar uma vaga, basta se cadastrar no link https://app.rhfood.com.br/'
  }
])
</script>

<template>
  <UPageSection
    title="Perguntas Frequentes"
    description="Tem alguma dúvida? Nós respondemos. Reunimos aqui as perguntas mais comuns de candidatos e empresas para ajudar você a ter a melhor experiência"
    :ui="{
      container: 'py-10 sm:py-10 lg:py-10'
    }"
  >
    <UAccordion
      :items="items"
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
</template>
