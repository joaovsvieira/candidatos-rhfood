<script setup lang="ts">
import ResumePreview from './ResumePreview.vue'

const user = useSanctumUser<User>()

const { generateAndOpenPdf, isGenerating } = usePdfGenerator()

const previewComponentRef = ref(null)

const downloadPdf = () => {
  const htmlDoCurriculo = previewComponentRef.value?.resumeContent.innerHTML

  if (htmlDoCurriculo) {
    generateAndOpenPdf(htmlDoCurriculo, 'Meu-Curriculo-Top.pdf')
  }
}
</script>

<template>
  <div
    v-if="!user?.resume"
    class="text-center text-muted col-span-2 mt-32"
  >
    <UButton
      to="/create-resume"
    >
      Criar Currículo
    </UButton>
  </div>

  <div v-else>
    <ResumePreview ref="previewComponentRef" />
    <div class="flex items-center justify-center mb-8 space-x-4">
      <UButton
        variant="subtle"
        to="/create-resume"
      >
        Editar Currículo
      </UButton>
      <UButton
        :disabled="isGenerating"
        class="cursor-pointer"
        @click="downloadPdf"
      >
        Baixar Currículo
      </UButton>
    </div>
  </div>
</template>
