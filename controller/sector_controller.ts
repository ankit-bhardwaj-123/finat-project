import { SectorService } from "@/services/sector_service";
import { ErrorResponse } from "@/lib/handlers/error_handler";
import { SuccessResponse } from "@/lib/handlers/response_handler";
import { validateRequest } from "@/lib/handlers/validation_handlor";
import { sector_validation_schema } from "@/lib/validation/sectorSchema";


export class SectorController {
  constructor(private sectorService: SectorService) {}

  async create(req: Request) {
    try {
      const data = await req.json();
      const validateData = await validateRequest(sector_validation_schema, data)
      const sector = await this.sectorService.createSector(validateData.number);
      return SuccessResponse(sector, "sector created successfully", 201 );
    } catch (error) {
      return ErrorResponse(error);
    }
  }
}