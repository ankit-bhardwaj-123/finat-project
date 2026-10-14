import { TenantService } from "@/services/tenant_service";
import { validateRequest } from "@/lib/handlers/validation_handlor";
import { tenant_validation_schema } from "@/lib/validation/tenantSchema";
import { SuccessResponse } from "@/lib/handlers/response_handler";
import { ErrorResponse } from "@/lib/handlers/error_handler";

export class TenantController {
  constructor(private tenantService: TenantService) {}

  async create(req: Request) {
    try {
      const { name } = await req.json();
      const validatedData = await validateRequest(tenant_validation_schema, name)
      const tenant = await this.tenantService.createTenant(validatedData.name);
      return SuccessResponse(tenant, "tenant created successfully", 201);
    } catch (error) {
      return ErrorResponse(error);
    }
  }
}