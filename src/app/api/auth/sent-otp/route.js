import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import { connectMongoDB } from '../../../../../lib/connect';
import Otp from '@/models/Otp';

export async function POST(req, res) {
  const { email, userId } = await req.json();

  await connectMongoDB();

  // Generate OTP
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

  // Store OTP in MongoDB
  await Otp.create({ userId, otp });

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // Adjust this based on your email provider
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Send OTP via email
  await transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  });

  return res.json({ message: 'OTP sent to email' });
}
