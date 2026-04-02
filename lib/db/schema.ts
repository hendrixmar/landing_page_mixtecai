import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const briefs = sqliteTable('briefs', {
    id: text('id').primaryKey(),
    clientName: text('client_name').notNull(),
    clientEmail: text('client_email').notNull(),
    businessType: text('business_type'),
    challenges: text('challenges'),
    goals: text('goals'),
    scope: text('scope'),
    budget: text('budget'),
    timeline: text('timeline'),
    summary: text('summary'),
    rawAnswers: text('raw_answers'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
