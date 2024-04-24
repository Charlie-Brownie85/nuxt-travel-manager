import type { Travel } from '~/declarations/common.types';

export default defineEventHandler(async (event): Promise<Travel> => {

  const { travel } = await readBody(event);

  const created: Travel = await $fetch('http://localhost:3001/travels', {
    method: 'POST',
    body: travel,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return created;
});