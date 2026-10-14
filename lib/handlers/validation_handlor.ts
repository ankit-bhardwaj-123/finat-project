import { ZodSchema } from "zod";
import { ValidationError } from "@/lib/exceptions/app-errors";

export async function validateRequest<T>(schema: ZodSchema<T>, data: unknown): Promise<T> {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    throw new ValidationError("Validation Failed", result.error.flatten().fieldErrors);
  }
  
  return result.data;
}