import { TenantRepository } from "@/repository/tenant_repository";
import { TenantService } from "@/services/tenant_service"
import { TenantController } from "@/controller/tenant_controller";

const tenantRepository = new TenantRepository();
const tenantService = new TenantService(tenantRepository);
const tenantController = new TenantController(tenantService);

export async function POST(req: Request) {
  return tenantController.create(req);
}