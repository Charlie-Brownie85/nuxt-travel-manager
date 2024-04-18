// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
  eslint: {
    config: {
      // stylistic: true,
    },
  },
  typescript: {
    typeCheck: true,
  },
})
