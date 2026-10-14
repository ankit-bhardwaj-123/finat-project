import {z} from 'zod'

export const group_validation_Schema = z.object({
    name : z.string().min(2, "group name should be atleast 2 character long")
})

export type GroupType = z.infer<typeof group_validation_Schema>