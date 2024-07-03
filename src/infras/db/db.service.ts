import { ExtractTablesWithRelations } from 'drizzle-orm';
import * as cashierSchema from './schema/cashier';
import * as customerSchema from './schema/customer';
import * as fillingSchema from './schema/filling';
import * as menuSchema from './schema/menu';
import * as orderSchema from './schema/order';
import * as toppingSchema from './schema/topping';
import * as userSchema from './schema/user';

import { Injectable, Module, Scope } from '@nestjs/common';
import {
  drizzle,
  PostgresJsDatabase,
  PostgresJsTransaction,
} from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { config } from 'src/configs';

export type Schema = {
  users: typeof userSchema.users;
  customers: typeof customerSchema.customers;
  cashiers: typeof cashierSchema.cashiers;
  fillings: typeof fillingSchema.fillings;
  toppings: typeof toppingSchema.toppings;
  menus: typeof menuSchema.menus;
  orders: typeof orderSchema.orders;
};

export type schemaWithRelations = ExtractTablesWithRelations<Schema>;

export class DB {
  db: PostgresJsDatabase<Schema>;

  constructor() {
    const migrationClient = postgres(config.DB_CONNECTION_STRING, { max: 1 });
    this.migrate(migrationClient);

    const queryClient = postgres(config.DB_CONNECTION_STRING);
    this.db = drizzle(queryClient, {
      schema: {
        ...userSchema,
        ...customerSchema,
        ...cashierSchema,
        ...fillingSchema,
        ...toppingSchema,
        ...menuSchema,
        ...orderSchema,
      },
    });
  }

  async migrate(migrationClient: postgres.Sql<Record<string, never>>) {
    await migrate(drizzle(migrationClient), {
      migrationsFolder: './drizzle',
      migrationsTable: 'drizzle_onboard_altero',
    });

    migrationClient.end();
  }
}

@Injectable({ scope: Scope.REQUEST })
export class DBService {
  db: PostgresJsDatabase<Schema>;
  public tx: PostgresJsTransaction<Schema, schemaWithRelations> | null;

  constructor(private _db: DB) {
    this.db = _db.db;
  }
}

@Module({
  providers: [DB, DBService],
  exports: [DBService],
})
export class DBModule {}
