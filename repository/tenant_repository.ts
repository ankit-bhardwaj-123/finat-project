import { db } from "..";
import { tenants } from "@/db/schema";

export class TenantRepository {
  async create(data: { name: string; slug: string }) {
    const [newTenant] = await db.insert(tenants).values(data).returning();
    return newTenant;
  }
}

