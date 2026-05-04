import { describe, it, expect } from 'vitest';
import {
  eventTypes,
  formatEventDisplay,
  formatEventType,
  sortEventsByDate,
  type AccountabilityEventInput,
} from '../../src/lib/event';

describe('Accountability events', () => {
  it('should sort events by date in reverse chronological order', () => {
    const events = [
      { id: 1, title: 'January Vote', date: '2026-01-10' },
      { id: 2, title: 'March Statement', date: '2026-03-15' },
      { id: 3, title: 'February Donation', date: '2026-02-10' },
    ];

    const sorted = sortEventsByDate(events);

    expect(sorted.map((event) => event.date)).toEqual(['2026-03-15', '2026-02-10', '2026-01-10']);
  });

  it('should not mutate the original event order when sorting', () => {
    const events = [
      { id: 1, title: 'Older Event', date: '2026-01-10' },
      { id: 2, title: 'Newer Event', date: '2026-03-15' },
    ];

    const sorted = sortEventsByDate(events);

    expect(sorted[0].id).toBe(2);
    expect(events[0].id).toBe(1);
  });

  it('should format event display with all required fields', () => {
    const event: AccountabilityEventInput = {
      id: 1,
      type: 'vote',
      title: 'Healthcare Bill Vote',
      date: '2026-03-15',
      description: 'Voted yes on healthcare reform',
      sourceUrl: 'https://congress.gov/vote/123',
      politicianId: 1,
    };

    const formatted = formatEventDisplay(event);

    expect(formatted.type).toBe('vote');
    expect(formatted.typeLabel).toBe('Vote');
    expect(formatted.title).toBe('Healthcare Bill Vote');
    expect(formatted.date).toBe('2026-03-15');
    expect(formatted.description).toBe('Voted yes on healthcare reform');
    expect(formatted.sourceUrl).toBe('https://congress.gov/vote/123');
    expect(formatted.politicianId).toBe(1);
  });

  it('should support all event types', () => {
    expect(eventTypes).toEqual(['vote', 'statement', 'donation', 'promise', 'missed_vote']);
  });

  it('should format event type labels for display', () => {
    expect(formatEventType('vote')).toBe('Vote');
    expect(formatEventType('statement')).toBe('Statement');
    expect(formatEventType('donation')).toBe('Donation');
    expect(formatEventType('promise')).toBe('Promise');
    expect(formatEventType('missed_vote')).toBe('Missed Vote');
  });
});
