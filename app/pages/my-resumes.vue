<script setup lang="ts">
import ResumeList from '~/components/modules/my-resumes/sections/ResumeList.vue'

const user = useSanctumUser<User>()

definePageMeta({
  middleware: ['sanctum:auth']
})
</script>

<template>
  <UContainer>
    <UPageHeader
      :title="`Olá, ${user?.name}`"
      description="Meus curriculos"
    />

    <div class="mt-5 mb-15 flex items-center justify-end space-x-2">
      <ULink
        as="button"
        to="/my-account"
      >
        Minhas Aplicações
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

    <ResumeList />
  </UContainer>
</template>
