export function formatDate(dateString: string): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(2);

  return `${day}-${month}-${year}`;
}

export function formatCurrency(currency: string): string {
  const currencies: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
  };
  return currencies[currency] || currency;
}