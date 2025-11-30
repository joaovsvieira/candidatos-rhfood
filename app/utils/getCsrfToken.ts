import { useCookie } from '#app'

const config = useRuntimeConfig()
const API_BASE = config.public.apiBaseUrl

export async function getCsrfToken(): Promise<string | null | undefined> {
  await $fetch(`${API_BASE}/sanctum/csrf-cookie`, {
    method: 'GET',
    credentials: 'include'
  })

  const xsrfCookie = useCookie('XSRF-TOKEN')

  return xsrfCookie.value
}
