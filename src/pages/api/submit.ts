import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { imageKey } from "../../lib/r2";

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();

  const dogName = form.get("dog_name");
  const photo = form.get("photo");
  const caption = form.get("caption") || null;
  const link = form.get("link") || null;

  if (!dogName || typeof dogName !== "string") {
    return Response.json({ error: "Dog name is required." }, { status: 400 });
  }

  if (!photo || !(photo instanceof File) || photo.size === 0) {
    return Response.json({ error: "Photo is required." }, { status: 400 });
  }

  const maxSize = 10 * 1024 * 1024; // 10 MB
  if (photo.size > maxSize) {
    return Response.json({ error: "Photo must be under 10 MB." }, { status: 400 });
  }

  const ext = photo.name.split(".").pop()?.toLowerCase() || "jpg";
  const id = crypto.randomUUID();
  const key = imageKey(id, ext);

  await env.BUCKET.put(key, photo.stream(), {
    httpMetadata: { contentType: photo.type },
  });

  await env.DB.prepare(
    "INSERT INTO submissions (id, dog_name, caption, link, image_key) VALUES (?, ?, ?, ?, ?)"
  )
    .bind(id, dogName, caption, link, key)
    .run();

  return Response.json({ ok: true, id });
};
