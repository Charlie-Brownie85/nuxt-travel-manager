<script setup lang="ts">
import type { Booking } from '~/declarations/common.types';
import { bookingsHeaders } from '~/config/data-tables.config';

interface BookingData extends Omit<Booking, 'travelId'> {
  travelName: string;
}

interface BookingSummary extends Omit<BookingData, 'customerInfo'> {
  customerInfo: {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
  }
}

useHead({
  title: 'WeRoad | Bookings',
  meta: [
    {
      name: 'description',
      content: 'Bookings page',
    },
  ],
});

const loading = ref(false);

const { data: bookings, pending, refresh } = useFetch<Array<BookingSummary>>('/api/bookings', {
  transform: (bookingsData: BookingSummary[]) => bookingsData.map(booking => {
    const { customerInfo: { firstName, lastName, email, phone } } = booking;
    return {
      ...booking,
      customerInfo: {
        firstName,
        lastName,
        email,
        phone,
      },
    };
  }),

});

async function deleteBooking(item: Booking) {
  loading.value = true;

  const deleted = await $fetch(`/api/bookings/${item.id}`, {
    method: 'DELETE',
  });

  if(deleted) {
    //refetch data after deletion
    refresh();
  }

  loading.value = false;
}
</script>

<template>
  <div class="container mx-auto">
    <h1 class="mb-8 text-3xl font-bold">{{ $t('Bookings') }}</h1>
    <div>
      <div class="mb-3 flex items-center gap-4">
        <button type="button" class="add-btn" @click="() => console.log('Create a booking')">
          <v-icon size="small">mdi-plus</v-icon>
        </button>
        <span class="text-base font-bold">{{ $t('Add new booking') }}</span>
      </div>
      <WeTable
        :headers="bookingsHeaders"
        :items="bookings || []"
        :loading="loading || pending"
        :can-edit-item="false"
        @delete-item="deleteBooking"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.add-btn {
  @apply cursor-pointer bg-base-400 hover:bg-primary-300 text-base-800 hover:text-white;
  @apply flex justify-center items-center p-2 rounded-full min-w-8 min-h-8;
  transition: background-color 0.3s ease;
}
</style>