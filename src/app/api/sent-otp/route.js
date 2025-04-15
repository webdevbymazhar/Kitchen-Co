import User from "@/models/user";
import { connectMongoDB } from "../../../../lib/connect";
import generateOtp from "../../../../utils/otpGenerator";
import { sendMail } from "../../../../utils/mailer";

// pages/api/send-otp.js

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    await connectMongoDB();

    const otp = generateOtp();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5-minute expiration

    try {
      // Store OTP and expiration in the database with the user
      await User.updateOne(
        { email },
        { $set: { otp, otpExpiry } },
        { upsert: true }
      );

      await sendMail(email, "Your OTP Code", `Your OTP code is: ${otp}`);

      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: "Error sending OTP" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
