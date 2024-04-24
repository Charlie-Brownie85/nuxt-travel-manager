export const travelSchema = {
  name: 'required',
  description: '',
  location: '',
  price: 'required|numeric',
  startDate: 'required|date',
  endDate: 'required|date',
  image: 'required|path',
  rating: 'required|rating',
};