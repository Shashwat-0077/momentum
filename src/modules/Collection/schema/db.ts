import { v4 as uuid } from "uuid";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

export const Collections = sqliteTable(
    "collections",
    {
        collection_id: text("id")
            .primaryKey()
            .$defaultFn(() => uuid()),
        user_id: text("userId").notNull(),
        name: text("name").notNull(),
        description: text("description").notNull(),
        chart_count: integer("chartCount", { mode: "number" })
            .notNull()
            .default(0),
        created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    },
    (table) => [
        unique("collections_user_name_unique").on(table.user_id, table.name),
    ]
);
