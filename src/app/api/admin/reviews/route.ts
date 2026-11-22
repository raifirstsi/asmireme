import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { communityReviews, reviewEvidences, auditLogs } from "@/db/schema";
import { verifySessionToken } from "@/services/auth";
import { eq, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get("asmire_session")?.value;
  const user = sessionCookie ? verifySessionToken(sessionCookie) : null;

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ success: false, message: "Unauthorized. Admin access required." }, { status: 401 });
  }

  try {
    const reviews = await db
      .select({
        id: communityReviews.id,
        toolSlug: communityReviews.toolSlug,
        authorName: communityReviews.authorName,
        authorRole: communityReviews.authorRole,
        ratingOverall: communityReviews.ratingOverall,
        ratingValueForMoney: communityReviews.ratingValueForMoney,
        ratingEaseOfUse: communityReviews.ratingEaseOfUse,
        pros: communityReviews.pros,
        cons: communityReviews.cons,
        content: communityReviews.content,
        realMonthlyCostPaid: communityReviews.realMonthlyCostPaid,
        verificationStatus: communityReviews.verificationStatus,
        verifiedBadge: communityReviews.verifiedBadge,
        testingGrantAwarded: communityReviews.testingGrantAwarded,
        testingGrantAmount: communityReviews.testingGrantAmount,
        rewardPerks: communityReviews.rewardPerks,
        createdAt: communityReviews.createdAt,
      })
      .from(communityReviews)
      .orderBy(desc(communityReviews.createdAt));

    // Get evidence records
    const evidences = await db.select().from(reviewEvidences);
    const evidenceMap = new Map<string, typeof evidences[0]>();
    evidences.forEach((e) => evidenceMap.set(e.reviewId, e));

    const enrichedReviews = reviews.map((r) => {
      const ev = evidenceMap.get(r.id);
      return {
        ...r,
        evidence: ev
          ? {
              id: ev.id,
              evidenceType: ev.evidenceType,
              fileName: ev.fileNameOriginal,
              fileSize: ev.fileSizeBytes,
              mimeType: ev.mimeType,
              uploadedAt: ev.uploadedAt,
              viewUrl: `/api/admin/reviews/evidence/${ev.id}`,
            }
          : null,
      };
    });

    return NextResponse.json({
      success: true,
      total: enrichedReviews.length,
      reviews: enrichedReviews,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const sessionCookie = request.cookies.get("asmire_session")?.value;
  const user = sessionCookie ? verifySessionToken(sessionCookie) : null;

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ success: false, message: "Unauthorized. Admin access required." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { reviewId, action, grantTestingGrant, testingGrantAmount, rewardPerks } = body;

    if (!reviewId || !action) {
      return NextResponse.json({ success: false, message: "Missing reviewId or action" }, { status: 400 });
    }

    if (action === "APPROVE") {
      await db
        .update(communityReviews)
        .set({
          verificationStatus: "VERIFIED",
          verifiedBadge: true,
          testingGrantAwarded: !!grantTestingGrant,
          testingGrantAmount: grantTestingGrant ? Number(testingGrantAmount || 100) : null,
          rewardPerks: grantTestingGrant ? (rewardPerks || "Testing Grant $100 Awarded + 1-Year Asmire Pro") : null,
          updatedAt: new Date(),
        })
        .where(eq(communityReviews.id, reviewId));

      await db.insert(auditLogs).values({
        actorId: user.userId as any,
        action: "COMMUNITY_REVIEW_APPROVED",
        entityType: "COMMUNITY_REVIEW",
        entityId: reviewId,
        metadata: {
          approvedBy: user.email,
          grantTestingGrant: !!grantTestingGrant,
          testingGrantAmount: grantTestingGrant ? Number(testingGrantAmount || 100) : 0,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Review approved successfully with Verified Buyer badge.",
      });
    } else if (action === "REJECT") {
      await db
        .update(communityReviews)
        .set({
          verificationStatus: "REJECTED",
          verifiedBadge: false,
          updatedAt: new Date(),
        })
        .where(eq(communityReviews.id, reviewId));

      await db.insert(auditLogs).values({
        actorId: user.userId as any,
        action: "COMMUNITY_REVIEW_REJECTED",
        entityType: "COMMUNITY_REVIEW",
        entityId: reviewId,
        metadata: {
          rejectedBy: user.email,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Review rejected.",
      });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
