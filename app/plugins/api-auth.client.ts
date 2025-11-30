import { useCookie } from '#app'
import type { NitroFetchOptions } from 'nitropack'

export default defineNuxtPlugin(() => {
  const token = useCookie('XSRF-TOKEN').value

  const globalOptions: NitroFetchOptions<any, any> = {}

  globalOptions.onRequest = ({ options }) => {
    if (token && options.method && options.method !== 'GET') {
      options.headers = {
        ...(options.headers as Record<string, string> || {}),
        'X-XSRF-TOKEN': token
      }
    }
  }

  globalThis.$fetch = $fetch.create(globalOptions)
})
