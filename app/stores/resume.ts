export const useResumeStore = defineStore('resumeStore', {
  state: () => ({
    currentStep: 1,
    name: '',
    description: ''
  }),
  actions: {
    async nextStep() {
      this.currentStep += 1
    },

    async prevStep() {
      this.currentStep -= 1
    }
  }
})
