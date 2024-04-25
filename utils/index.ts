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

export function generateRandomId(): number {
  return Math.floor(Math.random() * 9000) + 1000;
}

export function getScrollableParent(node: HTMLElement | null): HTMLElement | null {
  if (node === null) return null;
  if (node.scrollHeight > node.clientHeight) return node;
  return getScrollableParent(node.parentNode as HTMLElement);
}