"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  IndianRupee,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Search,
  RefreshCw,
  Trash2,
  Download,
  ArrowLeft,
  Sun,
  Moon,
  CreditCard,
  Clock,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

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
  createdAt: string;
};

type Stats = {
  totalSales: number;
  totalStudents: number;
  todaySales: number;
  todayStudents: number;
  byCourse: Record<string, { count: number; revenue: number; label: string }>;
  last7Days: { date: string; sales: number; count: number }[];
};

const COURSE_FILTERS: { value: string; label: string }[] = [
  { value: "", label: "All Courses" },
  { value: "1en", label: "1st Year English" },
  { value: "1combo", label: "1st Year Combo" },
  { value: "2en", label: "2nd Year English" },
  { value: "2combo", label: "2nd Year Combo" },
];

const fmtINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const fmtDate = (s: string) => new Date(s).toLocaleString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default function AdminPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [course, setCourse] = useState("");
  const [selected, setSelected] = useState<Purchase | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (course) params.set("course", course);
      if (q) params.set("q", q);
      const [pRes, sRes] = await Promise.all([
        fetch(`/api/purchases?${params.toString()}`, { cache: "no-store" }),
        fetch("/api/stats", { cache: "no-store" }),
      ]);
      const pData = await pRes.json();
      const sData = await sRes.json();
      setPurchases(pData.purchases || []);
      setStats(sData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [course, q]);

  useEffect(() => {
    const t = setTimeout(refresh, 250);
    return () => clearTimeout(t);
  }, [refresh]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this purchase?")) return;
    await fetch(`/api/purchases?id=${id}`, { method: "DELETE" });
    setPurchases((p) => p.filter((x) => x.id !== id));
    refresh();
  };

  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Mobile", "Location", "Course", "Amount", "Status", "Date"],
      ...purchases.map((p) => [
        p.name, p.email, p.mobile, p.location, p.courseLabel,
        String(p.amount), p.status, fmtDate(p.createdAt),
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `indrani-pathsala-sales-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const maxDay = stats ? Math.max(...stats.last7Days.map((d) => d.sales), 1) : 1;

  return (
    <main className="min-h-screen bg-background">
      {/* Top admin bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-muted/50"
              title="Back to site"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="relative h-9 w-9 overflow-hidden rounded-lg ring-2 ring-primary/30">
              <Image src="/images/logo.jpeg" alt="Logo" fill sizes="36px" className="object-cover" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <LayoutDashboard className="h-4 w-4 text-primary" />
                Admin Dashboard
              </div>
              <div className="bn text-[10px] text-muted-foreground">ইন্দ্রানী পাঠশালা</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-muted/50"
              title="Refresh"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
            <ThemeToggle />
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90 sm:inline-flex"
            >
              View Site →
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Sales & Students</h1>
          <p className="bn mt-1 text-sm text-muted-foreground">
            কারা কারা payment সম্পূর্ণ করে course পেল এবং মোট কত টাকার sale হলো — এখানে দেখুন।
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={IndianRupee}
            label="Total Sales"
            value={stats ? fmtINR(stats.totalSales) : "—"}
            sub={`${stats?.totalStudents ?? 0} students`}
            color="#10b981"
          />
          <StatCard
            icon={Users}
            label="Total Students"
            value={stats ? String(stats.totalStudents) : "—"}
            sub="all paid purchases"
            color="#3b82f6"
          />
          <StatCard
            icon={Calendar}
            label="Today's Sales"
            value={stats ? fmtINR(stats.todaySales) : "—"}
            sub={`${stats?.todayStudents ?? 0} new today`}
            color="#facc15"
          />
          <StatCard
            icon={TrendingUp}
            label="Avg. Order Value"
            value={stats && stats.totalStudents > 0 ? fmtINR(Math.round(stats.totalSales / stats.totalStudents)) : "—"}
            sub="per student"
            color="#a855f7"
          />
        </div>

        {/* 7-day chart + by-course breakdown */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {/* 7-day bar chart */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground">Last 7 days sales</h3>
                <p className="bn text-[11px] text-muted-foreground">গত ৭ দিনের sale trend</p>
              </div>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="flex h-40 min-h-[160px] items-end justify-between gap-1.5 sm:gap-2">
              {stats?.last7Days.map((d, i) => (
                <div key={i} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full min-h-[4px] rounded-t-md bg-gradient-to-t from-primary to-accent-blue transition-all"
                      style={{
                        height: `${Math.max(4, (d.sales / maxDay) * 100)}%`,
                      }}
                      title={`${fmtINR(d.sales)} · ${d.count} students`}
                    />
                  </div>
                  <div className="text-[9px] text-muted-foreground">
                    {new Date(d.date).toLocaleDateString("en-IN", { weekday: "short" })}
                  </div>
                  <div className="text-[9px] font-semibold text-foreground">{fmtINR(d.sales)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Course breakdown */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-bold text-foreground">Sales by course</h3>
            <p className="bn text-[11px] text-muted-foreground">course-wise breakdown</p>
            <div className="mt-4 space-y-3">
              {stats &&
                Object.entries(stats.byCourse).map(([code, c]) => {
                  const total = stats.totalStudents || 1;
                  const pct = Math.round((c.count / total) * 100);
                  return (
                    <div key={code}>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="bn text-foreground/90">{c.label}</span>
                        <span className="font-mono font-semibold text-foreground">{c.count}</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent-blue"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="mt-0.5 text-[10px] text-muted-foreground">
                        {fmtINR(c.revenue)} · {pct}%
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Filter + Search row */}
        <div className="mt-8 mb-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name / email / phone / location..."
              className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          >
            {COURSE_FILTERS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-muted/50"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
          <div className="text-xs text-muted-foreground">
            {purchases.length} record{purchases.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Students table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/40 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Student</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Course</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                      <RefreshCw className="mx-auto mb-3 h-5 w-5 animate-spin" />
                      Loading purchases...
                    </td>
                  </tr>
                )}
                {!loading && purchases.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                      No purchases found. Try adjusting filters.
                    </td>
                  </tr>
                )}
                {!loading &&
                  purchases.map((p, i) => (
                    <tr
                      key={p.id}
                      className="cursor-pointer transition hover:bg-muted/30"
                      onClick={() => setSelected(p)}
                    >
                      <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                            {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{p.name}</div>
                            <div className="bn text-[10px] text-muted-foreground">{p.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-[12px] text-foreground/90">{p.email}</div>
                        <div className="font-mono text-[11px] text-muted-foreground">{p.mobile}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bn inline-block rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-foreground/80">
                          {p.courseLabel}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                        {fmtINR(p.amount)}
                      </td>
                      <td className="px-4 py-3 text-[11px] text-muted-foreground">
                        {fmtDate(p.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelected(p)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-muted/50"
                            title="View"
                          >
                            <Users className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-destructive/30 text-destructive transition hover:bg-destructive/10"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-base font-bold text-primary">
                  {selected.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selected.name}</h3>
                  <div className="bn text-[11px] text-muted-foreground">Student details</div>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted/50"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <DetailRow icon={Mail} label="Email" value={selected.email} />
              <DetailRow icon={Phone} label="Mobile" value={selected.mobile} />
              <DetailRow icon={MapPin} label="Location" value={selected.location} />
              <DetailRow icon={CreditCard} label="Course" value={selected.courseLabel} />
              <div className="flex items-center justify-between rounded-xl bg-emerald-500/10 px-4 py-3">
                <span className="bn text-xs text-muted-foreground">Amount Paid</span>
                <span className="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {fmtINR(selected.amount)}
                </span>
              </div>
              <DetailRow icon={Clock} label="Payment Date" value={fmtDate(selected.createdAt)} />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Status</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  ● {selected.status}
                </span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <a
                href={`mailto:${selected.email}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground hover:opacity-90"
              >
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
              <a
                href={`tel:${selected.mobile}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-bold text-foreground hover:bg-muted/50"
              >
                <Phone className="h-3.5 w-3.5" /> Call
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ background: `${color}20`, color }}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 text-xl font-extrabold text-foreground sm:text-2xl">{value}</div>
      <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="bn mt-0.5 text-[10px] text-muted-foreground">{sub}</div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
      <div className="min-w-0 flex-1">
        <div className="bn text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="break-all text-sm text-foreground">{value}</div>
      </div>
    </div>
  );
}
