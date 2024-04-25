<script setup lang="ts">
import type { Booking, Travel, CustomerInfo } from '~/declarations/common.types';

import { generateRandomId } from '~/utils';
import { customerInfoSchema } from '~/config/validation-rules';

// type TravelOption = Pick<Travel, 'id' | 'name'>;

const emit = defineEmits(['createBooking']);

const { t } = useI18n();

const userForm = ref();

const isFormValid = computed(() => userForm.value?.getMeta().valid);

const isOpen = defineModel<boolean>({ default: true });


// Select options
const genderOptions = [
  { value: 'female', label: t('female') },
  { value: 'male', label: t('male') },
  { value: 'Non-binary/non-conforming', label: t('Non-binary/non-conforming') },
  { value: 'Prefer not to say', label: t('Prefer not to say') },
];
const ageOptions = Array.from({ length: 100 - 18 + 1 }, (_, i) => i + 18).map(age => ({ value: age, label: age.toString() }));
const paymentOptions = [
  { value: 'transfer', label: t('Bank transfer') },
  { value: 'paypal', label: t('Paypal') },
  { value: 'revolut', label: t('Revolut') },
];
// const { data: travelOptions } = useFetch<Array<Travel>>('/api/travels', {
//   transform: (travelData: TravelOption[]) => travelData.map(travel => {
//     const { id, name } = travel;
//     return { value: id, label: name};
//   }),
// });
const travels = await $fetch('/api/travels');
const travelOptions = computed(() => travels?.map((travel: Travel) => {
  const { id, name } = travel;
  return { value: id, label: name};
}) || []);

const userFieldLabels = computed(() => ({
  firstName: t('First name'),
  lastName: t('Last Name'),
  email: t('Email'),
  phone: t('Phone number'),
  age: t('Age'),
  gender: t('Gender'),
}));

const formFields = Object.keys(userFieldLabels.value) as Array<keyof CustomerInfo>;

const userFormData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  age: ageOptions[0].value,
  gender: genderOptions[0].value,
} as CustomerInfo);

const bookingData = reactive({
  id: generateRandomId(),
  travelId: (travelOptions?.value?.[0]?.value ?? 0) as number,
  customerInfo: userFormData,
  payment: paymentOptions[0].value,
  notes: '',
} as Booking);

function submitForm() {
  emit('createBooking', bookingData);
  isOpen.value = false;
}
</script>

<template>
  <WeModal v-model="isOpen">
    <template #content>
      <h1 class="mb-4 text-2xl font-bold">{{ $t('New booking') }}</h1>
      <VeeForm ref="userForm" :validation-schema="customerInfoSchema">
        <div class="grid grid-cols-2 gap-4">
          <div v-for="entry in formFields" :key="entry">
            <label :for="entry" class="block text-sm font-medium text-gray-700">
              {{ userFieldLabels[entry] as unknown }}
            </label>
            <VeeField
              v-if="entry !== 'age' && entry !== 'gender'"
              :id="entry"
              v-model="userFormData[entry]"
              :name="entry"
              type="text"
              class="mt-1 block w-full px-3 py-2 border border-base-500 rounded-md shadow-sm focus:outline-none focus:ring-state-info-700 focus:border-state-info-500 sm:text-sm"
            />
            <SelectComponent
              v-else-if="entry === 'age'"
              id="age"
              v-model="userFormData.age"
              name="age"
              :options="ageOptions"
              class="w-full"
            />
            <SelectComponent
              v-else
              id="gender"
              v-model="userFormData.gender"
              name="gender"
              :options="genderOptions"
              class="w-full"
            />
            <ErrorMessage v-if="entry !== 'age' && entry !== 'gender'" :name="entry" class="text-primary-300" />
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
          <span>{{ $t('Create booking') }}</span>
        </button>
      </div>
    </template>
  </WeModal>
</template>

<style lang="postcss" scoped>
@import url('~/assets/css/buttons.css');
</style>