import Otp from '@/models/Otp';
import { connectMongoDB } from '../../../../../lib/connect';

export async function POST(req, res) {
  const { userId, otp } = await req.json();

  await connectMongoDB();

  // Find OTP entry for the user
  const otpEntry = await Otp.findOne({ userId, otp });
  if (!otpEntry) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  // OTP is valid; remove it from the database
  await Otp.deleteOne({ _id: otpEntry._id });

  return res.json({ message: 'OTP verified successfully' });
}
