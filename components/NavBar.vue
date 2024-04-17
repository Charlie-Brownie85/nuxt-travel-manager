<script setup lang="ts">

</script>

<template>
  <header class="shadow-sm bg-base-100">
    <nav class="container mx-auto">
      <ul class="flex gap-4">
        <li>
          <NuxtLink to="/" class="block px-2 py-4 font-bold text-base-800 hover:bg-base-300">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/travels" class="block px-2 py-4 font-bold text-base-800 hover:bg-base-300">Travels</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/bookings" class="block px-2 py-4 font-bold text-base-800 hover:bg-base-300">Bookings</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="postcss" scoped>
.router-link-exact-active {
  @apply text-state-info-500;
}
</style>