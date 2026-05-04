import type { Politician } from '@politracks/db';

export function formatPoliticianProfile(politician: Politician) {
  return {
    ...politician,
    summary: politician.summary || 'No summary available',
  };
}
