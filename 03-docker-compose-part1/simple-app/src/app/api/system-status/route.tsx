import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "redis";

export async function GET() {
  let database = false;
  let redis = false;

  // Database check
  try {
    await prisma.$queryRaw`SELECT 1`;
    database = true;
  } catch (error) {
    database = false;
  }

  // Redis check
  const redisUrl = process.env.APP_REDIS_URL;

  if (redisUrl) {
    const client = createClient({ url: redisUrl });

    try {
      await client.connect();
      const pong = await client.ping();
      redis = pong === "PONG";
    } catch (error) {
      redis = false;
    } finally {
      try {
        await client.disconnect();
      } catch {}
    }
  }

  const ok = database && redis;

  return NextResponse.json(
    {
      ok,
      database,
      redis,
    },
    {
      status: ok ? 200 : 503,
    },
  );
}
