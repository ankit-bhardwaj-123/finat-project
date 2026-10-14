import { UserController } from "@/controller/user_controller";
import { Userrepository } from "@/repository/user_repository";
import { UserService } from "@/services/user_service";

const userRepository = new Userrepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
export async function POST(req: Request) {
  return userController.register(req);
}