import {
  integer,
  numeric,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { cashiers } from './cashier';
import { customers } from './customer';
import { fillings } from './filling';
import { menus } from './menu';
import { toppings } from './topping';

export const orders = pgTable('orders', {
  id: varchar('id').primaryKey().notNull(),
  customerId: varchar('customer_id')
    .notNull()
    .references(() => customers.id),
  cashierId: varchar('cashier_id')
    .notNull()
    .references(() => cashiers.id),
  menuId: varchar('menu_id')
    .notNull()
    .references(() => menus.id),
  toppingId: varchar('topping_id')
    .notNull()
    .references(() => toppings.id),
  fillingId: varchar('filling_id')
    .notNull()
    .references(() => fillings.id),
  quantity: integer('quantity').notNull(),
  totalAmount: numeric('total_amount').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});
