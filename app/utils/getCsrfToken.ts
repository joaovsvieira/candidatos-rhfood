import { useCookie } from '#app'

export async function getCsrfToken(): Promise<string | null | undefined> {
  const config = useRuntimeConfig()
  const API_BASE = config.public.apiBaseUrl

  await $fetch(`${API_BASE}/sanctum/csrf-cookie`, {
    method: 'GET',
    credentials: 'include'
  })

  const xsrfCookie = useCookie('XSRF-TOKEN')

  return xsrfCookie.value
}
