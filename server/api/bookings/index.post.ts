import type { Booking } from '~/declarations/common.types';

export default defineEventHandler(async (event): Promise<Booking> => {

  const { booking } = await readBody(event);

  const created: Booking = await $fetch('http://localhost:3001/bookings', {
    method: 'POST',
    body: booking,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return created;
});