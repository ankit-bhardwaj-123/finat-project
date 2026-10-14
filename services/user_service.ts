import bcrypt from "bcryptjs";
import { UserType } from "@/lib/validation/userSchema";
import { Userrepository } from "@/repository/user_repository";
import { ConflictError } from "@/lib/exceptions/app-errors";

export class UserService {
  constructor(private userRepository: Userrepository) {}
  async register(data: UserType) {
    const existingUser = await this.userRepository.findByEmailOrUsername(data.email, data.userName);
    if (existingUser) {
      throw new ConflictError("User with this email or username already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    return newUser;
  }
}