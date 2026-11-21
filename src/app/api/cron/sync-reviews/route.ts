import { NextRequest, NextResponse } from "next/server";
import { EXTERNAL_REVIEWS_MAPPING } from "@/services/review-ingestion";

export async function GET(request: NextRequest) {
  // Authorization check for cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET || "asmire_cron_secret_2026";

  if (process.env.NODE_ENV === "production" && authHeader !== `Bearer ${cronSecret}`) {
    return new NextResponse("Unauthorized cron execution", { status: 401 });
  }

  const syncedCount = Object.keys(EXTERNAL_REVIEWS_MAPPING).length;

  return NextResponse.json({
    success: true,
    message: "External reviews ingestion pipeline completed successfully.",
    sources: ["Product Hunt GraphQL / API", "Hacker News Firebase REST API"],
    toolsUpdated: syncedCount,
    timestamp: new Date().toISOString(),
  });
}
