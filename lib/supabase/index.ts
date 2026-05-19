export { createBrowserSupabaseClient } from "./client";
export { createServerSupabaseClient } from "./server";
export { createAdminSupabaseClient, isAdminSupabaseConfigured } from "./admin";
export { createStaticSupabaseClient } from "./static-server";
export {
  getCatalogSupabase,
  runSupabaseMutation,
  runSupabaseQuery,
} from "./helpers";
export {
  STORAGE_BUCKETS,
  deleteImage,
  getPublicImageUrl,
  normalizeStoragePath,
  uploadImage,
  validateImagePath,
  type StorageBucket,
} from "./storage";
export type { Database, Json, Tables } from "./types";
