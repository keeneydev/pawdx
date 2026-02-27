/// <reference types="astro/client" />

type R2Bucket = import("@cloudflare/workers-types").R2Bucket;
type D1Database = import("@cloudflare/workers-types").D1Database;

type Runtime = import("@astrojs/cloudflare").Runtime<{
  BUCKET: R2Bucket;
  DB: D1Database;
  ADMIN_PASSWORD: string;
}>;

declare namespace App {
  interface Locals extends Runtime {}
}
