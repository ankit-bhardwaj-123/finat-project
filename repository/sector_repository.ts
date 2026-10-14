import { db } from "..";
import { sectors } from "@/db/schema";

export class SectorRepository {
  async create(data: typeof sectors.$inferInsert) {
    const [newSector] = await db
      .insert(sectors)
      .values(data)
      .returning();
    return newSector;
  }
}