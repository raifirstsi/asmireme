import { NextRequest, NextResponse } from "next/server";
import { verifyOtpCode, createSessionToken } from "@/services/auth";
import { generateReferralCode } from "@/lib/referral";
import { db } from "@/db";
import { users, memberProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notifyNewUserSignUp } from "@/services/telegram";

export async function POST(request: NextRequest) {
  try {
    const { email, code, redirectUrl, locale } = await request.json();

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

    // Super Admin check: striverle@gmail.com is hardcoded authorized owner
    const adminEmails = (process.env.ADMIN_EMAILS || "striverle@gmail.com,support@asmire.me,admin@asmire.me")
      .toLowerCase()
      .split(",")
      .map((e) => e.trim());

    if (
      normalizedEmail === "striverle@gmail.com" ||
      adminEmails.includes(normalizedEmail) ||
      normalizedEmail.startsWith("admin@")
    ) {
      userRole = "ADMIN";
    }

    let isNewUser = false;
    try {
      // Check existing user
      const existingUsers = await db.select().from(users).where(eq(users.email, normalizedEmail));
      if (existingUsers.length > 0) {
        userId = existingUsers[0].id;
        
        // Upgrade role to ADMIN if verified as super-admin email
        if (userRole === "ADMIN" && existingUsers[0].role !== "ADMIN") {
          await db.update(users).set({ role: "ADMIN", updatedAt: new Date() }).where(eq(users.id, userId));
        } else if (existingUsers[0].role === "ADMIN") {
          userRole = "ADMIN";
        }

        const profile = await db.select().from(memberProfiles).where(eq(memberProfiles.userId, userId));
        if (profile.length > 0) {
          memberId = profile[0].id;
          referralCode = profile[0].referralCode;
        }
      } else {
        isNewUser = true;
        // Create new user & profile
        const [newUser] = await db
          .insert(users)
          .values({
            email: normalizedEmail,
            role: userRole,
          })
          .returning();
        userId = newUser.id;

        const [newProfile] = await db
          .insert(memberProfiles)
          .values({
            userId: newUser.id,
            referralCode,
            status: "ACTIVE",
          })
          .returning();
        memberId = newProfile.id;
      }
    } catch (dbErr) {
      console.warn("[Auth] DB sync skipped (using stateless session fallback):", (dbErr as Error).message);
    }

    // Send instant Telegram notification to Admin if a new member signed up
    if (isNewUser) {
      notifyNewUserSignUp({
        email: normalizedEmail,
        userId,
        role: userRole,
        referralCode,
      }).catch((tgErr) => console.warn("[Telegram] Sign-up alert error:", tgErr?.message));
    }

    // Issue cryptographic session token
    const token = createSessionToken({
      userId,
      email: normalizedEmail,
      role: userRole,
      memberId,
      referralCode,
    });

    // Compute intelligent destination route
    const targetLocale = locale || "vi";
    let redirectDestination = userRole === "ADMIN" 
      ? `/${targetLocale}/admin` 
      : `/${targetLocale}/account`;

    if (redirectUrl && typeof redirectUrl === "string") {
      // For non-admin, block unauthorized redirect into /admin
      if (userRole !== "ADMIN" && redirectUrl.includes("/admin")) {
        redirectDestination = `/${targetLocale}/account`;
      } else {
        redirectDestination = redirectUrl;
      }
    }

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
      role: userRole,
      redirect: redirectDestination,
    });

    // Set secure HTTP-only session cookie (30 days)
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
