import type { Booking, Travel } from '~/declarations/common.types';

export default defineEventHandler(async () => {

  const bookings = await $fetch('http://localhost:3001/bookings');
  const travels = await $fetch('http://localhost:3001/travels');

  const curatedBookings = (bookings as Booking[]).map((booking: Booking) => {
    const { id, customerInfo, payment, notes, travelId } = booking;
    const travel = (travels as Travel[])?.find((item: Travel) => Number(item.id) === Number(travelId));

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