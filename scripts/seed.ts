// Run: bun run /home/z/my-project/scripts/seed.ts
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

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
];

const LOCATIONS = [
  "Kolkata, WB", "Howrah, WB", "Durgapur, WB", "Siliguri, WB", "Asansol, WB",
  "Midnapore, WB", "Burdwan, WB", "Malda, WB", "Baharampur, WB", "Kharagpur, WB",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randPhone() {
  let s = "9";
  for (let i = 0; i < 9; i++) s += Math.floor(Math.random() * 10);
  return s;
}

async function main() {
  // Clear existing purchases
  await db.purchase.deleteMany({});
  await db.lead.deleteMany({});

  // Generate 30 demo purchases spread over last 7 days
  // Mix of PAID (24) and PENDING (6) statuses
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const c = pick(COURSES);
    const n = pick(NAMES);
    const initials = n.split(" ").map((p) => p[0]).join("").toLowerCase();
    const ageDays = Math.floor(Math.random() * 7);
    const ageHours = Math.floor(Math.random() * 24);
    const created = new Date(now);
    created.setDate(created.getDate() - ageDays);
    created.setHours(created.getHours() - ageHours);

    // First 24 are PAID, last 6 are PENDING (recent submissions awaiting payment)
    const status = i < 24 ? "PAID" : "PENDING";

    await db.purchase.create({
      data: {
        name: n,
        email: `${initials}${Math.floor(Math.random() * 9999)}@gmail.com`.toLowerCase(),
        mobile: randPhone(),
        location: pick(LOCATIONS),
        course: c.code,
        courseLabel: c.label,
        amount: c.amount,
        status,
        createdAt: created,
      },
    });
  }

  // A few demo leads
  for (let i = 0; i < 5; i++) {
    await db.lead.create({
      data: {
        name: pick(NAMES),
        phone: randPhone(),
        course: pick(["D.Pharm 1st Year", "D.Pharm 2nd Year", "Both (Combo Pack)"]),
      },
    });
  }

  const count = await db.purchase.count();
  console.log(`✓ Seeded ${count} demo purchases`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
