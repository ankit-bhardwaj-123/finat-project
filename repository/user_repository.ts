import { db } from "..";
import { users } from "@/db/schema";
import { eq, or } from "drizzle-orm";

export class Userrepository {
  async findByEmailOrUsername(email: string, userName: string) {
    const result = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.userName, userName)))
      .limit(1);

    return result[0] || null;
  }
  async create(data: typeof users.$inferInsert) {
    const [newUser] = await db.insert(users).values(data).returning({
      id: users.id,
      email: users.email,
      userName: users.userName,
      fullName: users.fullName,
      tenantId: users.tenantId,
      createdAt: users.createdAt,
    });

    return newUser;
  }
}
