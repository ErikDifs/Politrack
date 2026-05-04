import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db, users } from '@politracks/db';
import { formatErrors, validateUser } from '$lib/politician/validation';

/**
 * GET /api/users
 * Retrieves all users from the database
 */
export const GET: RequestHandler = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const userList = await (db as any).query.users.findMany();
    return json(userList);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return json({ error: 'Failed to fetch users' }, { status: 500 });
  }
};

/**
 * POST /api/users
 * Creates a new user with validation
 */
export const POST: RequestHandler = async ({ request }) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    const data = await request.json();

    // Validate input
    const validation = validateUser(data);
    if (!validation.valid) {
      return json(
        {
          error: 'Validation failed',
          errors: formatErrors(validation.errors),
        },
        { status: 400 }
      );
    }

    // For now, just insert the user. In a real app, check for duplicates
    // (This requires the users table to exist in the database)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const result = await (db as any)
      .insert(users)
      .values({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
      })
      .returning();

    if (!result || result.length === 0) {
      throw new Error('Failed to create user');
    }

    return json(
      {
        success: true,
        user: result[0],
        message: `User "${data.name}" created successfully`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);

    if (error instanceof SyntaxError) {
      return json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    return json({ error: 'Failed to create user' }, { status: 500 });
  }
};
