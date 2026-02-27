import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals, cookies }) => {
  const env = locals.runtime.env;
  const session = cookies.get("admin_session")?.value;

  if (session !== env.ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { results } = await env.DB.prepare(
    "SELECT id, dog_name, caption, link, image_key, created_at FROM submissions WHERE status = 'pending' ORDER BY created_at ASC"
  ).all();

  return Response.json(results);
};
