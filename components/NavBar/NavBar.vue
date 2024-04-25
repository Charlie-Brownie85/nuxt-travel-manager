<script setup lang="ts">
const { locale } = useI18n();

const locales = [
  { value: 'en', label: 'EN' },
  { value: 'es', label: 'ES' },
];

watch(locale, (newValue: string, oldValue: string) => {
  if (newValue === oldValue) return;
  localStorage.setItem('locale', newValue);
});
</script>

<template>
  <header class="shadow-sm bg-base-100">
    <nav class="container mx-auto flex justify-space-between items-center">
      <ul class="flex gap-4">
        <li>
          <NuxtLink to="/travels" class="block px-2 py-4 font-bold text-base-800 hover:bg-base-300 hover:text-primary-200">Travels</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/bookings" class="block px-2 py-4 font-bold text-base-800 hover:bg-base-300 hover:text-primary-200">Bookings</NuxtLink>
        </li>
      </ul>
      <SelectComponent
        v-model="locale"
        :options="locales"
        class="w-20"
      />
    </nav>
  </header>
</template>

<style lang="postcss" scoped>
.router-link-exact-active {
  @apply text-primary-300;
}
</style>