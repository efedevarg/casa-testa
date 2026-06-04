import { SITE } from "@/lib/constants/site";

export function absoluteUrl(path: string): string {
  const base = SITE.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function canonicalPath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}
