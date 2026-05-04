import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db, politicians, eq } from '@politracks/db';
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

  return {
    politician: formatPoliticianProfile(politician),
  };
};
