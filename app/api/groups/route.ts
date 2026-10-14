import { GroupController } from "@/controller/group_controller";
import { GroupRepository } from "@/repository/group_repository";
import { GroupService } from "@/services/group_service";

const groupRepository = new GroupRepository();
const groupService = new GroupService(groupRepository);
const groupController = new GroupController(groupService);

export async function POST(req: Request) {
  return groupController.create(req);
}