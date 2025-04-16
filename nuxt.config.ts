// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', 'nuxt-module-hotjar', '@nuxtjs/tailwindcss'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: true
  },

  //@ts-ignore
  i18n: {
    locales: [
      {
        code: 'fr',
        file: 'fr.json'
      },
      {
        code: 'en',
        file: 'en.json'
      }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false
  },

  app: {
    baseURL: '/',
    buildAssetsDir: 'assets',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  experimental: {
    payloadExtraction: false
  },

  ssr: false,

  nitro: {
    preset: 'github-pages'
  },

  typescript: {
    strict: true
  },

  compatibilityDate: '2024-04-03'
});