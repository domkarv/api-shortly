import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const uri = pgTable('uri', {
  id: serial('id').unique().notNull(),
  shortUrlId: text('short_url_id').unique().notNull(),
  mainUrl: text('main_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const uriRelations = relations(uri, ({ many }) => ({
  analytics: many(analytics),
}));

export const analytics = pgTable('analytics', {
  id: serial('id').unique().notNull(),
  uriId: text('uri_id')
    .references(() => uri.shortUrlId, { onDelete: 'cascade' })
    .notNull(),
  visitedAt: timestamp('visited_at').defaultNow().notNull(),
});

export const analyticsRelations = relations(analytics, ({ one }) => ({
  uri: one(uri, {
    fields: [analytics.uriId],
    references: [uri.shortUrlId],
  }),
}));

export type InsertURI = typeof uri.$inferInsert;
export type SelectURI = InferSelectModel<typeof uri>;

export type InsertAnalytics = InferInsertModel<typeof analytics>;
export type SelectAnalytics = typeof analytics.$inferSelect;
