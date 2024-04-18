<script setup lang="ts">

const { data: travels } = await useFetch('/api/travels');

</script>

<template>
  <div>
    <h1 class="mb-4">Travels</h1>
    <div>
      {{ travels }}
    </div>
  </div>
</template>

<style lang="postcss" scoped>

</style>