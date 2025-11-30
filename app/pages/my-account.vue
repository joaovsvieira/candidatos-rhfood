<script setup lang="ts">
const user = useSanctumUser<User>()

definePageMeta({
  middleware: ['sanctum:auth']
})
</script>

<template>
  <div>
    {{ user }}
  </div>
</template>
