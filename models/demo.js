import { drizzle } from 'drizzle-orm/node-postgres';
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { z } from 'zod';

const demoRequestTable = pgTable('demo_requests', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    company: varchar('company', { length: 255 }).notNull(),
    status: varchar('status', { length: 255 }).notNull(),
});


const demoValidationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    company: z.string().optional(),
    status: z.string().optional(),
});

export { demoValidationSchema, demoRequestTable };
