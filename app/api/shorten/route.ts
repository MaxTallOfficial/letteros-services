import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { links } from "@/src/db/schema";
import { eq, lt } from "drizzle-orm";

// In-memory rate limiting: ip → { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

function generateCode(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 7; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export async function POST(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Слишком много запросов. Попробуйте через минуту." },
      { status: 429 }
    );
  }

  let body: { url?: string; skipCheck?: boolean; customSlug?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Неверный формат запроса" }, { status: 400 });
  }

  const { url, skipCheck = false, customSlug } = body;

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "URL обязателен" }, { status: 400 });
  }
  if (url.length > 2048) {
    return NextResponse.json(
      { error: "URL слишком длинный (максимум 2048 символов)" },
      { status: 400 }
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return NextResponse.json({ error: "Неверный формат URL" }, { status: 400 });
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    return NextResponse.json(
      { error: "Допустимы только http и https ссылки" },
      { status: 400 }
    );
  }

  // Check URL availability
  if (!skipCheck) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10_000);
      const response = await fetch(url, {
        method: "HEAD",
        signal: controller.signal,
        redirect: "follow",
      });
      clearTimeout(timeout);
      if (response.status >= 400) {
        return NextResponse.json(
          {
            error: `URL недоступен (статус ${response.status}). Включите опцию «Не проверять ссылку», если уверены в правильности URL.`,
          },
          { status: 422 }
        );
      }
    } catch (err) {
      const msg =
        (err as Error).name === "AbortError"
          ? "URL не ответил за 10 секунд."
          : "URL недоступен.";
      return NextResponse.json(
        {
          error: `${msg} Включите опцию «Не проверять ссылку», если уверены в правильности URL.`,
        },
        { status: 422 }
      );
    }
  }

  // Validate and check custom slug
  let code: string;
  if (customSlug) {
    if (!/^[a-zA-Z0-9-]{3,30}$/.test(customSlug)) {
      return NextResponse.json(
        { error: "Кастомный слаг: только латиница, цифры и дефис, длина 3–30 символов" },
        { status: 400 }
      );
    }
    const existing = await db.select().from(links).where(eq(links.code, customSlug)).limit(1);
    if (existing.length > 0) {
      const alt = customSlug + "-" + Math.random().toString(36).slice(2, 5);
      return NextResponse.json(
        { error: `Слаг «${customSlug}» уже занят. Попробуйте «${alt}» или другой вариант.` },
        { status: 409 }
      );
    }
    code = customSlug;
  } else {
    // Generate unique code
    code = generateCode();
    for (let i = 0; i < 10; i++) {
      const existing = await db.select().from(links).where(eq(links.code, code)).limit(1);
      if (existing.length === 0) break;
      code = generateCode();
    }
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

  // Clean up expired links on each request
  try {
    await db.delete(links).where(lt(links.expiresAt, now));
  } catch {}

  await db.insert(links).values({
    code,
    originalUrl: url,
    createdAt: now,
    expiresAt,
    ip,
    clicks: 0,
  });

  const shortUrl = `${origin}/s/${code}`;
  return NextResponse.json({ shortUrl, code, expiresAt: expiresAt.toISOString() });
}
