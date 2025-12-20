<script setup lang="ts">
import { inject } from 'vue'

const stepper = inject<Ref>('stepperRef')
</script>

<template>
  <div>
    preview
    <div class="flex gap-2 justify-between mt-10">
      <UButton
        leading-icon="i-lucide-arrow-left"
        :disabled="!stepper?.hasPrev"
        @click="stepper?.prev()"
      >
        Anterior
      </UButton>

      <UButton
        trailing-icon="i-lucide-arrow-right"
        :disabled="!stepper?.hasNext"
        @click="stepper?.next()"
      >
        Próximo
      </UButton>
    </div>
  </div>
</template>
