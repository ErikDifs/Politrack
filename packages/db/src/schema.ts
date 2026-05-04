import { pgTable, text, serial, timestamp, boolean } from 'drizzle-orm/pg-core';
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
