import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const videosTable = sqliteTable("videos_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  imageRepresentationUrl: text(),
})
