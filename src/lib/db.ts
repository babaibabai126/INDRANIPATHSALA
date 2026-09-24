import { PrismaClient } from "@prisma/client";

/**
 * Database connection — Supabase Postgres (production + local).
 *
 * Uses Prisma Client with native PostgreSQL connection.
 * No SQLite fallback anymore (we have proper Postgres now).
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  // Supabase Postgres (transaction pooler or session pooler — both work)
  const dbUrl = process.env.DATABASE_URL || "";
  if (!dbUrl.startsWith("postgres")) {
    throw new Error("DATABASE_URL must be a Postgres URL (Supabase)");
  }

  // Use direct Prisma Client for Postgres
  return new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error", "warn"] : ["query", "error", "warn"],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// Async helper for handlers that want to ensure DB is ready
export async function getDb(): Promise<PrismaClient> {
  return db;
}
