import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    { ok: true, service: "casa-testa", ts: new Date().toISOString() },
    { status: 200 }
  );
}
