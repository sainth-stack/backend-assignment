import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from './config/environment';

export default defineConfig({
  out: './drizzle',
  schema: './models/demo.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
