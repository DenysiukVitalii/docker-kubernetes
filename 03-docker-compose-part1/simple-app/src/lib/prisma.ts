import { PrismaClient } from '$/prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

type GlobalWithPrisma = typeof globalThis & {
  prisma?: PrismaClient;
  pgPool?: pg.Pool;
};

const globalForPrisma = globalThis as GlobalWithPrisma;

if (!globalForPrisma.pgPool) {
  globalForPrisma.pgPool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ...(process.env.NODE_ENV !== 'development' && {
      ssl: { rejectUnauthorized: false }
    })
  });

  console.log('Created pg.Pool');
}

const adapter = new PrismaPg(globalForPrisma.pgPool);

function createPrismaClient() {
  const prismaClient = new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error']
  });

  return prismaClient;
}

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = createPrismaClient() as unknown as PrismaClient;

  console.log('Created PrismaClient');
}

export const prisma = globalForPrisma.prisma;
