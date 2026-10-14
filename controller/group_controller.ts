import { NextResponse } from "next/server";
import { GroupService } from "@/services/group_service";
import { group_validation_Schema } from "@/lib/validation/groupSchema";
import { validateRequest } from "@/lib/handlers/validation_handlor";
import { SuccessResponse } from "@/lib/handlers/response_handler";
import { ErrorResponse } from "@/lib/handlers/error_handler";

export class GroupController {
  constructor(private groupService: GroupService) {}

  async create(req: Request) {
    try {
      const data = await req.json();
      const validateData = await validateRequest( group_validation_Schema, data)
      const group = await this.groupService.createGroup(validateData.name);
      return SuccessResponse(group, "group created successfully", 201 );
    } catch (error) {
      return ErrorResponse(error);
    }
  }
}