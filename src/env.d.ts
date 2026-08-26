/// <reference types="astro/client" />

declare namespace Cloudflare {
  interface Env {
    BUCKET: R2Bucket;
    DB: D1Database;
    ADMIN_PASSWORD: string;
  }
}
