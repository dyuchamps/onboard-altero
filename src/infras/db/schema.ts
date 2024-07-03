import { numeric, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const menus = pgTable('Menus', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  price: numeric('price').notNull(),
  description: text('description'),
});
