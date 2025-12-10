<script setup lang="ts">
import Applications from '@/components/modules/my-account/sections/Applications.vue'

const user = useSanctumUser<User>()

definePageMeta({
  middleware: ['sanctum:auth']
})
</script>

<template>
  <UContainer>
    <UPageHeader
      :title="`Olá, ${user?.name}`"
      description="Minhas candidaturas"
    />

    <div class="text-right mt-5 mb-15">
      <ULink
        as="button"
        to="/edit-profile"
      >
        Editar minha conta
      </ULink>
    </div>

    <Applications />
  </UContainer>
</template>
