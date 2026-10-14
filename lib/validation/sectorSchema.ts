import {z} from 'zod'

export const sector_validation_schema = z.object({
    number : z.number()
})