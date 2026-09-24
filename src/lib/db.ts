import { PrismaClient } from "@prisma/client";

/**
 * Database connection — Supabase Postgres.
 *
 * IMPORTANT: Prisma Client is created LAZILY (only on first access via getDb()),
 * NOT at module load time. This prevents "DATABASE_URL not set" errors
 * during Vercel build (when DATABASE_URL is not available in build env).
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const dbUrl = process.env.DATABASE_URL || "";
  if (!dbUrl.startsWith("postgres")) {
    // Don't throw at module load — return a proxy that throws on use
    return new Proxy({} as PrismaClient, {
      get() {
        throw new Error(
          `DATABASE_URL is not a Postgres URL. Set DATABASE_URL env var to your Supabase connection string.`
        );
      },
    });
  }
  return new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error", "warn"] : ["query", "error", "warn"],
  });
}

// Async getter — used by API route handlers
export async function getDb(): Promise<PrismaClient> {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  const client = createPrismaClient();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}

// Backwards-compat export — but lazy via getter property descriptor
// (so module load does NOT touch DATABASE_URL)
let _db: PrismaClient | null = null;
export const db: PrismaClient = new Proxy({} as PrismaClient, {
  get(_t, prop) {
    if (!_db) {
      _db = createPrismaClient();
      if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = _db;
    }
    const fn = (_db as never as Record<string | symbol, unknown>)[prop];
    if (typeof fn !== "function") {
      throw new Error(`Prisma property ${String(prop)} is not a function`);
    }
    return (fn as (...args: unknown[]) => unknown).bind(_db);
  },
});
