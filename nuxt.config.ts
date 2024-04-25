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
    '@nuxtjs/i18n',
    'nuxt-lodash',
  ],
  app: {
    head: {
      title: 'WeRoad',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Group travel and adventure holidays on the road' },
      ],
    },
  },
  routeRules: {
    '/': { redirect: '/travels' },
  },
  i18n: {
    vueI18n: '@/i18n/i18n.config.ts',
  },
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