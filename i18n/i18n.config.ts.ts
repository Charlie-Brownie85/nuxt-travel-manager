import projectLocales from '@/locales';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: projectLocales,
}));
