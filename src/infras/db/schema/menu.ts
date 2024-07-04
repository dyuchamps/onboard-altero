import {
  bigserial,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const menus = pgTable('menus', {
  id: bigserial('id', { mode: 'number' }).primaryKey().notNull(),
  name: varchar('name').notNull(),
  price: numeric('price').notNull(),
  stock: integer('stock').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }),
});
