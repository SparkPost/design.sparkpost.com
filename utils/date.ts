import { format } from 'date-fns';

export function formatDate(str: string): string {
  const date = new Date(str);
  return format(date, 'MMM d, yyyy');
}
