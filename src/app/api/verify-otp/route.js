import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectMongoDB } from "../../../../lib/connect";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    // Check if OTP is correct and not expired
    if (user.otp === otp && user.otpExpiresAt > Date.now()) {
      user.isVerified = true;
      user.otp = null; // Clear OTP after verification
      user.otpExpiresAt = null;
      await user.save();

      return NextResponse.json(
        { message: "OTP verified successfully. Registration complete." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid or expired OTP." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { message: "An error occurred during OTP verification." },
      { status: 500 }
    );
  }
}
