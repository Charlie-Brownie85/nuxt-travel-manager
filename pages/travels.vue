<script setup lang="ts">
import type { Travel } from '~/declarations/common.types';
import { travelsHeaders } from '~/config/data-tables.config';

const travels: Ref<Array<Travel>> = ref([]);
const loading = ref(false);

async function fetchTravels() {
  loading.value = true;
  const fetchedTravels: Travel[] = await $fetch('/api/travels');
  
  if(fetchedTravels?.length) {
    travels.value = fetchedTravels;
  }
  loading.value = false;
}

onBeforeMount(() => {
  fetchTravels();
});

function editItem(item: Travel) {
  console.log('Edit item', item);
}

async function deleteTravel(item: Travel) {
  loading.value = true;

  const deleted = await $fetch(`/api/travels/${item.id}`, {
    method: 'DELETE',
  });

  if(deleted) {
    //refetch data
    fetchTravels();
  }

  loading.value = false;
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
        @delete-item="deleteTravel"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>

</style>