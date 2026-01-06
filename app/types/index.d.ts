interface User {
  id: number
  name: string
  email: string
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
