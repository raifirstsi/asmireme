import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { reviewEvidences } from "@/db/schema";
import { verifySessionToken } from "@/services/auth";
import { eq } from "drizzle-orm";
import fs from "fs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionCookie = request.cookies.get("asmire_session")?.value;
  const user = sessionCookie ? verifySessionToken(sessionCookie) : null;

  // STRICT ZERO-LEAK ACCESS CONTROL: Only authenticated Admins can inspect uploaded invoices
  if (!user || user.role !== "ADMIN") {
    return new NextResponse("Unauthorized. Private evidence access strictly restricted to Admins.", {
      status: 401,
    });
  }

  const { id } = await params;

  try {
    const records = await db.select().from(reviewEvidences).where(eq(reviewEvidences.id, id));
    if (records.length === 0) {
      return new NextResponse("Evidence not found", { status: 404 });
    }

    const evidence = records[0];
    const filePath = evidence.evidenceFilePathPrivate;

    if (!fs.existsSync(filePath)) {
      return new NextResponse("Evidence file not found on disk", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": evidence.mimeType || "application/octet-stream",
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "private, no-store, must-revalidate",
        "Content-Disposition": `inline; filename="${evidence.fileNameOriginal}"`,
      },
    });
  } catch (error: any) {
    return new NextResponse(error.message || "Failed to read evidence", { status: 500 });
  }
}
