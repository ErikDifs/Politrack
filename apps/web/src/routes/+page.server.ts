import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Zod schema for user creation
const createUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
});

export const load: PageServerLoad = async () => {
  const userList: User[] = [];

  return {
    users: userList,
  };
};

export const actions: Actions = {
  adduser: async ({ request }) => {
    if (request.method !== 'POST') {
      return fail(405, { error: 'Method not allowed' });
    }

    try {
      const formData = await request.formData();
      const name = formData.get('name') as string | null;
      const email = formData.get('email') as string | null;

      // Parse and validate with Zod
      const validation = createUserSchema.safeParse({ name, email });

      if (!validation.success) {
        // Return field-specific errors
        const errors: Record<string, string> = {};
        validation.error.issues.forEach((issue) => {
          if (issue.path[0]) {
            errors[issue.path[0] as string] = issue.message;
          }
        });

        return fail(400, {
          error: 'Validation failed',
          errors,
        });
      }

      const validatedData = validation.data;

      // Simulate database insert (would be actual DB call once migrations run)
      // For now, just return success with mock data
      const newUser: User = {
        id: Math.floor(Math.random() * 10000),
        name: validatedData.name,
        email: validatedData.email,
        isActive: true,
      };

      return {
        success: true,
        user: newUser,
        message: `User "${validatedData.name}" created successfully`,
      };
    } catch (error) {
      console.error('Error creating user:', error);
      return fail(500, {
        error: 'Failed to create user',
      });
    }
  },
};
