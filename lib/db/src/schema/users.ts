import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull().unique(),
  walletType: text("wallet_type").notNull(), // metamask | phantom
  username: text("username"),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  lastSeenAt: timestamp("last_seen_at").defaultNow().notNull(),
});

export const userStatsTable = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  projectsCount: integer("projects_count").default(0).notNull(),
  exportsCount: integer("exports_count").default(0).notNull(),
  totalDurationSeconds: integer("total_duration_seconds").default(0).notNull(),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({ id: true, joinedAt: true, lastSeenAt: true });
export const insertUserStatsSchema = createInsertSchema(userStatsTable).omit({ id: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;
export type UserStats = typeof userStatsTable.$inferSelect;
