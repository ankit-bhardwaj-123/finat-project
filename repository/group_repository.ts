import { db } from "..";
import { groups } from "@/db/schema";

export class GroupRepository {
  async create(data: typeof groups.$inferInsert) {
    const [newGroup] = await db
      .insert(groups)
      .values(data)
      .returning();
    return newGroup;
  }
}