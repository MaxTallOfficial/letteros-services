import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const links = sqliteTable("links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code").notNull().unique(),
  originalUrl: text("original_url").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  ip: text("ip"),
  clicks: integer("clicks").notNull().default(0),
});

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
