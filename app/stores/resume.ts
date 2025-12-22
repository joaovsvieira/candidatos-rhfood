export const useResumeStore = defineStore('resumeStore', {
  state: () => ({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    description: '',
    experiences: [] as Array<{
      id: string
      company: string
      role: string
      startDate: string
      endDate: string
      currentlyWorking: boolean
      description: string
    }>,
    activeExperienceId: null as string | null,
    educations: [] as Array<{
      id: string
      institution: string
      title: string
      studyArea: string
      startDate: string
      endDate: string
      description: string
    }>,
    activeEducationId: null as string | null,
    technicalSkills: [] as Array<{
      id: string
      title: string
      level: string
    }>,
    languages: [] as Array<{
      id: string
      title: string
      level: string
    }>
  }),
  actions: {
    async addExperience() {
      const experience = {
        id: crypto.randomUUID(),
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        description: ''
      }

      this.experiences.push(experience)
      this.activeExperienceId = experience.id
    },

    async removeExperience(id: string) {
      this.experiences = this.experiences.filter(exp => exp.id !== id)
    },

    async addEducation() {
      const education = {
        id: crypto.randomUUID(),
        institution: '',
        title: '',
        studyArea: '',
        startDate: '',
        endDate: '',
        description: ''
      }

      this.educations.push(education)
      this.activeEducationId = education.id
    },

    async removeEducation(id: string) {
      this.educations = this.educations.filter(edu => edu.id !== id)
    },

    async addTechnicalSkill() {
      const technicalSkill = {
        id: crypto.randomUUID(),
        title: '',
        level: 'Intermediário'
      }

      this.technicalSkills.push(technicalSkill)
    },

    async removeTechnicalSkill(id: string) {
      this.technicalSkills = this.technicalSkills.filter(skill => skill.id !== id)
    },

    async addLanguage() {
      const language = {
        id: crypto.randomUUID(),
        title: '',
        level: 'Intermediário'
      }

      this.languages.push(language)
    },

    async removeLanguage(id: string) {
      this.languages = this.languages.filter(lang => lang.id !== id)
    }
  }
})
