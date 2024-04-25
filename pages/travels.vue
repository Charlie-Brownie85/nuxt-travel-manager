<script setup lang="ts">
import type { Travel } from '~/types/common.types';
import { travelsHeaders } from '~/config/data-tables.config';

const loading = ref(false);
const showTravelModal = ref(false);
const selectedTravel = ref<Travel | undefined>(undefined);

useHead({
  title: 'WeRoad | Travels',
  meta: [
    {
      name: 'description',
      content: 'Travels page',
    },
  ],
});

const { data: travels, pending, refresh } = useFetch<Array<Travel>>('/api/travels');

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
    //refetch data after deletion
    refresh();
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
    refresh();
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
    //refetch data after creation
    refresh();
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
  <div class="container mx-auto">
    <h1 class="mb-8 text-3xl font-bold">{{ $t('Travels') }}</h1>
    <div>
      <div class="mb-3 flex items-center gap-4">
        <button type="button" class="add-btn" @click="showTravelModal = true">
          <v-icon size="small">mdi-plus</v-icon>
        </button>
        <span class="text-base font-bold">{{ $t('Add new travel') }}</span>
      </div>
      <WeTable
        :headers="travelsHeaders"
        :items="travels || []"
        :loading="loading || pending"
        :enable-search="true"
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
  @apply cursor-pointer bg-base-400 hover:bg-primary-300 text-base-800 hover:text-white;
  @apply flex justify-center items-center p-2 rounded-full min-w-8 min-h-8;
  transition: background-color 0.3s ease;
}
</style>