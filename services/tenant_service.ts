import { TenantRepository } from "@/repository/tenant_repository";

export class TenantService{
    constructor(private tenantRepository : TenantRepository){}
    async createTenant(name : string){
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        return await this.tenantRepository.create({name, slug})
    }
}