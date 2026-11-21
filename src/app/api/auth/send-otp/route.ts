import { NextRequest, NextResponse } from "next/server";
import { sendOtpEmail } from "@/services/auth";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const result = await sendOtpEmail(email);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to dispatch verification code." },
      { status: 500 }
    );
  }
}
