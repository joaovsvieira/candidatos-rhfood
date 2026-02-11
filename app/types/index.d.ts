interface User {
  id: number
  name: string
  email: string
  date_of_birth: string
  contact_phone: string
  pwd: string[]
  address_zipcode: string
  address_state: string
  address_city: string
  address_district: string
  address_street: string
  curriculum_url: string
  avatar_url: string
  resume?: Resume
  created_at: string
  updated_at: string
}

interface Resume {
  id: string
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
  description: string
  experiences?: Experience[]
  educations?: Education[]
  technical_skills?: Skill[]
  languages?: Language[]
  created_at: string
  updated_at: string
}

interface Experience {
  id: string
  company: string
  role: string
  start_date: string
  end_date?: string
  currently_working: boolean
  description: string
  created_at: string
  updated_at: string
}

interface Education {
  id: string
  institution: string
  title: string
  study_area: string
  start_date: string
  end_date: string
  description: string
  created_at: string
  updated_at: string
}

interface Skill {
  id: string
  title: string
  level: string
  created_at: string
  updated_at: string
}

interface Language {
  id: string
  title: string
  level: string
  created_at: string
  updated_at: string
}

interface Vacancy {
  id: string
  company_id: string
  company_name: string
  company_logo: string
  title: string
  role_id: string
  role_name: string
  category_id: string
  category_name: string
  address_zipcode: string
  address_state: string
  address_city: string
  address_district: string
  address_street: string
  modality: string
  description: string
  requirements: string
  benefits: string
  remuneration_salary: string
  remuneration_comission: string
  remuneration_frequency: string
  remuneration_type: string
  level_of_experience: string
  minimum_training: string
  pwd: string
  show_company: number
  show_address: number
  expires_at: string
  created_at: string
  updated_at: string
}

interface Candidate {
  id: string
  status: string
  reason_for_disqualification: string
  created_at: string
  vacancy: Vacancy
}
