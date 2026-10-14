import { SectorController } from "@/controller/sector_controller";
import { SectorRepository } from "@/repository/sector_repository";
import { SectorService } from "@/services/sector_service";

const sectorRepository = new SectorRepository();
const sectorService = new SectorService(sectorRepository);
const sectorController = new SectorController(sectorService);

export async function POST(req: Request) {
  return sectorController.create(req);
}