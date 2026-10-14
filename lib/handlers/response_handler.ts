import { NextResponse } from "next/server";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: any; // Useful for pagination (e.g., totalPages, currentPage)
}

export function SuccessResponse<T>(
  data: T, 
  message: string = "Success", 
  statusCode: number = 200,
  meta?: any
) {
  const responsePayload: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  if (meta) {
    responsePayload.meta = meta;
  }

  return NextResponse.json(responsePayload, { status: statusCode });
}