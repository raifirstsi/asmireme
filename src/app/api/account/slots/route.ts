import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/services/auth";
import { validateMemberAffiliateLink } from "@/lib/allowlist";
import { getToolBySlug } from "@/data/tools-data";
import { getUserSubscriptionStatus } from "@/services/billing";
import { db } from "@/db";
import { activeToolSlots, memberAffiliateLinks } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("asmire_session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const sessionUser = verifySessionToken(sessionCookie);
    if (!sessionUser) {
      return NextResponse.json({ success: false, message: "Invalid session" }, { status: 401 });
    }

    const userId = sessionUser.userId;
    const subStatus = await getUserSubscriptionStatus(userId);
    const maxSlots = subStatus.isPro ? 50 : 3;

    // Fetch existing slots
    const userSlots = await db
      .select()
      .from(activeToolSlots)
      .where(eq(activeToolSlots.userId, userId));

    // Fetch existing affiliate links
    const userLinks = await db
      .select()
      .from(memberAffiliateLinks)
      .where(eq(memberAffiliateLinks.userId, userId));

    const linksMap = new Map<string, string>();
    userLinks.forEach((l) => {
      if (l.status === "VALID" && l.affiliateUrl) {
        linksMap.set(l.toolSlug, l.affiliateUrl);
      }
    });

    // Build standard slot list (1..3)
    const resultSlots = [];
    for (let i = 1; i <= maxSlots; i++) {
      const found = userSlots.find((s) => s.slotIndex === i);
      if (found) {
        const link = linksMap.get(found.toolSlug) || "";
        resultSlots.push({
          slotIndex: i,
          toolSlug: found.toolSlug,
          affiliateUrl: link,
          status: link ? ("VALID" as const) : ("EMPTY" as const),
          lastSwappedAt: found.lastSwappedAt ? found.lastSwappedAt.toISOString().slice(0, 10) : "",
        });
      } else {
        resultSlots.push({
          slotIndex: i,
          toolSlug: "",
          affiliateUrl: "",
          status: "EMPTY" as const,
          lastSwappedAt: "",
        });
      }
    }

    return NextResponse.json({
      success: true,
      slots: resultSlots,
      isPro: subStatus.isPro,
    });
  } catch (error: any) {
    console.error("[Account Slots] GET error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to load slots" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("asmire_session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const sessionUser = verifySessionToken(sessionCookie);
    if (!sessionUser) {
      return NextResponse.json({ success: false, message: "Invalid session" }, { status: 401 });
    }

    const userId = sessionUser.userId;
    const body = await request.json();
    const { slotIndex, toolSlug, affiliateUrl } = body;

    if (!slotIndex || typeof slotIndex !== "number" || slotIndex < 1) {
      return NextResponse.json({ success: false, message: "Invalid slot index." }, { status: 400 });
    }

    const subStatus = await getUserSubscriptionStatus(userId);
    const maxSlots = subStatus.isPro ? 50 : 3;
    if (slotIndex > maxSlots) {
      return NextResponse.json(
        { success: false, message: `Your current plan allows maximum ${maxSlots} active slots. Upgrade to Pro for unlimited slots.` },
        { status: 403 }
      );
    }

    if (!toolSlug || typeof toolSlug !== "string") {
      return NextResponse.json({ success: false, message: "Please select a valid tool." }, { status: 400 });
    }

    const tool = getToolBySlug(toolSlug);
    if (!tool) {
      return NextResponse.json({ success: false, message: "Tool not found in catalog." }, { status: 404 });
    }

    if (!affiliateUrl || typeof affiliateUrl !== "string") {
      return NextResponse.json({ success: false, message: "Affiliate URL is required." }, { status: 400 });
    }

    // Validate using strict domain and security allowlist
    const validation = validateMemberAffiliateLink(toolSlug, affiliateUrl);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, message: validation.error || "Invalid affiliate link." },
        { status: 400 }
      );
    }

    const canonicalSlug = tool.slug;
    const normalizedUrl = validation.normalizedUrl!;
    const now = new Date();

    // 1. Upsert activeToolSlots
    const existingSlot = await db
      .select()
      .from(activeToolSlots)
      .where(and(eq(activeToolSlots.userId, userId), eq(activeToolSlots.slotIndex, slotIndex)));

    if (existingSlot.length > 0) {
      await db
        .update(activeToolSlots)
        .set({
          toolSlug: canonicalSlug,
          lastSwappedAt: now,
        })
        .where(eq(activeToolSlots.id, existingSlot[0].id));
    } else {
      await db.insert(activeToolSlots).values({
        userId,
        toolSlug: canonicalSlug,
        slotIndex,
        selectedAt: now,
        lastSwappedAt: now,
      });
    }

    // 2. Upsert memberAffiliateLinks
    const existingLink = await db
      .select()
      .from(memberAffiliateLinks)
      .where(and(eq(memberAffiliateLinks.userId, userId), eq(memberAffiliateLinks.toolSlug, canonicalSlug)));

    let finalHost = "";
    try {
      finalHost = new URL(normalizedUrl).hostname;
    } catch {
      finalHost = "unknown";
    }

    if (existingLink.length > 0) {
      await db
        .update(memberAffiliateLinks)
        .set({
          affiliateUrl: normalizedUrl,
          status: "VALID",
          finalHost,
          validatedAt: now,
          updatedAt: now,
        })
        .where(eq(memberAffiliateLinks.id, existingLink[0].id));
    } else {
      await db.insert(memberAffiliateLinks).values({
        userId,
        toolSlug: canonicalSlug,
        affiliateUrl: normalizedUrl,
        network: tool.affiliateNetwork || "Custom",
        status: "VALID",
        finalHost,
        validatedAt: now,
        createdAt: now,
        updatedAt: now,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Affiliate link verified and slot saved successfully!",
      slot: {
        slotIndex,
        toolSlug: canonicalSlug,
        affiliateUrl: normalizedUrl,
        status: "VALID",
        lastSwappedAt: now.toISOString().slice(0, 10),
      },
    });
  } catch (error: any) {
    console.error("[Account Slots] POST error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save slot" },
      { status: 500 }
    );
  }
}
