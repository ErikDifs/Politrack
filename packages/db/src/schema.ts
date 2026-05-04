import { pgTable, text, serial, timestamp, boolean, integer, date } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at')
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`now()`)
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const politicians = pgTable('politicians', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  party: text('party').notNull(),
  jurisdiction: text('jurisdiction').notNull(),
  office: text('office').notNull(),
  summary: text('summary'),
  createdAt: timestamp('created_at')
    .default(sql`now()`)
    .notNull(),
});

export type Politician = typeof politicians.$inferSelect;
export type NewPolitician = typeof politicians.$inferInsert;

export const eventTypes = ['vote', 'statement', 'donation', 'promise', 'missed_vote'] as const;

export type AccountabilityEventType = (typeof eventTypes)[number];

export const accountabilityEvents = pgTable('accountability_events', {
  id: serial('id').primaryKey(),
  politicianId: integer('politician_id')
    .notNull()
    .references(() => politicians.id),
  type: text('type').$type<AccountabilityEventType>().notNull(),
  title: text('title').notNull(),
  date: date('date', { mode: 'string' }).notNull(),
  description: text('description').notNull(),
  sourceUrl: text('source_url').notNull(),
  createdAt: timestamp('created_at')
    .default(sql`now()`)
    .notNull(),
});

export type AccountabilityEvent = typeof accountabilityEvents.$inferSelect;
export type NewAccountabilityEvent = typeof accountabilityEvents.$inferInsert;
