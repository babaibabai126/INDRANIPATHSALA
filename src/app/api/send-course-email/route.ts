import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import nodemailer from "nodemailer";

/**
 * POST /api/send-course-email
 *
 * Called after payment is confirmed.
 * Sends course PDF download links to the user's submitted email.
 *
 * Body: { purchaseId: string }
 *
 * Email uses Hostinger SMTP (info@indranipathsala.com).
 * Requires GMAIL_APP_PASSWORD env var (Gmail App Password, not regular password).
 */

// Google Drive folder links for each course (NOTES ONLY — recorded class is separate)
const COURSE_LINKS: Record<string, { folder: string; label: string; driveUrl: string }> = {
  "1en": {
    folder: "1st Year — Only English",
    label: "1st Year (Only English Version) ₹999",
    driveUrl: "https://drive.google.com/drive/folders/10bd7ltAYvgWereSRlbcvmpP62xg3w4tU?usp=sharing",
  },
  "1combo": {
    folder: "1st Year — English + Bengali (Combo)",
    label: "1st Year (English + Bengali Translation (Combo)) ₹1499",
    driveUrl: "https://drive.google.com/drive/folders/1mr58yom0DYw2Fsdtiw6UOkofzFEcZGMg?usp=sharing",
  },
  "2en": {
    folder: "2nd Year — Only English",
    label: "2nd Year (Only English Version) ₹999",
    driveUrl: "https://drive.google.com/drive/folders/16f_3fNfFToLnAES4mn8vtAAVdFFIQg4h",
  },
  "2combo": {
    folder: "2nd Year — English + Bengali (Combo)",
    label: "2nd Year (English + Bengali Translation (Combo)) ₹1499",
    driveUrl: "https://drive.google.com/drive/folders/1FD3WD7812KOTSjjSfen53vAvSDrrKKKz?usp=sharing",
  },
  // Recorded Class courses (separate product — separate email)
  "rc1en": {
    folder: "1st Year Recorded Class",
    label: "1st Year Recorded Class Access ₹1",
    driveUrl: "https://drive.google.com/drive/folders/1Sfd5W8hnRWGR7Vc7eyylJ6axlAZNGr_O?usp=drive_link",
  },
  "rc2en": {
    folder: "2nd Year Recorded Class",
    label: "2nd Year Recorded Class Access ₹2",
    driveUrl: "https://drive.google.com/drive/folders/1ye8W5a0oQNq1hfhP3dBRZyCxdc4hzkS4?usp=drive_link",
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { purchaseId } = body as { purchaseId?: string };

    if (!purchaseId) {
      return NextResponse.json({ error: "purchaseId is required" }, { status: 400 });
    }

    const db = await getDb();
    const purchase = await db.purchase.findUnique({ where: { id: purchaseId } });

    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }

    // Mark as PAID
    await db.purchase.update({
      where: { id: purchaseId },
      data: { status: "PAID" },
    });

    const courseInfo = COURSE_LINKS[purchase.course];
    if (!courseInfo) {
      return NextResponse.json({ error: "Invalid course" }, { status: 400 });
    }

    // Create email transporter using Hostinger SMTP
    const smtpUser = process.env.HOSTINGER_EMAIL || "info@indranipathsala.com";
    const smtpPass = process.env.HOSTINGER_PASSWORD;

    if (!smtpPass) {
      console.error("HOSTINGER_PASSWORD env var not set — cannot send email");
      // Still mark as PAID, just skip email
      return NextResponse.json({
        ok: true,
        warning: "Purchase marked as PAID but email could not be sent (HOSTINGER_PASSWORD not configured)",
        purchaseId,
        driveUrl: courseInfo.driveUrl,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // HTML email body
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#c8901f,#f08a3e);padding:30px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:24px;">Indrani Pathsala</h1>
        <p style="color:#fff;margin:5px 0 0;font-size:13px;opacity:0.9;">ইন্দ্রাণী পাঠশালা · D.Pharm Premium Notes</p>
      </div>

      <!-- Body -->
      <div style="padding:30px;">
        <h2 style="color:#2a1f10;margin:0 0 15px;font-size:20px;">Payment সফল হয়েছে! 🎉</h2>
        <p style="color:#4a4a4a;font-size:15px;line-height:1.6;">
          প্রিয় <strong>${purchase.name}</strong>,
        </p>
        <p style="color:#4a4a4a;font-size:15px;line-height:1.6;">
          আপনার <strong>${courseInfo.label}</strong> কোর্সের পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।
          নিচের লিংক থেকে আপনার সম্পূর্ণ নোটস এবং রেকর্ডেড ক্লাস অ্যাক্সেস করুন:
        </p>

        <!-- Notes Download button -->
        <div style="text-align:center;margin:25px 0;">
          <a href="${courseInfo.driveUrl}" target="_blank" style="display:inline-block;background:#c8901f;color:#fff;text-decoration:none;padding:14px 35px;border-radius:8px;font-size:16px;font-weight:bold;">
            📥 নোটস ডাউনলোড করুন
          </a>
        </div>

        <p style="color:#4a4a4a;font-size:14px;line-height:1.6;">
          উপরের বাটনে ক্লিক করলে Google Drive ফোল্ডার খুলবে যেখানে সব subject-এর PDF আছে।
          প্রতিটি ফাইল আলাদাভাবে ডাউনলোড করতে পারবেন।
        </p>

        <!-- Order details -->
        <div style="background:#f9f9f9;border-radius:8px;padding:15px;margin:20px 0;">
          <h3 style="color:#2a1f10;margin:0 0 10px;font-size:14px;">Order Details:</h3>
          <table style="width:100%;font-size:13px;color:#4a4a4a;">
            <tr><td style="padding:3px 0;">Name:</td><td style="font-weight:bold;">${purchase.name}</td></tr>
            <tr><td style="padding:3px 0;">Email:</td><td style="font-weight:bold;">${purchase.email}</td></tr>
            <tr><td style="padding:3px 0;">Mobile:</td><td style="font-weight:bold;">${purchase.mobile}</td></tr>
            <tr><td style="padding:3px 0;">Course:</td><td style="font-weight:bold;">${courseInfo.label}</td></tr>
            <tr><td style="padding:3px 0;">Amount:</td><td style="font-weight:bold;">₹${purchase.amount}</td></tr>
            <tr><td style="padding:3px 0;">Status:</td><td style="font-weight:bold;color:#10b981;">PAID ✅</td></tr>
          </table>
        </div>

        <!-- Contact -->
        <div style="border-top:1px solid #eee;padding-top:20px;margin-top:20px;">
          <p style="color:#666;font-size:12px;margin:0;">
            যেকোনো সমস্যায় যোগাযোগ করুন:<br>
            📞 <strong>8293742022</strong> | ✉️ <strong>info@indranipathsala.com</strong>
          </p>
          <p style="color:#999;font-size:11px;margin:10px 0 0;">
            © 2026 Indrani Pathsala. All rights reserved.<br>
            Developed by Aarohan Tech Solutions
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Indrani Pathsala" <${smtpUser}>`,
      to: purchase.email,
      subject: `✅ Your ${courseInfo.label} Notes — Indrani Pathsala`,
      html: htmlBody,
    });

    console.log(`✅ Email sent to ${purchase.email} for purchase ${purchaseId}`);

    return NextResponse.json({
      ok: true,
      message: "Email sent successfully",
      purchaseId,
      email: purchase.email,
      courseLabel: courseInfo.label,
      driveUrl: courseInfo.driveUrl,
      userName: purchase.name,
    });
  } catch (e) {
    console.error("send-course-email error", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
