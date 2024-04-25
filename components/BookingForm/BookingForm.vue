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

const wizzardStep = ref(1);


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
      <div class="h-[30vh] relative">
        <div v-if="wizzardStep === 1" class="absolute top-0 left-0 w-full">
          <label for="travel" class="block text-md font-medium text-gray-700 font-body mb-3">
            {{ $t('Select travel') }}
          </label>
          <SelectComponent
            id="travel"
            v-model="bookingData.travelId"
            name="travel"
            :options="travelOptions"
            class="w-full font-body"
          />
        </div>
        <div v-else-if="wizzardStep === 2" class="absolute top-0 left-0 w-full">
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
        </div>
        <div v-else class="absolute top-0 left-0 w-full">
          <div>
            <label for="payment" class="block text-sm font-medium text-gray-700">
              {{ $t('Select payment method') }}
            </label>
            <SelectComponent
              id="payment"
              v-model="bookingData.payment"
              name="payment"
              :options="paymentOptions"
              class="w-full"
            />
            <label for="notes" class="block text-sm font-medium text-gray-700">
              {{ $t('Notes') }}
            </label>
            <textarea
              id="notes"
              v-model="bookingData.notes"
              name="notes"
              rows="3"
              class="mt-1 block w-full px-3 py-2 border border-base-500 rounded-md shadow-sm focus:outline-none focus:ring-state-info-700 focus:border-state-info-500 sm:text-sm max-h-52"
            />
          </div>
        </div>
      </div>
    </template>
    <template #actions="{ close }">
      <div class="flex justify-between w-full">
        <button
          class="btn btn--secondary--outline"
          type="button"
          @click="close()"
        >
          <span>{{ $t('Cancel') }}</span>
        </button>
        <div class="flex gap-2">
          <button
            v-if="wizzardStep > 1"
            class="btn btn--secondary"
            type="button"
            @click="wizzardStep = wizzardStep - 1"
          >
            <span>{{ $t('Prev') }}</span>
          </button>
          <button
            v-if="wizzardStep < 3"
            class="btn btn--secondary"
            type="button"
            :disabled="wizzardStep === 2 && !isFormValid"
            @click="wizzardStep = wizzardStep + 1"
          >
            <span>{{ $t('Next') }}</span>
          </button>
          <button
            v-if="wizzardStep === 3"
            class="btn btn--primary"
            type="button"
            @click="submitForm()"
          >
            <span>{{ $t('Create booking') }}</span>
          </button>
        </div>
      </div>
    </template>
  </WeModal>
</template>

<style lang="postcss" scoped>
@import url('~/assets/css/buttons.css');
</style>