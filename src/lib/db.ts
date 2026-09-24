import { PrismaClient } from "@prisma/client";
import { existsSync } from "fs";
import { dirname } from "path";

// Database connection strategy:
// 1. Production with POSTGRES_DATABASE_URL env var (Neon/Supabase/Vercel Postgres):
//    -> use Neon adapter with Prisma Postgres schema
// 2. Local dev / sandbox with DATABASE_URL = file:... (file actually writable):
//    -> use native SQLite Prisma Client
// 3. Production fallback (no DB configured or unwritable):
//    -> in-memory store (demo only — data resets on cold start)

type Purchase = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  location: string;
  course: string;
  courseLabel: string;
  amount: number;
  status: string;
  createdAt: Date;
};

type Lead = {
  id: string;
  name: string;
  phone: string;
  course: string;
  createdAt: Date;
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  __dbInitPromise: Promise<unknown> | undefined;
  __memStore: { purchases: Purchase[]; leads: Lead[] } | undefined;
};

// ============= IN-MEMORY STORE (fallback for production w/o DB) =============

function getMemStore() {
  if (!globalForPrisma.__memStore) {
    globalForPrisma.__memStore = { purchases: [], leads: [] };
    seedDemoMem(globalForPrisma.__memStore);
  }
  return globalForPrisma.__memStore;
}

function seedDemoMem(store: { purchases: Purchase[]; leads: Lead[] }) {
  const COURSES = [
    { code: "1en", label: "1st Year — Only English", amount: 999 },
    { code: "1combo", label: "1st Year — English + Bengali (Combo)", amount: 1499 },
    { code: "2en", label: "2nd Year — Only English", amount: 999 },
    { code: "2combo", label: "2nd Year — English + Bengali (Combo)", amount: 1499 },
  ];
  const NAMES = [
    "Rohit Kumar", "Sourav Das", "Priya Saha", "Anik Mallick", "Tania Roy",
    "Subham Ghosh", "Avishek Roy", "Manas Dutta", "Riya Mondal", "Suman Pal",
    "Ananya Ghosh", "Sourav Bhunia", "Debashis Mahato", "Kabita Roy", "Sneha Das",
    "Arijit Banerjee", "Soumen Jana", "Madhumita Das", "Sumantra Roy", "Soham Saha",
    "Ankita Pal", "Rahul Banik", "Pritam Saha", "Sukanta Mal", "Mou Roy",
    "Sumantra Ghosh", "Sahinur Mondal", "Tanvir Hossain", "Madhuri Sen", "Pabitra Das",
  ];
  const LOCS = [
    "Kolkata, WB", "Howrah, WB", "Durgapur, WB", "Siliguri, WB", "Asansol, WB",
    "Midnapore, WB", "Burdwan, WB", "Malda, WB", "Baharampur, WB", "Kharagpur, WB",
  ];
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const c = COURSES[i % COURSES.length];
    const n = NAMES[i % NAMES.length];
    const initials = n.split(" ").map((p) => p[0]).join("").toLowerCase();
    const created = new Date(now);
    created.setDate(created.getDate() - (i % 7));
    created.setHours(created.getHours() - (i % 24));
    // First 24 = PAID, last 6 = PENDING (recent submissions awaiting payment)
    const status = i < 24 ? "PAID" : "PENDING";
    store.purchases.push({
      id: `mem_p_${i}`,
      name: n,
      email: `${initials}${1000 + i}@gmail.com`,
      mobile: `9${String(800000000 + i * 12345678).slice(0, 9)}`,
      location: LOCS[i % LOCS.length],
      course: c.code,
      courseLabel: c.label,
      amount: c.amount,
      status,
      createdAt: created,
    });
  }
}

// Check if a SQLite file URL points to a writable location
function canUseSqlite(sqliteUrl: string): boolean {
  if (!sqliteUrl.startsWith("file:")) return false;
  const path = sqliteUrl.replace("file:", "");
  // If file exists, we can read it. If not, check if directory is writable.
  try {
    if (existsSync(path)) return true;
    const dir = dirname(path);
    return existsSync(dir);
  } catch {
    return false;
  }
}

// ============= PRISMA CLIENT FACTORY =============

