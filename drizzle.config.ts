import { Config } from 'drizzle-kit';

export default {
  schema: './src/infras/db/schema/*',
  out: './drizzle-db',
  dialect: 'postgresql',
  dbCredentials: {
    // url: config.DB_CONNECTION_STRING,
    url: process.env.DB_CONNECTION_STRING,
  },
} satisfies Config;
