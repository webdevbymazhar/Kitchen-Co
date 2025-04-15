import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,  // OTP expires in 5 minutes (300 seconds)
  },
});

export default mongoose.models.Otp || mongoose.model('Otp', OtpSchema);
