import { describe, it, expect } from 'vitest';
import { formatPoliticianProfile } from '../../src/lib/politician/politician';
import { Politician } from '@politracks/db';

describe('Politician profile formatting', () => {
  it('should format politician data correctly', () => {
    const politician = {
      id: 1,
      name: 'Jane Smith',
      party: 'Democratic Party',
      jurisdiction: 'California',
      office: 'State Senator',
      summary: 'Long-serving senator focused on environmental policy',
    };

    const formatted = formatPoliticianProfile(politician as Politician);
    expect(formatted.name).toBe('Jane Smith');
    expect(formatted.party).toBe('Democratic Party');
    expect(formatted.jurisdiction).toBe('California');
    expect(formatted.office).toBe('State Senator');
    expect(formatted.summary).toBe('Long-serving senator focused on environmental policy');
  });

  it('should handle missing summary gracefully', () => {
    const politician = {
      id: 1,
      name: 'John Doe',
      party: 'Republican Party',
      jurisdiction: 'Texas',
      office: 'Representative',
      summary: null,
    };

    const formatted = formatPoliticianProfile(politician as Politician);
    expect(formatted.summary).toBe('No summary available');
  });

  it('should preserve all required fields', () => {
    const politician = {
      id: 1,
      name: 'Test Name',
      party: 'Test Party',
      jurisdiction: 'Test Jurisdiction',
      office: 'Test Office',
      summary: 'Test Summary',
    };

    const formatted = formatPoliticianProfile(politician as Politician);
    expect(formatted).toHaveProperty('id');
    expect(formatted).toHaveProperty('name');
    expect(formatted).toHaveProperty('party');
    expect(formatted).toHaveProperty('jurisdiction');
    expect(formatted).toHaveProperty('office');
  });
});
