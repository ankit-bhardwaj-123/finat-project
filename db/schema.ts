import { integer, text, uuid, pgTable, varchar, timestamp, } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
    id : uuid("id").primaryKey().defaultRandom(),
    email : varchar("email", {length:256}).notNull(),
    password : text("password").notNull(),
    fullName : varchar("fullName", {length:256}).notNull(),
    userName : varchar("userName", {length:256}).notNull(),
    createdAt : timestamp("created_at").defaultNow().notNull(),
    updatedAt : timestamp("updatedAt").defaultNow().$onUpdate(()=>new Date())
})
