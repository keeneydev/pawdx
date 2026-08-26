import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const GET: APIRoute = async ({ cookies }) => {
  const session = cookies.get("admin_session")?.value;

  if (session !== env.ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { results } = await env.DB.prepare(
    "SELECT id, dog_name, caption, link, image_key, created_at FROM submissions WHERE status = 'pending' ORDER BY created_at ASC"
  ).all();

  return Response.json(results);
};
