// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  eslint: {
    config: {
      stylistic: {
        semi: 'always',
        indent: ['error', 2],
        'arrow-parens': 'as-needed',
      }
    },
  },
})
