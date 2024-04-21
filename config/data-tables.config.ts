type customerSummary = {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
}

export const travelsHeaders = [
  { title: 'Travel name', key: 'name', sortable: true },
  { title: 'Picture', key: 'image', sortable: false },
  { title: 'Departure date', key: 'startDate', sortable: true },
  { title: 'Return date', key: 'endDate', sortable: true },
  { title: 'Price per person', key: 'price', sortable: true },
  { title: 'Rating', key: 'rating', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false }
];

export const bookingsHeaders = [
  { title: 'Travel name', key: 'travelName', sortable: true },
  { title: 'Customer Info', key: 'customerInfo', sortable: true, sort: (a: customerSummary, b: customerSummary) => a.lastName.localeCompare(b.lastName) },
  { title: 'Payment type', key: 'payment', sortable: true },
  { title: 'Notes', key: 'notes', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false }
];