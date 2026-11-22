import { NextRequest, NextResponse } from "next/server";
import { verifyOtpCode, createSessionToken } from "@/services/auth";
import { generateReferralCode } from "@/lib/referral";
import { db } from "@/db";
import { users, memberProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { success: false, message: "Email and code are required." },
        { status: 400 }
      );
    }

    const isValid = verifyOtpCode(email, code);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired verification code. Please try again." },
        { status: 401 }
      );
    }

    // Provision or look up user in DB / memory
    const normalizedEmail = email.toLowerCase().trim();
    let userId = "usr-" + Buffer.from(normalizedEmail).toString("hex").slice(0, 12);
    let memberId = "mem-" + Buffer.from(normalizedEmail).toString("hex").slice(0, 12);
    let referralCode = generateReferralCode();
    let userRole: "USER" | "MEMBER" | "ADMIN" = "MEMBER";

    const adminEmails = (process.env.ADMIN_EMAILS || "support@asmire.me,admin@asmire.me").toLowerCase().split(",").map(e => e.trim());
    if (adminEmails.includes(normalizedEmail) || normalizedEmail.startsWith("admin@")) {
      userRole = "ADMIN";
    }

    try {
      // Check existing user
      const existingUsers = await db.select().from(users).where(eq(users.email, normalizedEmail));
      if (existingUsers.length > 0) {
        userId = existingUsers[0].id;
        if (existingUsers[0].role === "ADMIN") {
          userRole = "ADMIN";
        }
        const profile = await db.select().from(memberProfiles).where(eq(memberProfiles.userId, userId));
        if (profile.length > 0) {
          memberId = profile[0].id;
          referralCode = profile[0].referralCode;
        }
      } else {
        // Create new user & profile
        const [newUser] = await db.insert(users).values({
          email: normalizedEmail,
          role: userRole,
        }).returning();
        userId = newUser.id;

        const [newProfile] = await db.insert(memberProfiles).values({
          userId: newUser.id,
          referralCode,
          status: "ACTIVE",
        }).returning();
        memberId = newProfile.id;
      }
    } catch (dbErr) {
      console.warn("[Auth] DB sync skipped (using stateless session fallback):", (dbErr as Error).message);
    }

    // Issue session token
    const token = createSessionToken({
      userId,
      email: normalizedEmail,
      role: userRole,
      memberId,
      referralCode,
    });

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
      redirect: "/en/account",
    });

    // Set secure HTTP-only session cookie
    response.cookies.set("asmire_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Authentication failed." },
      { status: 500 }
    );
  }
}
