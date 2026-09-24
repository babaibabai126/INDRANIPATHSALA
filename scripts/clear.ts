// Run: bun run /home/z/my-project/scripts/clear.ts
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  console.log("Clearing all dummy data from Supabase...");
  const purchasesDeleted = await db.purchase.deleteMany({});
  const leadsDeleted = await db.lead.deleteMany({});
  console.log(`✓ Deleted ${purchasesDeleted.count} purchases`);
  console.log(`✓ Deleted ${leadsDeleted.count} leads`);
  console.log("Admin dashboard now empty — only real customer submissions will appear.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
