<script setup>
import { useResumeStore } from '~/stores/resume'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const store = useResumeStore()
const resumeContent = ref(null)
const containerRef = ref(null)
const scale = ref(1)
const containerHeight = ref('auto')
let resizeObserver = null

// --- LÓGICA DE URL E LINKS (Mantida) ---
const logoDisplayUrl = computed(() => {
  let url = store.logoUrl || '/app-logo-default.png'
  if (url.startsWith('/') && typeof window !== 'undefined') {
    return `${window.location.origin}${url}`
  }
  return url
})

const linkedinUrl = computed(() => {
  if (!store.linkedin) return ''
  const handle = store.linkedin.trim().replace(/^@/, '')
  return `https://www.linkedin.com/in/${handle}`
})

const formatLink = (url) => {
  if (!url) return ''
  return url.startsWith('http') ? url : `https://${url}`
}

// --- LÓGICA DE ESCALA ---
const updateScale = (parentWidth) => {
  const a4WidthPx = 794 // Largura base do A4
  const paddingSafety = 30 // Margem de segurança

  // 1. O "Pulo do Gato":
  // Comparamos a largura que o Container diz ter (parentWidth)
  // com a largura REAL da janela (window.innerWidth).
  // Usamos o MENOR dos dois. Isso impede que o mobile minta o tamanho.
  const realWidth = Math.min(parentWidth, window.innerWidth)

  const availableWidth = realWidth - paddingSafety

  // Calcula a escala, travando em no máximo 1 (100%)
  scale.value = Math.min(availableWidth / a4WidthPx, 1)

  // Ajusta altura
  if (resumeContent.value) {
    const originalHeight = resumeContent.value.offsetHeight
    containerHeight.value = `${(originalHeight * scale.value) + 50}px`
  }
}

onMounted(() => {
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      // Passamos a largura reportada pelo container para a função
      updateScale(entry.contentRect.width)
    }
  })

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

defineExpose({ resumeContent })
</script>

