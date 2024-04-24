<script setup lang="ts">
import type { Travel } from '~/declarations/common.types';

import { formatCurrency, generateRandomId } from '~/utils';

export interface Props {
  travel?: Travel,
}

type EditableTravel = Omit<Travel, 'id' | 'currency'>;

const emit = defineEmits(['updateTravel', 'createTravel']);

const props = defineProps<Props>();

const isOpen = defineModel<boolean>({ default: true });

const isEditing = computed(() => !!props.travel);

const editedTravel = reactive(props.travel || {
  id: generateRandomId(),
  name: '',
  description: '',
  location: '',
  price: 699,
  currency: 'EUR',
  startDate: '',
  endDate: '',
  image: '',
  rating: 3,
} as Travel);

const formFields: Array<keyof EditableTravel> = Object.keys(editedTravel).filter(field => field !== 'id' && field !== 'currency') as Array<keyof EditableTravel>;

const fieldLabels = {
  name: 'Name',
  description: 'Description',
  location: 'Location (optional)',
  price: `Price in ${formatCurrency(editedTravel.currency)}`,
  startDate: 'Start Date',
  endDate: 'End Date',
  image: 'Image',
  rating: 'Rating',
};

function submitForm() {
  if(isEditing.value) {
    emit('updateTravel', editedTravel);
  } else {
    emit('createTravel', editedTravel);
  }
  isOpen.value = false;
}

watch(() => props.travel, (value) => {
  if(value) {
    Object.assign(editedTravel, value);
  } else {
    // reset the editedTravel object
    Object.assign(editedTravel, {
      id: generateRandomId(),
      name: '',
      description: '',
      location: '',
      price: 699,
      currency: 'EUR',
      startDate: '',
      endDate: '',
      image: '',
      rating: 3,
    });
  }
});
</script>

<template>
  <WeModal v-model="isOpen">
    <template #content>
      <h1 class="mb-4 text-2xl font-bold">{{ isEditing ? 'Edit' : 'New' }} Travel</h1>
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-2 gap-4">
          <div v-for="field in formFields" :key="field">
            <label :for="field" class="block text-sm font-medium text-gray-700">
              {{ fieldLabels[field] as unknown }}
            </label>
            <input
              :id="field"
              v-model="editedTravel[field]"
              :type="field === 'price' || field === 'rating' ? 'number' : 'text'"
              :name="field"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
          </div>
        </div>
      </form>
    </template>
    <template #actions="{ close }">
      <div class="flex gap-2">
        <button
          class="btn btn--secondary--outline"
          type="button"
          @click="close()"
        >
          <span>Cancel</span>
        </button>
        <button
          class="btn btn--primary"
          type="button"
          @click="submitForm"
        >
          <span>{{ isEditing ? 'Edit travel' : 'Create travel' }}</span>
        </button>
      </div>
    </template>
  </WeModal>
</template>

<style lang="postcss" scoped>
@import url('~/assets/css/buttons.css');
</style>