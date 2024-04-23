export default defineEventHandler(async (event): Promise<boolean> => {

  const id = getRouterParam(event, 'id');

  const deleted = await $fetch(`http://localhost:3001/travels/${id}`, {
    method: 'DELETE'
  });

  return deleted ? true : false;
});