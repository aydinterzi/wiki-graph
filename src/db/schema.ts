import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(), // Not ID
  title: varchar("title", { length: 255 }).notNull(), // Not başlığı
  content: varchar("content", { length: 1024 }).notNull(), // Not içeriği (Markdown formatı)
  createdAt: timestamp("created_at").defaultNow().notNull(), // Oluşturulma zamanı
  updatedAt: timestamp("updated_at").defaultNow().notNull(), // Güncellenme zamanı
  versions: varchar("versions", { length: 4096 }), // Versiyon geçmişi (JSON veya metin)
});

export const links = pgTable("links", {
  id: serial("id").primaryKey(), // Link ID
  fromNoteId: integer("from_note_id").notNull(), // Bağlantı veren notun ID'si
  toNoteId: integer("to_note_id").notNull(), // Bağlantı alınan notun ID'si
  createdAt: timestamp("created_at").defaultNow().notNull(), // Bağlantının oluşturulma zamanı
});
