import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function htmlPage(title: string, message: string, status = 200): Response {
  const safeTitle = title.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const safeMessage = message.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const html =
    `<!doctype html><html><head><meta charset="utf-8"><title>${safeTitle}</title></head>` +
    `<body style="font-family:Arial,sans-serif;padding:24px;background:#0f172a;color:#e2e8f0;">` +
    `<h1 style="margin-top:0;">${safeTitle}</h1><p>${safeMessage}</p></body></html>`;
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method !== "GET") return htmlPage("Method not allowed", "This endpoint only accepts GET.", 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const approverEmail = (Deno.env.get("APPROVER_EMAIL") || "cburdick28@brewstermadrid.com").toLowerCase().trim();
  const publicAppUrl = Deno.env.get("PUBLIC_APP_URL");

  if (!supabaseUrl || !serviceRoleKey) return htmlPage("Configuration error", "Missing Supabase credentials.", 500);

  const url = new URL(req.url);
  const email = (url.searchParams.get("email") || "").trim().toLowerCase();
  const token = (url.searchParams.get("token") || "").trim();
  if (!email || !token) return htmlPage("Invalid link", "Missing email or token.", 400);

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: row, error: requestError } = await supabase
    .from("pending_registrations")
    .select("email,token_hash,token_expires_at,status")
    .eq("email", email)
    .maybeSingle();

  if (requestError) return htmlPage("Approval failed", requestError.message, 500);
  if (!row) return htmlPage("Approval failed", "No pending registration was found for that email.", 404);
  if (row.status !== "pending") return htmlPage("Approval failed", "This registration request is no longer pending.", 400);

  const tokenHash = await sha256Hex(token);
  if (tokenHash !== row.token_hash) return htmlPage("Approval failed", "Invalid approval token.", 400);

  const expiresAt = new Date(row.token_expires_at);
  if (Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() < Date.now()) {
    return htmlPage("Approval failed", "This approval link has expired.", 400);
  }

  const { error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, publicAppUrl ? { redirectTo: publicAppUrl } : {});
  if (inviteError) {
    const msg = inviteError.message || "Unknown invite error.";
    const alreadyExists = msg.toLowerCase().includes("already");
    if (!alreadyExists) return htmlPage("Approval failed", msg, 500);
  }

  const { error: updateError } = await supabase
    .from("pending_registrations")
    .update({
      status: "approved",
      approved_at: new Date().toISOString(),
      approved_by: approverEmail,
      invite_sent_at: new Date().toISOString(),
    })
    .eq("email", email);
  if (updateError) return htmlPage("Approval failed", updateError.message, 500);

  return htmlPage(
    "Registration approved",
    `Approved ${email}. Supabase has sent the account invite email so they can set their password.`,
    200,
  );
});
