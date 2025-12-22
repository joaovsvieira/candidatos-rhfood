<script setup lang="ts">
const user = useSanctumUser<User>()
</script>

<template>
  <div
    v-if="!user.resume"
    class="text-center text-muted col-span-2 mt-32"
  >
    <ULink
      as="button"
      to="/create-resume"
    >
      Criar novo currículo
    </ULink>
  </div>

  <div v-else>
    {{ user.resume }}
  </div>
</template>
