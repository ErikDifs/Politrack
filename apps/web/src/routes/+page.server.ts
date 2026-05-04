import type { PageServerLoad } from './$types';
import { db, accountabilityEvents, desc } from '@politracks/db';

interface EventWithPolitician {
  id: number;
  type: string;
  title: string;
  date: string;
  description: string;
  sourceUrl: string;
  politician: {
    id: number;
    name: string;
    party: string;
    office: string;
  };
}

export const load: PageServerLoad = async () => {
  try {
    const events = await db.query.accountabilityEvents.findMany({
      limit: 10,
      orderBy: [desc(accountabilityEvents.date)],
      with: {
        politician: true,
      },
    });

    return {
      events: events as EventWithPolitician[],
    };
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return {
      events: [],
    };
  }
};
