import {SectorRepository} from '@/repository/sector_repository'
import { sectors } from "@/db/schema";

export class SectorService {
  constructor(private sectorRepository: SectorRepository) {}

  async createSector(data: typeof sectors.$inferInsert) {
    // Basic logic layer (could add checks here later)
    return await this.sectorRepository.create(data);
  }
}