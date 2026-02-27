import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals }) => {
  const db = locals.runtime.env.DB;
  const { results } = await db
    .prepare(
      "SELECT id, dog_name, caption, link, image_key FROM submissions WHERE status = 'approved' ORDER BY created_at DESC"
    )
    .all();

  return Response.json(results);
};
