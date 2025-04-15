// components/OtpVerificationForm.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const OtpVerificationForm = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (res.ok) {
        router.push("/login"); // Redirect to login upon successful verification
      } else {
        const data = await res.json();
        setError(data.message || "OTP verification failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleOtpSubmit} className="space-y-5">
      <h2 className="text-lg font-semibold">Enter OTP sent to your email:</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        required
        className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300"
      />
      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white rounded-md"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default OtpVerificationForm;
