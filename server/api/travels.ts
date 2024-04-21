export default defineEventHandler(async () => {

  const travels = await $fetch('http://localhost:3001/travels');

  return travels;
});