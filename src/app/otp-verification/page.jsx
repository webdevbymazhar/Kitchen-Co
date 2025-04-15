'use client'
import { useState } from 'react';

function OtpVerification() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const sendOtp = async () => {
    const response = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (response.ok) setIsOtpSent(true);
  };

  const verifyOtp = async () => {
    const response = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    if (response.ok) {
      alert('OTP verified successfully!');
      // Redirect or perform further actions
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div>
      {!isOtpSent ? (
        <div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      ) : (
        <div>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}

export default OtpVerification;
