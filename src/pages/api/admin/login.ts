import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ locals, request, cookies, redirect }) => {
  const env = locals.runtime.env;
  const form = await request.formData();
  const password = form.get("password");

  if (typeof password !== "string" || password !== env.ADMIN_PASSWORD) {
    return redirect("/admin?error=invalid");
  }

  cookies.set("admin_session", password, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return redirect("/admin");
};
