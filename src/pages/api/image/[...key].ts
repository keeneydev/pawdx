import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals, params }) => {
  const env = locals.runtime.env;
  const key = params.key;

  if (!key) {
    return new Response("Not found", { status: 404 });
  }

  const object = await env.BUCKET.get(key);

  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers();
  headers.set("Content-Type", object.httpMetadata?.contentType || "image/jpeg");
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return new Response(object.body as ReadableStream, { headers });
};
