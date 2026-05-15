export type ActionResult<T = void> =
  | { ok: true; data?: T; mode: "persisted" | "demo" }
  | { ok: false; error: string };
