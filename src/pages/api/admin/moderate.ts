import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const POST: APIRoute = async ({ request, cookies }) => {
  const session = cookies.get("admin_session")?.value;

  if (session !== env.ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, action } = body as { id: string; action: string };

  if (!id || !["approved", "rejected"].includes(action)) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  await env.DB.prepare("UPDATE submissions SET status = ? WHERE id = ?")
    .bind(action, id)
    .run();

  return Response.json({ ok: true });
};