<template>
  <div ref="containerRef" class="flex justify-center print:p-0 print:bg-white w-full max-w-[100vw] overflow-hidden">
    
    <div 
      :style="{ 
        transform: `scale(${scale})`, 
        transformOrigin: 'top center',
        height: containerHeight,
        width: '210mm'
      }"
      class="transition-transform duration-100 ease-out print:transform-none print:h-auto print:w-full"
    >
      
      <div 
        ref="resumeContent"
        class="bg-white w-[210mm] min-w-[210mm] text-gray-800 leading-relaxed
               print:w-full print:shadow-none print:border-none print:ring-0 relative overflow-hidden"
      >
        
        <div class="absolute top-0 left-0 w-full h-3 bg-blue-900"></div>
        <div class="absolute top-0 right-0 w-40 h-3 bg-red-600 z-10"></div>

        <div class="px-[10mm] pt-[10mm] pb-[10mm]">
        
          <header class="border-b-2 border-gray-800 pb-6 mb-8 flex flex-col items-center gap-2 mt-4">
            
            <div class="shrink-0 mb-6">
                <img 
                  :src="logoDisplayUrl" 
                  crossorigin="anonymous"
                  alt="Logo" 
                  class="h-20 w-auto object-contain" 
                />
            </div>

            <div class="text-center w-full">
              <h1 class="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-3 leading-none font-sans">
                {{ store.name || 'Seu Nome' }}
              </h1>
              
              <div class="text-sm text-gray-600 flex flex-col items-center gap-1.5">
                <div v-if="store.location" class="flex items-center gap-2 font-medium text-gray-700">
                  📍 {{ store.location }}
                </div>
                
                <div class="flex flex-wrap justify-center items-center gap-3" v-if="store.email || store.phone">
                    <a v-if="store.email" :href="`mailto:${store.email}`" class="flex items-center gap-1.5 hover:text-blue-600 hover:underline">
                      ✉️ {{ store.email }}
                    </a>
                    <span v-if="store.email && store.phone" class="text-gray-300">|</span>
                    <a v-if="store.phone" :href="`tel:${store.phone}`" class="flex items-center gap-1.5 hover:text-blue-600 hover:underline">
                      📞 {{ store.phone }}
                    </a>
                </div>

                <div class="flex flex-wrap justify-center items-center gap-3 text-blue-800 font-medium" v-if="store.linkedin || store.website">
                    <a v-if="store.linkedin" :href="linkedinUrl" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 hover:underline hover:text-red-600">
                      🔗 {{ store.linkedin }}
                    </a>
                    <span v-if="store.linkedin && store.website" class="text-gray-300">|</span>
                    <a v-if="store.website" :href="formatLink(store.website)" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 hover:underline hover:text-red-600">
                      🌐 {{ store.website }}
                    </a>
                </div>
              </div>
            </div>
          </header>

          <section v-if="store.description" class="mb-6">
            <h2 class="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 mb-3 pb-1">
              Perfil Profissional
            </h2>
            <p class="text-sm text-gray-700 whitespace-pre-line text-justify leading-relaxed">
              {{ store.description }}
            </p>
          </section>

          <section v-if="store.experiences.length > 0" class="mb-6">
            <h2 class="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 mb-4 pb-1">
              Experiência Profissional
            </h2>
            <div class="flex flex-col gap-5">
              <div v-for="exp in store.experiences" :key="exp.id" class="break-inside-avoid">
                <div class="flex justify-between items-baseline mb-1">
                  <h3 class="font-bold text-gray-900 text-base">{{ exp.company }}</h3>
                  <span class="text-xs text-gray-600 font-medium whitespace-nowrap bg-gray-100 px-2 py-0.5">
                    {{ exp.startDate }} – {{ exp.currentlyWorking ? 'Atualmente' : exp.endDate }}
                  </span>
                </div>
                
                <div class="text-sm font-bold text-gray-900 mb-2">
                  {{ exp.role }}
                </div>
                
                <p class="text-sm text-gray-700 whitespace-pre-line pl-3 border-l-2 border-gray-200">
                  {{ exp.description }}
                </p>
              </div>
            </div>
          </section>

          <section v-if="store.educations.length > 0" class="mb-6">
            <h2 class="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 mb-4 pb-1">
              Formação Acadêmica
            </h2>
            <div class="flex flex-col gap-4">
              <div v-for="edu in store.educations" :key="edu.id" class="break-inside-avoid">
                
                <div class="flex justify-between items-baseline mb-1">
                  <h3 class="font-bold text-gray-900 text-base">
                      {{ edu.title }} <span v-if="edu.studyArea">em {{ edu.studyArea }}</span>
                  </h3>
                  <span class="text-xs text-gray-600 font-medium whitespace-nowrap bg-gray-100 px-2 py-0.5">
                    {{ edu.startDate }} – {{ edu.endDate }}
                  </span>
                </div>
                
                <div class="text-sm font-bold text-gray-900 mb-2">
                  {{ edu.institution }}
                </div>
                
                <p v-if="edu.description" class="text-sm text-gray-700 whitespace-pre-line pl-3 border-l-2 border-gray-200">
                  {{ edu.description }}
                </p>
              </div>
            </div>
          </section>

          <div class="grid grid-cols-2 gap-8 break-inside-avoid">
            <section v-if="store.technicalSkills.length > 0">
              <h2 class="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 mb-3 pb-1">
                Habilidades Técnicas
              </h2>
              <ul class="text-sm text-gray-700 space-y-2">
                <li v-for="skill in store.technicalSkills" :key="skill.id" class="flex justify-between items-center bg-gray-50 px-3 py-1.5">
                  <span class="font-medium">{{ skill.title }}</span>
                  <span class="text-gray-500 text-[10px] uppercase tracking-wider font-bold">{{ skill.level }}</span>
                </li>
              </ul>
            </section>

            <section v-if="store.languages.length > 0">
              <h2 class="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 mb-3 pb-1">
                Idiomas
              </h2>
              <ul class="text-sm text-gray-700 space-y-2">
                <li v-for="lang in store.languages" :key="lang.id" class="flex justify-between items-center bg-gray-50 px-3 py-1.5">
                  <span class="font-medium">{{ lang.title }}</span>
                  <span class="text-gray-500 text-[10px] uppercase tracking-wider font-bold">{{ lang.level }}</span>
                </li>
              </ul>
            </section>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
