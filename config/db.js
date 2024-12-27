import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import { DATABASE_URL } from './environment.js';

const { Pool } = pkg;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables.');
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const db = drizzle(pool);

db.connect = async () => {
  try {
    console.log('PostgreSQL Database Connection Successful!');
    return db;
  } catch (error) {
    console.error('PostgreSQL Database Connection Failed!', error.message);
    throw error;
  }
};

export default db;
