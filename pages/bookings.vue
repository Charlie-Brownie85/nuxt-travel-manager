<script setup lang="ts">

const { data: bookings } = await useFetch('/api/bookings');

</script>

<template>
  <div>
    <h1 class="mb-4">Bookings</h1>
    <div>
      {{ bookings }}
    </div>
  </div>
</template>

<style lang="postcss" scoped>

</style>