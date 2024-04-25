<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number,
    message: string,
  }
}>();

function handleClearError() {
  clearError({ redirect: '/travels' });
}
</script>

<template>
  <div class="mt-[15%] max-w-sm mx-auto text-center">
    <h1 class="text-6xl font-bold font-body mb-4">{{ error.statusCode }}</h1>
    <p class="text-4xl font-bold font-body mb-4">{{ $t('Ooooops!') }}</p>
    <p class="text-md font-body mb-10">{{ error.message }}</p>
    <button
      class="btn btn--primary--outline mx-auto"
      @click="handleClearError"
    >{{ $t('Go back to travels') }}</button>
  </div>
</template>

<style lang="postcss" scoped>
@import url('~/assets/css/buttons.css');
</style>