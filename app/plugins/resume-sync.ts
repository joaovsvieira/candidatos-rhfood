import { useResumeStore } from '~/stores/resume'

export default defineNuxtPlugin(() => {
  const user = useSanctumUser<User>()
  const store = useResumeStore()

  const syncResumeData = (userData: User) => {
    if (!userData.resume) return

    const experiences = userData.resume.experiences
      ? userData.resume.experiences.map((experience) => {
          return {
            id: experience.id,
            company: experience.company,
            role: experience.role,
            startDate: experience.start_date,
            endDate: experience.end_date,
            currentlyWorking: experience.currently_working ? true : false,
            description: experience.description
          }
        })
      : []

    const educations = userData.resume.educations
      ? userData.resume.educations.map((education) => {
          return {
            id: education.id,
            institution: education.institution,
            title: education.title,
            studyArea: education.study_area,
            startDate: education.start_date,
            endDate: education.end_date,
            description: education.description
          }
        })
      : []

    store.$patch({
      name: userData.resume.name || '',
      email: userData.resume.email || '',
      phone: userData.resume.phone || '',
      location: userData.resume.location || '',
      linkedin: userData.resume.linkedin || '',
      website: userData.resume.website || '',
      description: userData.resume.description || '',
      experiences: experiences,
      educations: educations,
      technicalSkills: userData.resume.technical_skills || [],
      languages: userData.resume.languages || []
    })
  }

  if (user.value) {
    syncResumeData(user.value)
  }

  watch(user, (newUser) => {
    if (newUser) {
      syncResumeData(newUser)
    }
  }, { deep: true })
})
