import { NextResponse } from "next/server";
import { AppError, ValidationError } from "@/lib/exceptions/app-errors";
import { ZodError } from "zod";

export function ErrorResponse(error: any) {

  if (error instanceof AppError) {
    if (!error.isOperational) {
      console.error(`[CRITICAL] ${error.name}:`, error);
    }
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        // Only attach the 'errors' object if it's a ValidationError
        errors: error instanceof ValidationError ? error.errors : undefined,
      },
      { status: error.statusCode },
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        message: "Validation Failed",
        errors: error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }
  if (error.code) {
    switch (error.code) {
      case "23505": // Unique Violation
        return NextResponse.json(
          {
            success: false,
            message: "A record with this unique information already exists.",
          },
          { status: 409 },
        );
      case "23503": // Foreign Key Violation
        return NextResponse.json(
          {
            success: false,
            message:
              "A referenced record (like Tenant or Group) does not exist.",
          },
          { status: 400 },
        );
      case "23502": // Not Null Violation
        return NextResponse.json(
          { success: false, message: "A required database field is missing." },
          { status: 400 },
        );
    }
  }
  console.error("[UNHANDLED SYSTEM ERROR]:", error);
  return NextResponse.json(
    { success: false, message: "Internal Server Error" },
    { status: 500 },
  );
}
