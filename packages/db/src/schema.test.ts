/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config';
import { describe, it, expect } from 'vitest';
import { users } from './schema';

describe('schema', () => {
  it('should export users table', () => {
    expect(users).toBeDefined();
    expect(users).toHaveProperty('_');
  });

  it('should have correct table structure', () => {
    const tableConfig = (users as any)._?.config;
    expect(tableConfig).toBeDefined();
    expect(tableConfig?.name).toBe('users');
  });
});
