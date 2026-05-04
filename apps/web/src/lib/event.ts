import type { AccountabilityEvent, AccountabilityEventType } from '@politracks/db';

export const eventTypes = ['vote', 'statement', 'donation', 'promise', 'missed_vote'] as const;

export type { AccountabilityEventType };

export interface AccountabilityEventInput {
  id: number;
  type: AccountabilityEventType;
  title: string;
  date: string;
  description: string;
  sourceUrl: string;
  politicianId: number;
}

export interface AccountabilityEventDisplay extends AccountabilityEventInput {
  typeLabel: string;
}

export function sortEventsByDate<T extends { date: string }>(events: T[]): T[] {
  return [...events].sort((first, second) => {
    return new Date(second.date).getTime() - new Date(first.date).getTime();
  });
}

export function formatEventType(type: AccountabilityEventType): string {
  const labels: Record<AccountabilityEventType, string> = {
    vote: 'Vote',
    statement: 'Statement',
    donation: 'Donation',
    promise: 'Promise',
    missed_vote: 'Missed Vote',
  };

  return labels[type];
}

export function formatEventDisplay(event: AccountabilityEventInput): AccountabilityEventDisplay {
  return {
    ...event,
    typeLabel: formatEventType(event.type),
  };
}

export function formatDbEvent(event: AccountabilityEvent): AccountabilityEventDisplay {
  return formatEventDisplay({
    id: event.id,
    type: event.type,
    title: event.title,
    date: event.date,
    description: event.description,
    sourceUrl: event.sourceUrl,
    politicianId: event.politicianId,
  });
}
