import { z } from "zod";

export const user_validation_schema = z.object({
    tenantId : z.string().uuid("Invalid tenant Id"),
    fullName : z.string().min(2, "fullName must be atleast 2 characters").max(256),
    userName : z.string().min(2, "username must be atleast 2 characters").max(256),
    email : z.string().email("Invalid email address").max(256),
    password : z.string().min(8, "password must be atleast 8 characters")
})

export type UserType = z.infer<typeof user_validation_schema>