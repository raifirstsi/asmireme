import { NextRequest, NextResponse } from "next/server";
import { syncAllToolReviews } from "@/services/review-ingestion";

async function handleSync(request: NextRequest) {
  // Authorization check for cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET || "asmire_cron_secret_2026";

  if (process.env.NODE_ENV === "production" && authHeader !== `Bearer ${cronSecret}`) {
    return new NextResponse("Unauthorized cron execution", { status: 401 });
  }

  try {
    const result = await syncAllToolReviews();
    return NextResponse.json({
      message: "10-Hour automated external review ingestion pipeline completed successfully.",
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to sync reviews",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return handleSync(request);
}

export async function POST(request: NextRequest) {
  return handleSync(request);
}
