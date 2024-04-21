<script setup lang="ts">
import type { Travel } from '~/declarations/common.types';
import { travelsHeaders } from '~/config/data-tables.config';

const travels: Ref<Array<Travel>> = ref([]);
const loading = ref(false);

async function fetchTravels() {
  loading.value = true;
  const { data } = await useFetch('/api/travels');
  
  if(data.value !== null) {
    travels.value = data.value as Travel[];
  }
  loading.value = false;
}

onBeforeMount(() => {
  fetchTravels();
});

function editItem(item: Travel) {
  console.log('Edit item', item);
}

function deleteItem(item: Travel) {
  console.log('Delete item', item);
}

</script>

<template>
  <div>
    <h1 class="mb-4 text-2xl font-bold">Travels</h1>
    <div>
      <WeTable
        :headers="travelsHeaders"
        :items="travels"
        :loading="loading"
        @edit-item="editItem"
        @delete-item="deleteItem"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>

</style>