async function createPrismaClient(): Promise<PrismaClient | null> {
  const pgUrl =
    process.env.POSTGRES_DATABASE_URL ||
    process.env.DATABASE_URL_NONSQLITE ||
    "";
  const sqliteUrl = process.env.DATABASE_URL || "";

  // Postgres path (Neon adapter)
  if (pgUrl.startsWith("postgres://") || pgUrl.startsWith("postgresql://")) {
    try {
      const { PrismaNeon } = await import("@prisma/adapter-neon");
      const { Pool } = await import("@neondatabase/serverless");
      const pool = new Pool({ connectionString: pgUrl });
      const adapter = new PrismaNeon(pool);
      return new PrismaClient({ adapter } as never);
    } catch (e) {
      console.error("Postgres adapter init failed", e);
      return null;
    }
  }

  // SQLite path (local dev / sandbox — only if file or dir is writable)
  if (canUseSqlite(sqliteUrl)) {
    try {
      return new PrismaClient({ log: ["query"] });
    } catch (e) {
      console.error("SQLite client init failed", e);
      return null;
    }
  }

  // No DB configured: return null to signal in-memory fallback
  return null;
}

// Async initializer — used by route handlers
export async function getDb(): Promise<PrismaClient> {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  if (!globalForPrisma.__dbInitPromise) {
    globalForPrisma.__dbInitPromise = createPrismaClient().then((c) => {
      if (c) globalForPrisma.prisma = c;
      return c;
    });
  }
  const result = (await globalForPrisma.__dbInitPromise) as PrismaClient | null;
  return result || getMemDb();
}

// ============= IN-MEMORY DB SHIM (matches Prisma subset API) =============

function getMemDb() {
  const store = getMemStore();

  return {
    purchase: {
      async create({ data }: { data: Partial<Purchase> }) {
        const p: Purchase = {
          id: data.id || `mem_p_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          name: data.name || "",
          email: data.email || "",
          mobile: data.mobile || "",
          location: data.location || "",
          course: data.course || "",
          courseLabel: data.courseLabel || "",
          amount: data.amount || 0,
          status: data.status || "PAID",
          createdAt: data.createdAt || new Date(),
        };
        store.purchases.unshift(p);
        return p;
      },
      async findMany({
        where,
        orderBy,
        take,
      }: {
        where?: Record<string, unknown>;
        orderBy?: Record<string, "asc" | "desc">;
        take?: number;
      } = {}) {
        let result = [...store.purchases];
        if (where?.course) result = result.filter((p) => p.course === where.course);
        if (where?.status) result = result.filter((p) => p.status === where.status);
        if (where?.OR) {
          const conditions = where.OR as Array<Record<string, { contains: string }>>;
          result = result.filter((p) =>
            conditions.some((c) =>
              Object.entries(c).some(([k, v]) =>
                String((p as never)[k] || "").includes(v.contains)
              )
            )
          );
        }
        if (orderBy?.createdAt === "desc") result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        if (orderBy?.createdAt === "asc") result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        if (take) result = result.slice(0, take);
        return result;
      },
      async count() {
        return store.purchases.length;
      },
      async delete({ where }: { where: { id: string } }) {
        const idx = store.purchases.findIndex((p) => p.id === where.id);
        if (idx >= 0) {
          const [removed] = store.purchases.splice(idx, 1);
          return removed;
        }
        throw new Error("Not found");
      },
    },
    lead: {
      async create({ data }: { data: Partial<Lead> }) {
        const l: Lead = {
          id: data.id || `mem_l_${Date.now()}`,
          name: data.name || "",
          phone: data.phone || "",
          course: data.course || "",
          createdAt: new Date(),
        };
        store.leads.unshift(l);
        return l;
      },
    },
    $executeRawUnsafe: async () => 0,
    $disconnect: async () => {},
    _isMem: true,
  } as unknown as PrismaClient;
}

// For local dev (sync): initialize immediately if SQLite is usable
export const db: PrismaClient = (() => {
  const sqliteUrl = process.env.DATABASE_URL || "";
  const pgUrl =
    process.env.POSTGRES_DATABASE_URL ||
    process.env.DATABASE_URL_NONSQLITE ||
    "";

  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  // Local dev / sandbox: SQLite file: URL — only if writable
  if (canUseSqlite(sqliteUrl) && !pgUrl) {
    try {
      const c = new PrismaClient({ log: ["query"] });
      globalForPrisma.prisma = c;
      return c;
    } catch (e) {
      console.error("Local SQLite init failed, falling back to in-memory", e);
    }
  }

  // No DB or PostgreSQL URL: use in-memory shim
  if (!pgUrl) {
    return getMemDb();
  }

  // Production Postgres path — async init via getDb() in handlers
  const dummy = {} as PrismaClient;
  return new Proxy(dummy, {
    get(_t, prop) {
      return function (...args: unknown[]) {
        return getDb().then((c) => {
          const fn = (c as never as Record<string | symbol, unknown>)[prop];
          if (typeof fn !== "function") {
            throw new Error(`Prisma property ${String(prop)} is not a function`);
          }
          return (fn as (...a: unknown[]) => unknown).apply(c, args);
        });
      };
    },
  });
})();
