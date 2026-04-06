export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
  ],

  googleFonts: {
    families: {
      Onest: [300, 400, 500],
    },
    display: 'swap',
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
  },

  app: {
    baseURL: '/',
    buildAssetsDir: 'assets',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Celte — Dynamic Server Meshing',
      link: [
        { rel: 'icon', type: 'image/png', href: '/celte-logo-white.png' },
      ],
      meta: [
        {
          name: 'description',
          content:
            'Celte enables seamless multiplayer at any scale with dynamic server meshing. Built in Rust, available for Unity, C#, and any language via FFI.',
        },
      ],
    },
  },

  ssr: false,

  nitro: {
    preset: 'github-pages',
  },

  typescript: {
    strict: true,
  },

  compatibilityDate: '2024-04-03',
})
