<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl

const { data: applications } = await useFetch<Candidate[]>(`${apiBaseUrl}/api/my-applications`, {
  server: false,
  lazy: true,
  credentials: 'include',
  onRequest: async ({ options }) => {
    const token = await getCsrfToken()

    if (token) {
      options.headers = {
        ...options.headers,
        'X-XSRF-TOKEN': token
      }
    }
  }
})
</script>

<template>
  <div class="mb-15 grid grid-cols-1 sm:grid-cols-2">
    <div
      v-if="applications?.length === 0"
      class="text-center text-muted col-span-2 mt-32"
    >
      Nenhuma candidatura encontrada.
    </div>
    <UCard
      v-for="(application, index) in applications"
      :key="index"
    >
      <template #header>
        <div class="flex items-center space-x-2">
          <UBadge
            v-if="!application.reason_for_disqualification"
            variant="subtle"
            color="success"
          >
            {{ application.status }}
          </UBadge>

          <UBadge
            v-else
            variant="subtle"
          >
            Desclassificado
          </UBadge>

          <span>{{ formatDistanceToNow(new Date(application.created_at), { addSuffix: true, locale: ptBR }) }}</span>
        </div>
      </template>

      <div class="space-y-2">
        <div>
          <span class="text-muted text-sm">Enunciado:</span>
          <p>{{ application.vacancy.title }}</p>
        </div>

        <div>
          <span class="text-muted text-sm">Função:</span>
          <p>{{ application.vacancy.role_name }} ({{ application.vacancy.category_name }})</p>
        </div>

        <div>
          <span class="text-muted text-sm">Modalidade:</span>
          <p>{{ application.vacancy.modality }}</p>
        </div>

        <div>
          <span class="text-muted text-sm">Salário:</span>
          <p>
            {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(application.vacancy.remuneration_salary / 100) }}
          </p>
        </div>

        <div v-if="application.vacancy.remuneration_comission ">
          <span class="text-muted text-sm">Gorjeta:</span>
          <p>{{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(application.vacancy.remuneration_comission / 100) }}</p>
        </div>

        <div>
          <span class="text-muted text-sm">Por:</span>
          <p>{{ application.vacancy.remuneration_frequency }}</p>
        </div>

        <div>
          <span class="text-muted text-sm">Tipo de contratação:</span>
          <p>{{ application.vacancy.remuneration_type }}</p>
        </div>

        <div>
          <span class="text-muted text-sm">Nível de experiência:</span>
          <p>{{ application.vacancy.level_of_experience }}</p>
        </div>

        <div>
          <span class="text-muted text-sm">Formação mínima:</span>
          <p>{{ application.vacancy.minimum_training }}</p>
        </div>

        <div v-if="application.vacancy.pwd">
          <span class="text-muted text-sm">*Vaga destinada a Pessoa com Deficiencia</span>
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-between">
          <span>{{ application.vacancy.address_street }}, {{ application.vacancy.address_district }} - {{ application.vacancy.address_state }}</span>
          <UButton
            variant="subtle"
            color="success"
            size="sm"
            :to="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(application.vacancy.address_street+', '+application.vacancy.address_district+', '+application.vacancy.address_city)}`"
            target="_blank"
          >
            Ver no mapa
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>
