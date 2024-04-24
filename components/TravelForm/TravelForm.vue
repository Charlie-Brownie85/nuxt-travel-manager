<script setup lang="ts">
import type { Travel } from '~/declarations/common.types';

import { formatCurrency, generateRandomId } from '~/utils';
import { travelSchema } from '~/config/validation-rules';

export interface Props {
  travel?: Travel,
}

type EditableTravel = Omit<Travel, 'id' | 'currency'>;

const emit = defineEmits(['updateTravel', 'createTravel']);

const props = defineProps<Props>();

const form = ref();

const isFormValid = computed(() => form.value?.getMeta().valid);

const isOpen = defineModel<boolean>({ default: true });

const isEditing = computed(() => !!props.travel);

const formData = reactive(props.travel || {
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

const formFields: Array<keyof EditableTravel> = Object.keys(formData).filter(field => field !== 'id' && field !== 'currency') as Array<keyof EditableTravel>;

const fieldLabels = {
  name: 'Name',
  description: 'Description',
  location: 'Location (optional)',
  price: `Price in ${formatCurrency(formData.currency)}`,
  startDate: 'Start Date',
  endDate: 'End Date',
  image: 'Image',
  rating: 'Rating',
};

function submitForm() {
  if(isEditing.value) {
    emit('updateTravel', formData);
  } else {
    emit('createTravel', formData);
  }
  isOpen.value = false;
}

watch(() => props.travel, (value) => {
  if(value) {
    Object.assign(formData, value);
  } else {
    // reset the formData object
    Object.assign(formData, {
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
      <h1 class="mb-4 text-2xl font-bold">{{ isEditing ? $t('Edit travel') : $t('New travel') }}</h1>
      <VeeForm ref="form" :validation-schema="travelSchema">
        <div class="grid grid-cols-2 gap-4">
          <div v-for="entry in formFields" :key="entry">
            <label :for="entry" class="block text-sm font-medium text-gray-700">
              {{ $t(fieldLabels[entry]) as unknown }}
            </label>
            <VeeField
              :id="entry"
              v-model="formData[entry]"
              :name="entry"
              :type="entry === 'price' || entry === 'rating' ? 'number' : 'text'"
              :min="entry === 'price' || entry === 'rating' ? 0 : undefined"
              :max="entry === 'rating' ? 5 : undefined"
              :step="entry === 'rating' ? 0.5 : undefined"
              class="mt-1 block w-full px-3 py-2 border border-base-500 rounded-md shadow-sm focus:outline-none focus:ring-state-info-700 focus:border-state-info-500 sm:text-sm"
            />
            <ErrorMessage :name="entry" class="text-primary-300" />
          </div>
        </div>
      </VeeForm>
    </template>
    <template #actions="{ close }">
      <div class="flex gap-2">
        <button
          class="btn btn--secondary--outline"
          type="button"
          @click="close()"
        >
          <span>{{ $t('Cancel') }}</span>
        </button>
        <button
          class="btn btn--primary"
          type="button"
          :disabled="!isFormValid"
          @click="submitForm"
        >
          <span>{{ isEditing ? $t('Edit travel') : $t('Create travel') }}</span>
        </button>
      </div>
    </template>
  </WeModal>
</template>

<style lang="postcss" scoped>
@import url('~/assets/css/buttons.css');
</style>