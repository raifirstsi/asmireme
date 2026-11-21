import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { auditLogs } from "@/db/schema";
import { DETAILED_REVIEWS_DATASET } from "@/data/reviews-dataset";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const toolSlug = searchParams.get("tool");
  const platform = searchParams.get("platform");

  let results = [...DETAILED_REVIEWS_DATASET];
  if (toolSlug && toolSlug !== "all") {
    results = results.filter((r) => r.toolSlug === toolSlug);
  }
  if (platform && platform !== "all") {
    results = results.filter((r) => r.source === platform);
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    reviews: results,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { toolSlug, authorName, authorRole, rating, pros, cons, content } = body;

    if (!toolSlug || !authorName || !content) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Persist new user community review into audit_logs table
    try {
      await db.insert(auditLogs).values({
        action: "COMMUNITY_REVIEW_SUBMITTED",
        entityType: "TOOL_REVIEW",
        entityId: toolSlug,
        metadata: {
          authorName,
          authorRole,
          rating: Number(rating) || 5,
          pros,
          cons,
          content,
          submittedAt: new Date().toISOString(),
        },
      });
    } catch (dbErr: any) {
      console.warn("Review DB logging:", dbErr?.message);
    }

    return NextResponse.json({
      success: true,
      message: "Review successfully submitted and recorded.",
      review: {
        id: `user_rev_${Date.now()}`,
        toolSlug,
        authorName,
        rating,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process review" },
      { status: 500 }
    );
  }
}
