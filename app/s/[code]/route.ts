import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { links } from "@/src/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;
  const origin = req.nextUrl.origin;

  const result = await db.select().from(links).where(eq(links.code, code)).limit(1);

  if (result.length === 0) {
    return NextResponse.redirect(
      new URL(`/shorturl/?error=not-found&code=${encodeURIComponent(code)}`, origin)
    );
  }

  const link = result[0];

  if (link.expiresAt < new Date()) {
    return NextResponse.redirect(
      new URL(`/shorturl/?error=expired&code=${encodeURIComponent(code)}`, origin)
    );
  }

  // Increment click counter
  await db
    .update(links)
    .set({ clicks: sql`${links.clicks} + 1` })
    .where(eq(links.code, code));

  return NextResponse.redirect(link.originalUrl, { status: 301 });
}
