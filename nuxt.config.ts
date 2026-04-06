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
      title: 'Celte - Server Meshing for Multiplayer Games',
      link: [
        { rel: 'icon', type: 'image/webp', href: '/celte-logo-white.png' },
        { rel: 'apple-touch-icon', href: '/celte-logo-white.png' }
      ],
      meta: [
        { name: 'description', content: 'Celte enables 10,000+ concurrent players on unlimited maps with 40% lower server costs through advanced server meshing technology.' }
      ]
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
