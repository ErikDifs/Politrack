import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { accountabilityEvents, db, desc, politicians, eq } from '@politracks/db';
import { formatDbEvent, sortEventsByDate } from '$lib/event';
import { formatPoliticianProfile } from '$lib/politician/politician';

export const load: PageServerLoad = async ({ params }) => {
  const politicianId = parseInt(params.id, 10);

  if (isNaN(politicianId)) {
    error(404, 'Invalid politician ID');
  }

  const [politician] = await db
    .select()
    .from(politicians)
    .where(eq(politicians.id, politicianId))
    .limit(1);

  if (!politician) {
    error(404, 'Politician not found');
  }

  const events = await db
    .select()
    .from(accountabilityEvents)
    .where(eq(accountabilityEvents.politicianId, politicianId))
    .orderBy(desc(accountabilityEvents.date));

  return {
    politician: formatPoliticianProfile(politician),
    events: sortEventsByDate(events.map(formatDbEvent)),
  };
};
