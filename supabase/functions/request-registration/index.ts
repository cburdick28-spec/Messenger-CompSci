import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
  });
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return jsonResponse({}, 204);
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const brevoApiKey = Deno.env.get("BREVO_API_KEY") || "";
  const approverEmail = (Deno.env.get("APPROVER_EMAIL") || "cburdick28@brewstermadrid.com").toLowerCase().trim();
  const fromEmail = Deno.env.get("APPROVAL_FROM_EMAIL") || approverEmail;
  const approvalBaseUrl = (Deno.env.get("APPROVAL_BASE_URL") || supabaseUrl).replace(/\/+$/, "");
  const ttlHours = Math.max(Number.parseInt(Deno.env.get("APPROVAL_TOKEN_TTL_HOURS") || "24", 10) || 24, 1);

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "Server is missing Supabase credentials." }, 500);
  }
  if (!brevoApiKey) {
    return jsonResponse({ error: "Server is missing BREVO_API_KEY." }, 500);
  }

  let payload: { email?: string };
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  const email = String(payload.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return jsonResponse({ error: "Enter a valid email address." }, 400);

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: existingProfile, error: profileLookupError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (profileLookupError) return jsonResponse({ error: profileLookupError.message }, 500);
  if (existingProfile) {
    return jsonResponse({ error: "This email is already registered." }, 409);
  }

  const token = `${crypto.randomUUID().replaceAll("-", "")}${crypto.randomUUID().replaceAll("-", "")}`;
  const tokenHash = await sha256Hex(token);
  const tokenExpiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000).toISOString();

  const { error: upsertError } = await supabase
    .from("pending_registrations")
    .upsert(
      {
        email,
        token_hash: tokenHash,
        token_expires_at: tokenExpiresAt,
        status: "pending",
        requested_at: new Date().toISOString(),
        approved_at: null,
        approved_by: null,
        invite_sent_at: null,
      },
      { onConflict: "email" },
    );

  if (upsertError) return jsonResponse({ error: upsertError.message }, 500);

  const approveUrl = `${approvalBaseUrl}/functions/v1/approve-registration?email=${encodeURIComponent(email)}&token=${
    encodeURIComponent(token)
  }`;

  const emailResult = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": brevoApiKey,
    },
    body: JSON.stringify({
      sender: { email: fromEmail, name: "Messenger Registration Approval" },
      to: [{ email: approverEmail }],
      subject: `Approve Messenger registration: ${email}`,
      textContent:
        `A new Messenger registration request is pending.\n\n` +
        `Requested email: ${email}\n` +
        `Approve link: ${approveUrl}\n\n` +
        `If this request is unexpected, ignore this email.`,
      htmlContent:
        `<p>A new Messenger registration request is pending.</p>` +
        `<p><strong>Requested email:</strong> ${email}</p>` +
        `<p><a href="${approveUrl}">Approve this registration</a></p>` +
        `<p>If this request is unexpected, ignore this email.</p>`,
    }),
  });

  if (!emailResult.ok) {
    const details = await emailResult.text();
    return jsonResponse({ error: `Failed to send approval email. ${details}` }, 502);
  }

  return jsonResponse({
    ok: true,
    message:
      "Registration request submitted. cburdick28@brewstermadrid.com must approve it first. After approval, an invite email is sent to complete account setup.",
  });
});
