# Indrani Pathsala — D.Pharm Premium Suggestive Notes

A production-ready landing page + admin dashboard for Indrani Pathsala, an educational service selling D.Pharm Premium Suggestive Notes (with Bengali translation) to pharmacy students in West Bengal, India.

**Live URL:** https://indrani-pathsala.vercel.app/

## Features

### Public Website (`/`)
- **Hero section** with verbatim Bengali text from the user's spec
- **"আমাদের নোট এ কী বিশেষত্ব আছে?"** — 7 numbered features (i–vii)
- **"এই নোটস টি কাদের প্রয়োজন?"** — 9 numbered items (i–ix)
- **Sample Notes** with **View File popup** (Google Drive iframe) + Download button
- **"নোটস নিলে আপনার কী লাভ হবে?"** — 10 benefits (i–x)
- **Reviews** with Google Review link
- **Payment Process** — 3 steps
- **Pricing** — 4 plans (1st/2nd Year × English/Combo) at ₹999 and ₹1499
- **FAQ** — 7 Q&A in Bengali
- **Payment form** with in-page Razorpay popup (no redirect to other tab)
- **15 SEO blog posts** at `/blog` with individual article pages at `/blog/[slug]`
- **Floating WhatsApp + Call buttons** (always visible)
- **Footer** with "Developed by Aarohan Tech Solutions" link

### Admin Dashboard (`/admin/login` → `/admin`)
- **Admin login** with credentials (hidden from public site)
  - Username: `indrani_admin`
  - Password: `Pathsala@2026#Indrani`
- **5 stat cards**: Total Sales, Total Students, Today's Sales, Avg Order Value, Pending Payments
- **7-day sales bar chart** + course-wise breakdown
- **Student/purchase table** with search, filter, status badges (PAID green / PENDING amber)
- **Student detail modal** with "Mark as PAID" action for PENDING entries
- **Export CSV** for all purchases

### Payment Flow
1. User fills form → saved as **PENDING** in Supabase
2. PAY button opens in-page **PaymentModal** (iframe with Razorpay payment link)
3. User completes payment in popup
4. User clicks "আমি পরিশোধ করেছি" → backend confirms → status becomes **PAID**
5. PAID state shows PDF download button

## Tech Stack
- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** with single light theme (cream + amber)
- **Prisma ORM** with **Supabase Postgres**
- **Razorpay Payment Links** (rzp.io/rzp/...) embedded in iframe
- **Google Drive** for sample notes files
- **Vercel** for deployment

## Setup

### 1. Install dependencies
```bash
bun install
```

### 2. Configure environment
Create a `.env` file:
```
DATABASE_URL=postgresql://<your-supabase-connection-string>
```

### 3. Push database schema
```bash
bun run db:push
```

### 4. Seed demo data (optional)
```bash
bun run scripts/seed.ts
```

### 5. Run dev server
```bash
bun run dev
```

Visit http://localhost:3000

## Admin Credentials
- **URL:** `/admin/login` (not linked from public site)
- **Username:** `indrani_admin`
- **Password:** `Pathsala@2026#Indrani`

## Razorpay Configuration
Currently using Razorpay **Payment Links** (no API key needed):
- ₹999 plans → https://rzp.io/rzp/GtZpWok
- ₹1499 plans → https://rzp.io/rzp/mBBPn9cU

For full in-page Razorpay modal (with order creation on backend), you'll need to:
1. Get Razorpay Key ID + Key Secret from Razorpay dashboard
2. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to env vars
3. Create `/api/razorpay/order` route that creates an order via Razorpay API
4. Update PaymentModal to use `Razorpay` checkout JS with `order_id`

## Blog Posts (15 articles)
1. D.Pharm Exit Exam Complete Guide
2. PCI ER-2020 Syllabus Explained
3. Best D.Pharm Notes in Bengali
4. VVI MCQ Strategy for D.Pharm Exam
5. Pharmaceutics Chapter-wise Summary
6. Pharmacology Made Easy in Bengali
7. Year-Back Students Strategy
8. D.Pharm vs B.Pharm — Which is Right?
9. Smart Revision Techniques for Pharmacy
10. D.Pharm Career Opportunities 2026
11. Tablet & Capsule Formulation Guide
12. Drug Interactions in Clinical Pharmacy
13. Human Anatomy & Physiology for D.Pharm
14. Pharmacognosy — Herbal Medicine Guide
15. (Plus 1 more)

Each blog post is SEO-optimized with meta tags, individual URLs, and related articles.

## Contact
- **Phone:** +91 8293742022
- **Email:** indraniPathsala2026@gmail.com
- **WhatsApp:** https://wa.me/918293742022

## Developed by
**Aarohan Tech Solutions** — https://aarohantechsolutions.in

## License
© 2026 Indrani Pathsala. All rights reserved.
