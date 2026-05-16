import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  // Don't throw during build time if env is missing
  if (process.env.NODE_ENV === 'production') {
    console.warn('DATABASE_URL is not set');
  }
}

const connectionString = process.env.DATABASE_URL || '';

// For VPS hosting, we use the standard postgres driver with a connection pool
const client = postgres(connectionString, { 
  prepare: false,
  // Supabase uses port 5432 for direct and 6543 for pooling
  // We'll let the connection string handle the port
});

export const db = drizzle(client, { schema });

export default db;
