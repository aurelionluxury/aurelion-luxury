import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME, AdminPayload } from "@/lib/session";

export async function requireAdmin(
  request: NextRequest
): Promise<AdminPayload | NextResponse> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const admin = await verifyToken(token);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return admin;
}

export function isUnauthorized(val: AdminPayload | NextResponse): val is NextResponse {
  return val instanceof NextResponse;
}
