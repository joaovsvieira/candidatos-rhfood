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

    <div class="mt-5 mb-15 flex space-x-2 justify-end">
      <ULink
        as="button"
        to="/my-account"
      >
        Minhas aplicações
      </ULink>
      <ULink
        as="button"
        to="/edit-profile"
      >
        Editar minha conta
      </ULink>
    </div>

    <ResumeList />
  </UContainer>
</template>
