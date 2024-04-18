import { bookings } from '~/__mocks__/mockData';

export default defineEventHandler(async () => {
  return {
    ...bookings,
  };
});