<script setup lang="ts">
import type { Travel } from '~/declarations/common.types';
import { travelsHeaders } from '~/config/data-tables.config';

const travels: Ref<Array<Travel>> = ref([]);
const loading = ref(false);
const showTravelModal = ref(false);
const selectedTravel = ref<Travel | undefined>(undefined);

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
  selectedTravel.value = item;
  showTravelModal.value = true;
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

async function updateTravel(travel: Travel) {
  loading.value = true;

  const updated = await $fetch(`/api/travels/${travel.id}`, {
    method: 'PUT',
    body: { travel: JSON.stringify(travel) },
  });

  if(updated) {
    //refetch data after update
    fetchTravels();
  }
  
  showTravelModal.value = false;
  loading.value = false;
}

async function createTravel(travel: Travel) {
  loading.value = true;

  const created = await $fetch(`/api/travels`, {
    method: 'POST',
    body: { travel: JSON.stringify(travel) },
  });

  if(created) {
    //refetch data after update
    fetchTravels();
  }
  
  showTravelModal.value = false;
  loading.value = false;
}

watch(showTravelModal, (newValue, oldValue) => {
  if(!newValue && oldValue) {
    selectedTravel.value = undefined;
  }
});

</script>

<template>
  <div>
    <h1 class="mb-4 text-2xl font-bold">Travels</h1>
    <div class="container mx-auto">
      <div>
        <button type="button" class="add-btn" @click="showTravelModal = true">
          <v-icon size="small">mdi-plus</v-icon>
        </button>
      </div>
      <WeTable
        :headers="travelsHeaders"
        :items="travels"
        :loading="loading"
        @edit-item="editItem"
        @delete-item="deleteTravel"
      />
    </div>
    <TravelForm
      v-model="showTravelModal"
      :travel="selectedTravel"
      @update-travel="updateTravel"
      @create-travel="createTravel"
    />
  </div>
</template>

<style lang="postcss" scoped>
.add-btn {
  @apply cursor-pointer bg-base-400 hover:bg-base-500;
  @apply flex justify-center items-center p-2 rounded-full min-w-8 min-h-8;
  transition: background-color 0.3s ease;
}
</style>