export const travelSchema = {
  name: 'required',
  description: '',
  location: '',
  price: 'required|numeric',
  startDate: 'required|date',
  endDate: 'required|date',
  image: 'required|path',
  rating: 'required|between:1,5',
};

export const customerInfoSchema = {
  firstName: 'required',
  lastName: 'required',
  email: 'required|email',
  phone: 'required|phone',
  age: '',
  gender: '',
};