import {
  bigserial,
  numeric,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { menus } from './menu';

export const fillings = pgTable('fillings', {
  id: bigserial('id', { mode: 'bigint' }).primaryKey().notNull(),
  menuId: bigserial('menu_id', { mode: 'bigint' })
    .notNull()
    .references(() => menus.id),
  name: varchar('name').notNull(),
  price: numeric('price').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});
