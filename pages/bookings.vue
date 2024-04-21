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

const bookings: Ref<Array<BookingSummary>> = ref([]);
const loading = ref(false);

async function fetchBookings() {
  loading.value = true;
  const { data } = await useFetch('/api/bookings', {
    transform: (bookingsData: BookingData[]) => bookingsData.map(booking => {
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
  
  if(data.value !== null) {
    bookings.value = data.value as BookingSummary[];
  }
  loading.value = false;
}

onBeforeMount(() => {
  fetchBookings();
});

function editItem(item: BookingSummary) {
  console.log('Edit item', item);
}

function deleteItem(item: BookingSummary) {
  console.log('Delete item', item);
}
</script>

<template>
  <div>
    <h1 class="mb-4 text-2xl font-bold">Bookings</h1>
    <div>
      <WeTable
        :headers="bookingsHeaders"
        :items="bookings"
        :loading="loading"
        @edit-item="editItem"
        @delete-item="deleteItem"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>

</style>