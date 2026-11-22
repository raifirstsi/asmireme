import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { communityReviews, reviewEvidences, auditLogs } from "@/db/schema";
import { DETAILED_REVIEWS_DATASET, DetailedReviewItem } from "@/data/reviews-dataset";
import { getToolBySlug } from "@/data/tools-data";
import { verifySessionToken } from "@/services/auth";
import { notifyNewReviewSubmitted } from "@/services/telegram";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { eq, desc } from "drizzle-orm";

const PRIVATE_STORAGE_DIR = path.resolve(process.cwd(), "storage/private_evidences");

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const toolSlug = searchParams.get("tool");
  const platform = searchParams.get("platform");

  // 1. Fetch live community verified reviews from DB
  let dbVerifiedReviews: DetailedReviewItem[] = [];
  try {
    const query = db
      .select()
      .from(communityReviews)
      .where(eq(communityReviews.verificationStatus, "VERIFIED"))
      .orderBy(desc(communityReviews.createdAt));

    const rows = await query;
    dbVerifiedReviews = rows.map((r) => {
      const tool = getToolBySlug(r.toolSlug);
      return {
        id: `comm_${r.id}`,
        toolSlug: r.toolSlug,
        toolName: tool ? tool.name : r.toolSlug,
        author: r.authorName,
        role: r.authorRole,
        rating: r.ratingOverall,
        source: "COMMUNITY" as const,
        sourceUrl: `https://asmire.me/tools/${r.toolSlug}#community-reviews`,
        headline: `${tool ? tool.name : r.toolSlug}: Verified Real-World Experience (${r.realMonthlyCostPaid ? `$${r.realMonthlyCostPaid}/mo` : "Verified Cost"})`,
        content: r.content,
        pros: r.pros,
        cons: r.cons,
        helpfulCount: r.helpfulVotesCount,
        verifiedBuyer: r.verifiedBadge,
        syncDate: r.createdAt.toISOString().replace("T", " ").substring(0, 16),
        realMonthlyCostPaid: r.realMonthlyCostPaid ?? undefined,
        testingGrantAwarded: r.testingGrantAwarded,
        testingGrantAmount: r.testingGrantAmount ?? undefined,
        ratingValueForMoney: r.ratingValueForMoney,
        ratingEaseOfUse: r.ratingEaseOfUse,
        verificationStatus: r.verificationStatus as any,
      };
    });
  } catch (err: any) {
    console.warn("Error fetching community reviews from DB:", err?.message);
  }

  // 2. Merge Community Verified reviews at top, followed by aggregated dataset
  let results = [...dbVerifiedReviews, ...DETAILED_REVIEWS_DATASET];

  if (toolSlug && toolSlug !== "all") {
    results = results.filter((r) => r.toolSlug === toolSlug);
  }
  if (platform && platform !== "all") {
    results = results.filter((r) => r.source === platform);
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    communityCount: dbVerifiedReviews.length,
    reviews: results,
  });
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let toolSlug = "";
    let authorName = "";
    let authorRole = "";
    let ratingOverall = 5;
    let ratingValueForMoney = 5;
    let ratingEaseOfUse = 5;
    let realMonthlyCostPaid: number | null = null;
    let pros = "";
    let cons = "";
    let content = "";
    let evidenceFile: File | null = null;
    let evidenceType = "INVOICE_SCREENSHOT";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      toolSlug = (formData.get("toolSlug") as string) || "";
      authorName = (formData.get("authorName") as string) || "";
      authorRole = (formData.get("authorRole") as string) || "";
      ratingOverall = Number(formData.get("ratingOverall")) || 5;
      ratingValueForMoney = Number(formData.get("ratingValueForMoney")) || 5;
      ratingEaseOfUse = Number(formData.get("ratingEaseOfUse")) || 5;
      const costRaw = formData.get("realMonthlyCostPaid");
      realMonthlyCostPaid = costRaw ? Number(costRaw) : null;
      pros = (formData.get("pros") as string) || "";
      cons = (formData.get("cons") as string) || "";
      content = (formData.get("content") as string) || "";
      evidenceType = (formData.get("evidenceType") as string) || "INVOICE_SCREENSHOT";
      evidenceFile = formData.get("evidenceFile") as File | null;
    } else {
      const body = await request.json();
      toolSlug = body.toolSlug || "";
      authorName = body.authorName || "";
      authorRole = body.authorRole || "";
      ratingOverall = Number(body.ratingOverall || body.rating) || 5;
      ratingValueForMoney = Number(body.ratingValueForMoney) || 5;
      ratingEaseOfUse = Number(body.ratingEaseOfUse) || 5;
      realMonthlyCostPaid = body.realMonthlyCostPaid ? Number(body.realMonthlyCostPaid) : null;
      pros = body.pros || "";
      cons = body.cons || "";
      content = body.content || "";
      evidenceType = body.evidenceType || "INVOICE_SCREENSHOT";
    }

    if (!toolSlug || !authorName || !content) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (toolSlug, authorName, content)." },
        { status: 400 }
      );
    }

    // Optional user session identification
    const sessionCookie = request.cookies.get("asmire_session")?.value;
    const sessionUser = sessionCookie ? verifySessionToken(sessionCookie) : null;

    // Has evidence file?
    let privateFilePath = "";
    let originalName = "";
    let fileSize = 0;
    let mimeType = "";

    if (evidenceFile && evidenceFile.size > 0) {
      // Security validations
      const allowedMimes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
      if (!allowedMimes.includes(evidenceFile.type)) {
        return NextResponse.json(
          { success: false, message: "Invalid evidence format. Allowed: PNG, JPG, WEBP, PDF." },
          { status: 400 }
        );
      }

      if (evidenceFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, message: "File exceeds 5MB limit." },
          { status: 400 }
        );
      }

      // Ensure directory exists
      if (!fs.existsSync(PRIVATE_STORAGE_DIR)) {
        fs.mkdirSync(PRIVATE_STORAGE_DIR, { recursive: true });
      }

      const ext = path.extname(evidenceFile.name) || ".png";
      const randomKey = crypto.randomBytes(12).toString("hex");
      const safeFilename = `inv_${Date.now()}_${randomKey}${ext}`;
      privateFilePath = path.join(PRIVATE_STORAGE_DIR, safeFilename);

      const arrayBuffer = await evidenceFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(privateFilePath, buffer);

      originalName = evidenceFile.name;
      fileSize = evidenceFile.size;
      mimeType = evidenceFile.type;
    }

    // If evidence uploaded, mark PENDING for Admin verification; if no evidence, can be auto-approved without Verified badge
    const initialStatus = privateFilePath ? "PENDING" : "VERIFIED";
    const verifiedBadge = false;

    // Insert into DB
    let newReviewId = "";
    try {
      const [insertedReview] = await db
        .insert(communityReviews)
        .values({
          toolSlug,
          userId: sessionUser?.userId ? (sessionUser.userId as any) : null,
          authorName,
          authorRole: authorRole || "Verified Professional",
          ratingOverall,
          ratingValueForMoney,
          ratingEaseOfUse,
          pros: pros || "N/A",
          cons: cons || "N/A",
          content,
          realMonthlyCostPaid,
          verificationStatus: initialStatus,
          verifiedBadge,
          testingGrantAwarded: false,
          helpfulVotesCount: 0,
        })
        .returning({ id: communityReviews.id });

      newReviewId = insertedReview.id;

      // If evidence uploaded, record in private reviewEvidences
      if (privateFilePath && newReviewId) {
        await db.insert(reviewEvidences).values({
          reviewId: newReviewId,
          evidenceType,
          evidenceFilePathPrivate: privateFilePath,
          fileNameOriginal: originalName,
          fileSizeBytes: fileSize,
          mimeType,
        });
      }

      // Record audit log
      await db.insert(auditLogs).values({
        actorId: sessionUser?.userId ? (sessionUser.userId as any) : null,
        action: privateFilePath ? "COMMUNITY_REVIEW_WITH_EVIDENCE_SUBMITTED" : "COMMUNITY_REVIEW_SUBMITTED",
        entityType: "COMMUNITY_REVIEW",
        entityId: newReviewId || toolSlug,
        metadata: {
          toolSlug,
          authorName,
          hasPrivateEvidence: !!privateFilePath,
          realMonthlyCostPaid,
          submittedAt: new Date().toISOString(),
        },
      });

      // Send instant Telegram notification to Admin
      const toolInfo = getToolBySlug(toolSlug);
      notifyNewReviewSubmitted({
        toolName: toolInfo ? toolInfo.name : toolSlug,
        toolSlug,
        authorName,
        authorRole,
        ratingOverall,
        realMonthlyCostPaid,
        hasEvidence: !!privateFilePath,
        fileNameOriginal: originalName,
        fileSizeBytes: fileSize,
        reviewId: newReviewId || "unknown",
      }).catch((tgErr) => console.warn("[Telegram] Non-blocking alert error:", tgErr?.message));
    } catch (dbErr: any) {
      console.error("Database insert error for community review:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: privateFilePath
        ? "Đánh giá và hóa đơn đối soát của bạn đã được tiếp nhận an toàn. Ban biên tập sẽ xác thực và cấp Huy Hiệu Verified Buyer cùng Quỹ Kiểm Thử (Testing Grants) trong vòng 24 giờ."
        : "Đánh giá của bạn đã được ghi nhận thành công.",
      reviewId: newReviewId,
      status: initialStatus,
    });
  } catch (error: any) {
    console.error("Review processing failed:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process review" },
      { status: 500 }
    );
  }
}
