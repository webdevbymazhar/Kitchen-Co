// /utils/generateOTP.js
export default function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit OTP
}