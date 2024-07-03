import { bigserial, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { users } from './user';

export const customers = pgTable('customers', {
  id: bigserial('id', { mode: 'bigint' }).primaryKey().notNull(),
  userId: bigserial('user_id', { mode: 'bigint' })
    .notNull()
    .references(() => users.id),
  firstName: varchar('first_name', { length: 246 }).notNull(),
  lastName: varchar('last_name', { length: 246 }).notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});
