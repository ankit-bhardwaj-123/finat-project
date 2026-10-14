import { GroupRepository } from "@/repository/group_repository";
import { groups } from "@/db/schema";

export class GroupService {
  constructor(private groupRepository: GroupRepository) {}

  async createGroup(data: typeof groups.$inferInsert) {
    return await this.groupRepository.create(data);
  }
}