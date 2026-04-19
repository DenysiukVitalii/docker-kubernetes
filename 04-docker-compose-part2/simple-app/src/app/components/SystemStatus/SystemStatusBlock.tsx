import { createClient } from 'redis';

import { prisma } from '@/lib/prisma';

import SystemStatus from './SystemStatus';

async function getStatus() {
  let database = false;
  let redis = false;

  try {
    await prisma.$queryRaw`SELECT 1`;
    database = true;
  } catch {}

  const redisUrl = process.env.APP_REDIS_URL;

  if (redisUrl) {
    const client = createClient({ url: redisUrl });

    try {
      await client.connect();
      const pong = await client.ping();
      redis = pong === 'PONG';
    } catch {
      redis = false;
    } finally {
      try {
        await client.disconnect();
      } catch {}
    }
  }

  return { database, redis };
}

export default async function SystemStatusBlock() {
  const status = await getStatus();

  return <SystemStatus database={status.database} redis={status.redis} />;
}
