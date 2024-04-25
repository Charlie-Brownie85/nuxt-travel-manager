import type { Travel } from '~/types/common.types';

export default defineEventHandler(async (event): Promise<Travel> => {

  const id = getRouterParam(event, 'id');
  const { travel } = await readBody(event);

  const updated: Travel = await $fetch(`http://localhost:3001/travels/${id}`, {
    method: 'PUT',
    body: travel,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return updated;
});