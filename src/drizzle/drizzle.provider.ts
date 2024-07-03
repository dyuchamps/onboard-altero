import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../infras/db/schema';

export const DrizzleAsyncProvider = 'drizzleProvider';

export const drizzleProvider = [
  {
    provider: DrizzleAsyncProvider,
    useFactory: async () => {
      const connectionString = {
        host: 'localhost',
        port: 5432,
        database: 'drizzle',
        user: 'drizzle',
        password: 'drizzle',
      };
      const postgres = new Pool({
        ...connectionString,
        ssl: true,
      });

      const db = drizzle(postgres, { schema });
      return db;
    },
    exports: [DrizzleAsyncProvider],
  },
];
