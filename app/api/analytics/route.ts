import { ANALYTICS_EVENTS, type AnalyticsPayload } from "@/lib/analytics/events";

const ALLOWED = new Set<string>(Object.values(ANALYTICS_EVENTS));

export async function POST(request: Request) {
  let body: AnalyticsPayload;

  try {
    body = (await request.json()) as AnalyticsPayload;
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!body?.name || !ALLOWED.has(body.name)) {
    return Response.json({ ok: false, error: "invalid_event" }, { status: 400 });
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", body);
  }

  return Response.json({ ok: true });
}
