import type { Travel } from '~/types/common.types';

export default defineEventHandler(async () => {

  const travels: Travel[] = await $fetch('http://localhost:3001/travels');

  return travels;
});