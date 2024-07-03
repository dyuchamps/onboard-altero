import {
  bigserial,
  integer,
  numeric,
  pgTable,
  timestamp,
} from 'drizzle-orm/pg-core';
import { cashiers } from './cashier';
import { customers } from './customer';
import { menus } from './menu';
import { toppings } from './topping';
import { users } from './user';

export const orders = pgTable('orders', {
  id: bigserial('id', { mode: 'bigint' }).primaryKey().notNull(),
  customerId: bigserial('customer_id', { mode: 'bigint' })
    .notNull()
    .references(() => customers.id),
  cashierId: bigserial('cashier_id', { mode: 'bigint' })
    .notNull()
    .references(() => cashiers.id),
  menuId: bigserial('menu_id', { mode: 'bigint' })
    .notNull()
    .references(() => menus.id),
  toppingId: bigserial('topping_id', { mode: 'bigint' })
    .notNull()
    .references(() => toppings.id),
  fillingId: bigserial('filling_id', { mode: 'bigint' })
    .notNull()
    .references(() => users.id),
  quantity: integer('quantity').notNull(),
  totalAmount: numeric('total_amount').notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});
