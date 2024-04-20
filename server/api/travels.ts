import { travels } from '~/__mocks__/mockData';

export default defineEventHandler(async () => {
  return {
    travels,
  };
});