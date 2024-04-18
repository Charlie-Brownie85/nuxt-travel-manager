import type {
  Travel,
  Booking,
} from '~/declarations/common.types';

export const travels: Array<Travel> = [
  {
    id: 1,
    name: 'Rome in 5 days',
    location: 'Italy',
    startDate: '2024-05-21',
    endDate: '2024-05-27',
    description: 'Discover the beauty of Rome in 5 days. Visit the Colosseum, the Vatican, the Pantheon and much more.',
    image: 'rome.jpg',
    price: 680,
    currency: 'EUR',
    rating: 5
  },
  {
    id: 2,
    name: 'Weekend in Paris',
    location: 'France',
    startDate: '2024-06-21',
    endDate: '2024-06-24',
    description: 'Experience the romantic Paris in a weekend. Visit the Eiffel Tower, the Louvre, the Champs-Élysées and much more.',
    image: 'paris.jpg',
    price: 1000,
    currency: 'EUR',
    rating: 5
  },
  {
    id: 3,
    name: 'Perú 360º',
    location: 'Perú',
    startDate: '2024-11-01',
    endDate: '2024-11-17',
    description: 'Discover the beauty of Perú in 17 days. Visit Machu Picchu, the Nazca Lines, the Amazon Rainforest and much more.',
    image: 'peru.jpg',
    price: 2200,
    currency: 'EUR',
    rating: 4
  },
  {
    id: 4,
    name: 'New York, New York!',
    location: 'United States',
    startDate: '2024-10-15',
    endDate: '2024-10-21',
    description: 'Dive in the authentic american experience in New York in 7 days. Visit the Statue of Liberty, Central Park, Times Square and much more.',
    image: 'new-york.jpg',
    price: 1500,
    currency: 'EUR',
    rating: 3
  }
];

export const bookings: Array<Booking> = [
  {
    id: 1,
    travelId: 3,
    customerInfo: {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '+1234567890',
      age: 30,
      gender: 'male',
    },
    payment: 'transfer',
    notes: 'I need a gluten-free breakfast',
  },
  {
    id: 2,
    travelId: 1,
    customerInfo: {
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      phone: '+0987654321',
      age: 27,
      gender: 'female',
    },
    payment: 'revolut',
  },
  {
    id: 3,
    travelId: 2,
    customerInfo: {
      name: 'Alice Smith',
      email: 'alicesmith@mail.com',
      phone: '+5432167890',
      age: 36,
      gender: 'female',
    },
    payment: 'paypal',
    notes: 'I\'d love a room with a view',
  },
];

