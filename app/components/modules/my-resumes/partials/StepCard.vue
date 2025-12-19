<script setup lang="ts">
import ResumePreview from '@/components/modules/my-resumes/sections/ResumePreview.vue'
</script>

<template>
  <div class="flex flex-col lg:flex-row justify-between mt-10">
    <div class="lg:w-1/2">
      <slot />
    </div>

    <div class="lg:w-1/2">
      <ResumePreview />
    </div>
  </div>
</template>
