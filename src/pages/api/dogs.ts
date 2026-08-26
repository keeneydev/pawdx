import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const GET: APIRoute = async () => {
  const { results } = await env.DB
    .prepare(
      "SELECT id, dog_name, caption, link, image_key FROM submissions WHERE status = 'approved' ORDER BY created_at DESC"
    )
    .all();

  return Response.json(results);
};
