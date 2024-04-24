// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'vuetify-nuxt-module',
    '@vueuse/nuxt',
    '@vee-validate/nuxt',
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
  }],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
    },
  },
});