// composables/usePdfGenerator.ts
import { ref } from 'vue'

export const usePdfGenerator = () => {
  const isGenerating = ref(false)
  const error = ref<string | null>(null)

  /**
   * Envia o HTML para a API e abre o PDF resultante em uma nova aba.
   * @param htmlContent O HTML string completo a ser renderizado
   * @param filename Nome opcional para o arquivo (fallback no backend)
   */
  const generateAndOpenPdf = async (htmlContent: string, filename?: string) => {
    if (!htmlContent) {
      error.value = 'Conteúdo HTML vazio.'
      return
    }

    isGenerating.value = true
    error.value = null

    try {
      // Faz a chamada para a sua API Nuxt
      // Use $fetch nativo do Nuxt que já sabe lidar com SSR/Client
      const pdfBlob = await $fetch('/api/pdf', {
        method: 'POST',
        body: { 
            html: htmlContent,
            filename: filename // Opcional: se quiser passar o nome dinâmico
        },
        responseType: 'blob' // Essencial: esperamos um arquivo binário
      })

      // Cria a URL temporária no navegador
      const pdfUrl = URL.createObjectURL(pdfBlob as Blob)

      // Abre em nova aba
      window.open(pdfUrl, '_blank')

      // Limpa a memória após um tempo seguro
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl)
      }, 5000)

    } catch (err: any) {
      console.error('Erro ao gerar PDF:', err)
      error.value = err.message || 'Falha ao comunicar com o servidor de PDF.'
      alert('Erro ao gerar o PDF. Verifique o console.')
    } finally {
      isGenerating.value = false
    }
  }

  return {
    generateAndOpenPdf,
    isGenerating,
    error
  }
}
