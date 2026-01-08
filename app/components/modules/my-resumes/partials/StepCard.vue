<script setup lang="ts">
import ResumePreview from '@/components/modules/my-resumes/sections/ResumePreview.vue'
</script>

<template>
  <div class="flex flex-col lg:flex-row justify-between items-center mt-10 lg:space-x-12">
    <div class="lg:w-1/2 mb-10 lg:mb-0 w-full">
      <slot />
    </div>

    <div class="lg:w-1/2">
      <ResumePreview />
    </div>
  </div>
</template>
