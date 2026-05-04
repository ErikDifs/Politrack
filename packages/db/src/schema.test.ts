import 'dotenv/config';
import { getTableName } from 'drizzle-orm';
import { describe, it, expect } from 'vitest';
import { accountabilityEvents, users } from './schema';

describe('schema', () => {
  it('should export users table', () => {
    expect(users).toBeDefined();
    expect(users).toHaveProperty('id');
    expect(users).toHaveProperty('email');
  });

  it('should have correct table structure', () => {
    expect(getTableName(users)).toBe('users');
  });

  it('should export accountability events table', () => {
    expect(accountabilityEvents).toBeDefined();
    expect(accountabilityEvents).toHaveProperty('type');
    expect(accountabilityEvents).toHaveProperty('title');
    expect(accountabilityEvents).toHaveProperty('date');
    expect(accountabilityEvents).toHaveProperty('description');
    expect(accountabilityEvents).toHaveProperty('sourceUrl');
    expect(accountabilityEvents).toHaveProperty('politicianId');
  });

  it('should have accountability events table structure', () => {
    expect(getTableName(accountabilityEvents)).toBe('accountability_events');
  });
});
