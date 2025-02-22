import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: varchar("content", { length: 1024 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  versions: varchar("versions", { length: 4096 }),
});

export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  fromNoteId: integer("from_note_id").notNull(),
  toNoteId: integer("to_note_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
