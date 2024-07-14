import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import { DATABASE_URL } from '../constant.js';
import * as schema from './schema.js';

if (!DATABASE_URL) {
  throw new Error('🥲 Database credentials missing!');
}

neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: DATABASE_URL });

export const db = drizzle(pool, { schema: schema });
