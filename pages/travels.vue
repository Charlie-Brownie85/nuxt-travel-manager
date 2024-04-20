<script setup lang="ts">
import type { Ref } from 'vue';

import type { Travel } from '~/declarations/common.types';
import { travelsHeaders } from '~/config/data-tables.config';

const travels: Ref<Array<Travel>> = ref([]);
const loading = ref(false);

async function fetchTravels() {
  loading.value = true;
  const { data } = await useFetch('/api/travels');
  if(data.value !== null) {
    travels.value = data.value.travels;
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
      <v-data-table
        :headers="travelsHeaders"
        :items="travels"
        :loading="loading"
      >
        <template #item.price="{ item }">
          <span>{{ item.price }} {{ item.currency }}</span> 
        </template>
        <template #item.rating="{ item }">
          <v-rating
            v-model="item.rating"
            color="warning"
            half-increments
            length="5"
            readonly
            size="20"
          />  
        </template>
        <template #item.actions="{ item }">
          <div class="flex gap-2">
            <button
              class="flex items-center gap-1 rounded-md px-2 py-1 bg-base-700 text-white"
              type="button"
            >
            <v-icon
              size="small"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <span>
              Edit
            </span>
            </button>
            <button
              class="flex items-center gap-1 rounded-md px-2 py-1 bg-state-error-500 text-white"
              type="button"
            >
            <v-icon
              size="small"
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
            <span>
              Delete
            </span>
            </button>
          </div>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<style lang="postcss" scoped>

</style>