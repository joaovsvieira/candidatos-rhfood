// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line nuxt/nuxt-config-keys-order
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'nuxt-auth-sanctum'
  ],

  devtools: {
    enabled: true
  },

  sanctum: {
    mode: 'cookie',
    userStateKey: 'sanctum.user.identity',
    redirectIfAuthenticated: true,
    redirectIfUnauthenticated: true,
    endpoints: {
      csrf: '/sanctum/csrf-cookie',
      login: '/api/login',
      logout: '/api/logout',
      user: '/api/user'
    },
    csrf: {
      cookie: 'XSRF-TOKEN',
      header: 'X-XSRF-TOKEN'
    },
    client: {
      retry: false,
      initialRequest: true
    },
    redirect: {
      keepRequestedRoute: true,
      onLogin: '/my-account',
      onLogout: '/',
      onAuthOnly: '/login',
      onGuestOnly: '/'
    }
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_SANCTUM_BASE_URL
    }
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
