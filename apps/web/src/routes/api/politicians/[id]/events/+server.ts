import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { accountabilityEvents, db, desc, eq, politicians } from '@politracks/db';
import { formatDbEvent, sortEventsByDate } from '$lib/event';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const politicianId = parseInt(params.id, 10);

    if (isNaN(politicianId)) {
      return json({ error: 'Invalid politician ID' }, { status: 400 });
    }

    const [politician] = await db
      .select({ id: politicians.id })
      .from(politicians)
      .where(eq(politicians.id, politicianId))
      .limit(1);

    if (!politician) {
      return json({ error: 'Politician not found' }, { status: 404 });
    }

    const events = await db
      .select()
      .from(accountabilityEvents)
      .where(eq(accountabilityEvents.politicianId, politicianId))
      .orderBy(desc(accountabilityEvents.date));

    return json(sortEventsByDate(events.map(formatDbEvent)));
  } catch (error) {
    console.error('Failed to fetch accountability events:', error);
    return json({ error: 'Failed to fetch accountability events' }, { status: 500 });
  }
};
