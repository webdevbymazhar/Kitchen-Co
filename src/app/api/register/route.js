// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import User from "@/models/user";
// import { connectMongoDB } from "../../../../lib/connect";

// export async function POST(req) {
//   try {
//     // Destructure all necessary fields, including role, from the request body
//     const { name, email, password, address, profilePicture, orders, role } =
//       await req.json();

//     // Hash the password for security
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Connect to MongoDB
//     await connectMongoDB();

//     // Create a new user with all specified fields
//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       address,

//       profilePicture: profilePicture || "default-profile.png",
//       orders: orders || [],
//       role: role || "customer", // Default to 'customer' if not provided
//     });

//     return NextResponse.json(
//       { message: "User registered successfully." },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occurred while registering the user." },
//       { status: 500 }
//     );
//   }
// }

// /api/register.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connectMongoDB } from "../../../../lib/connect";
import generateOTP from "../../../../utils/otpGenerator";
import sendEmail from "../../../../utils/sendEmail"; // Helper function to send email

export async function POST(req) {
  try {
    const { name, email, password, address, profilePicture, orders, role } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();

    // Generate a 4-digit OTP and set an expiration time (e.g., 10 minutes)
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Create a new user with OTP and expiration time
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      profilePicture: profilePicture || "default-profile.png",
      orders: orders || [],
      role: role || "customer",
      otp,
      otpExpiresAt,
      isVerified: false
    });

    // Send OTP via email (or SMS if integrated)
    await sendEmail(email, `Your OTP is ${otp}`);

    return NextResponse.json(
      { message: "User registered successfully. Please verify OTP." },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
