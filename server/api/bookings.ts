import type { Booking, Travel } from '~/declarations/common.types';

export default defineEventHandler(async () => {

  const bookings: Booking[] = await $fetch('http://localhost:3001/bookings');
  const travels: Travel[] = await $fetch('http://localhost:3001/travels');

  const curatedBookings = bookings.map((booking: Booking) => {
    const { id, customerInfo, payment, notes, travelId } = booking;
    const travel = travels?.find((item: Travel) => Number(item.id) === Number(travelId));

    return {
      id,
      travelName: travel?.name ?? 'unknown travel',
      customerInfo,
      payment,
      notes: notes ?? '',
    };
  });

  return curatedBookings;
});