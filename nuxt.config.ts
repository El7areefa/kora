// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  alias: {
    // '@': path.resolve(__dirname, '/'),
    assets: '/<rootDir>/assets/',
  },

  css: [
     '@fortawesome/fontawesome-free/css/all.min.css',
    '~/assets/scss/main.scss'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  router: {
      middleware: ['auth']
  },

  ssr: false,
  modules: ['@nuxt/eslint'],
})