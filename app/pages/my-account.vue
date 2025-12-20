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

    <div class="mt-5 mb-15 flex items-center justify-end space-x-2">
      <ULink
        as="button"
        to="/my-resumes"
      >
        Meus Curriculos
      </ULink>
      <USeparator
        orientation="vertical"
        class="h-5"
      />
      <ULink
        as="button"
        to="/edit-profile"
      >
        Editar Conta
      </ULink>
    </div>

    <Applications />
  </UContainer>
</template>
