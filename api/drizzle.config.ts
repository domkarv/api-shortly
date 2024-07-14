import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from './src/constant.js';

export default defineConfig({
  dialect: 'postgresql',
  schema: 'src/db/schema.ts',
  out: 'migrations',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
