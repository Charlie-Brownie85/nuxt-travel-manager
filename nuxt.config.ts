// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'vuetify-nuxt-module',
    '@vueuse/nuxt',
  ],
  eslint: {
    config: {
      // stylistic: true,
    },
  },
  typescript: {
    typeCheck: true,
  },
  components: [{
    path: '~/components',
    pathPrefix: false,
  }]
});