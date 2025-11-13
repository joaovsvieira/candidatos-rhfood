<script setup lang="ts">
const input = useTemplateRef('input')

defineShortcuts({
  '/': () => {
    input.value?.inputRef?.focus()
  }
})
</script>

<template>
    <UInput
        ref="input"
        icon="i-lucide-search"
        placeholder="Procure categoria, bairro ou vaga de interesse..."
        size="xl"
        class="w-full"
    >
    <template #trailing>
      <UKbd value="/" />
    </template>
  </UInput>
</template>
