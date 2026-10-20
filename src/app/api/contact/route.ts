import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { contactSchema, type ContactErrors } from "@/lib/contact";

export const runtime = "nodejs";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const MAX_BODY_BYTES = 16_384;

// Best-effort process-local protection. Use a shared rate-limit store before
// scaling across instances. Never persist visitor IP addresses or form content.
const attempts = new Map<string, { count: number; resetAt: number }>();

function limitRequest(request: Request) {
  const now = Date.now();
  for (const [key, value] of attempts) {
    if (value.resetAt <= now) attempts.delete(key);
  }

  // Vercel supplies this header. Outside Vercel, use a shared process bucket
  // rather than trusting arbitrary client-supplied forwarding headers.
  const visitor = process.env.VERCEL === "1"
    ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    : "shared";
  const key = createHash("sha256").update(visitor).digest("hex");
  const existing = attempts.get(key);
  if (existing && existing.count >= MAX_ATTEMPTS) {
    return Math.ceil((existing.resetAt - now) / 1000);
  }
  if (existing) existing.count += 1;
  else {
    if (attempts.size >= 10_000) attempts.delete(attempts.keys().next().value as string);
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
  }
  return 0;
}

function json(body: object, status: number, extraHeaders: Record<string, string> = {}) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extraHeaders },
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return json({ message: "Please submit the form from this website." }, 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ message: "Please submit the contact form as JSON." }, 415);
  }

  const retryAfter = limitRequest(request);
  if (retryAfter) {
    return json(
      { message: "Too many attempts. Please try again in 15 minutes." },
      429,
      { "Retry-After": String(retryAfter) },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ message: "Your message is too long. Please shorten it and try again." }, 413);
  }

  let payload: unknown;
  try {
    // Bound the streamed body too: Content-Length can be absent or inaccurate.
    const reader = request.body?.getReader();
    if (!reader) return json({ message: "Please complete the contact form." }, 400);
    const decoder = new TextDecoder();
    let body = "";
    let bytes = 0;
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return json({ message: "Your message is too long. Please shorten it and try again." }, 413);
      }
      body += decoder.decode(chunk.value, { stream: true });
    }
    body += decoder.decode();
    payload = JSON.parse(body);
  } catch {
    return json({ message: "We couldn’t read that message. Please try again." }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fields: ContactErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "name" || field === "email" || field === "organization" || field === "message") {
        fields[field] ??= issue.message;
      }
    }
    return json({ message: "Please check the form and try again.", fields }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  if (!apiKey || !from || !to) {
    return json({ message: "Email delivery is not connected yet. Your message has not been sent." }, 503);
  }

  const { name, email, organization, message } = parsed.data;
  try {
    // Resend API reference: https://resend.com/docs/api-reference/emails/send-email
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio inquiry from ${name.replace(/[\r\n]/g, " ")}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          ...(organization ? [`Organization: ${organization}`] : []),
          "",
          message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(12_000),
      cache: "no-store",
    });
    const result = await response.json().catch(() => null) as { id?: unknown } | null;
    if (!response.ok || typeof result?.id !== "string") {
      return json({ message: "Email delivery is temporarily unavailable. Your message was not confirmed. Please try again later." }, 502);
    }
    // Provider acceptance is the only success condition; no simulated delivery.
    return json({ message: "Your message is on its way. Thanks for reaching out." }, 200);
  } catch {
    return json({ message: "We couldn’t confirm delivery. Please try again in a moment." }, 502);
  }
}
