<script setup lang="ts">
const today = new Date()
const tomorrow = new Date(today)

tomorrow.setDate(today.getDate() + 1)

const dateFormatted = tomorrow.toLocaleDateString('pt-BR')

const plans = ref([
  {
    title: 'Compra avulsa',
    description: 'Acesso limitado ao recurso que você está comprando, sem cobranças recorrentes.',
    terms: 'Oferta válida até ' + dateFormatted,
    price: 'R$ 180,00',
    button: {
      label: 'Comprar',
      color: 'neutral',
      variant: 'subtle',
      to: 'https://app.rhfood.com.br',
      target: '_blank'
    },
    features: [
      {
        title: 'Vagas ilimitadas',
        icon: 'i-heroicons-x-circle'
      },
      {
        title: 'Banco de talentos',
        icon: 'i-heroicons-x-circle'
      },
      {
        title: 'Tempo para expirar as vagas',
        icon: 'i-heroicons-check-circle'
      }
    ]
  },
  {
    title: 'Assinatura recorrente',
    description: 'Acesso ilimitado a este e todos os outros recursos da plataforma, com atualizações constantes.',
    badge: 'Recomendado',
    highlight: true,
    terms: 'Oferta válida até ' + dateFormatted,
    billingCycle: '/mês',
    price: 'R$ 229,00',
    button: {
      label: 'Assinar',
      color: 'neutral',
      variant: 'subtle',
      to: 'https://app.rhfood.com.br',
      target: '_blank'
    },
    features: [
      {
        title: 'Vagas ilimitadas',
        icon: 'i-heroicons-check-circle',
        color: 'success'
      },
      {
        title: 'Banco de talentos',
        icon: 'i-heroicons-check-circle'
      },
      {
        title: 'Tempo para expirar as vagas',
        icon: 'i-heroicons-x-circle'
      }
    ]
  }
])

const specialPlans = ref([
  {
    title: 'Personalizado',
    description: 'Nenhuma das opções acima atende 100% ao que você precisa? Sem problemas. Temos soluções flexíveis para atender exatamente ao seu fluxo de trabalho.',
    button: {
      label: 'Entrar em contato',
      color: 'neutral',
      variant: 'subtle',
      to: 'https://wa.me/+5521986461559?text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20o%20plano%20personalizado%20do%20RHFood.',
      target: '_blank'
    }
  }
])

useSeoMeta({
  title: 'RHFood - Para Empresas',
  description: 'Encontre sua próxima oportunidade de emprego'
})
</script>

<template>
  <div>
    <UPageHero
      title="Para empresas de todos os tamanhos"
      description="Escolha o plano ideal para você e comece a contratar os melhores talentos do setor de alimentação"
    />

    <UContainer>
      <UPricingPlans>
        <UPricingPlan
          v-for="(plan, index) in plans"
          :key="index"
          v-bind="plan"
          :ui="{
            featureIcon: 'text-slate-500'
          }"
        />
      </UPricingPlans>

      <div class="mt-15">
        <UPricingPlans
          orientation="vertical"
          :plans="specialPlans"
        />
      </div>
    </UContainer>

    <div class="pt-16 lg:pt-32">
      <PartnersLogo />
    </div>

    <Faq />
  </div>
</template>
