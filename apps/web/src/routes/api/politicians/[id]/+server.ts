import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '@politracks/db';

/**
 * GET /api/politicians/[id]
 * Retrieves a politician by ID
 */
export const GET: RequestHandler = async ({ params }) => {
  try {
    const politicianId = parseInt(params.id, 10);

    if (isNaN(politicianId)) {
      return json({ error: 'Invalid politician ID' }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    const politicians = await (db as any).query.politicians.findFirst({
      where: (table: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (table as any).id.eq(politicianId);
      },
    });

    if (!politicians) {
      return json({ error: 'Politician not found' }, { status: 404 });
    }

    return json(politicians);
  } catch (error) {
    console.error('Failed to fetch politician:', error);
    return json({ error: 'Failed to fetch politician' }, { status: 500 });
  }
};
