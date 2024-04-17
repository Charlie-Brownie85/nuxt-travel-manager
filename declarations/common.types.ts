export type Travel = {
  id: number,
  name: string,
  location?: string,
  startDate: string,
  endDate: string,
  description: string,
  image: string,
  price: number,
  currency: string,
  rating: number,
}

export type CustomerInfo = {
  name: string,
  email: string,
  phone: string,
  age: number,
  gender: string,
}

export type Payment = 'transfer' | 'paypal' | 'revolut';

export type Booking = {
  id: number,
  travelId: number,
  customerInfo: CustomerInfo,
  payment: Payment,
  notes?: string,
}
