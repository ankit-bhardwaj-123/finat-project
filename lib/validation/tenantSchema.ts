import {z} from 'zod'

export const tenant_validation_schema = z.object({
    name : z.string().uuid("Invalid name").min(5, "tenant name must be atleast 8 characters")
})

export type tenantType = z.infer<typeof tenant_validation_schema>