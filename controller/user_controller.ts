import { ErrorResponse } from "@/lib/handlers/error_handler";
import { SuccessResponse } from "@/lib/handlers/response_handler";
import { validateRequest } from "@/lib/handlers/validation_handlor";
import { user_validation_schema } from "@/lib/validation/userSchema";
import { UserService } from "@/services/user_service";

export class UserController {
  constructor(private userService: UserService) {}
  async register(req: Request) {
    try {
      const body = await req.json();
      const validatedData = await validateRequest(user_validation_schema, body);
      const newUser = await this.userService.register(validatedData);
      return SuccessResponse(newUser, "User registered successfully", 201);
      
    } catch (error) {
      return ErrorResponse(error);
    }
  }
}