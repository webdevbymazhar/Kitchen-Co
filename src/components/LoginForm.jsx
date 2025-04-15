"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Mail01Icon } from "hugeicons-react";
import { Loader, LogIn, Mail } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white rounded-xl shadow-2xl transform transition-transform  hover:shadow-xl p-10 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Log In to Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <label className="block text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full py-3 px-4 mt-2 rounded-lg bg-gray-100 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-200 ease-in-out group-hover:border-purple-500"
              required
              disabled={loading}
            />
            <Mail className="absolute text-black text-sm top-[45px] right-2" />
          </div>

          <div className="relative group">
            <label className="block text-gray-600 font-semibold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full py-3 px-4 mt-2 rounded-lg bg-gray-100 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:outline-none transition duration-200 ease-in-out group-hover:border-purple-500"
              required
              disabled={loading}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-11 text-gray-500 hover:text-gray-700 transition duration-150"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>

          {error && (
            <p className="text-center text-red-500 text-sm mt-3">{error}</p>
          )}

          <button
            type="submit"
            className={`w-full flex items-center gap-3 justify-center py-3 mt-6 rounded-lg font-semibold text-white shadow-md focus:outline-none transition-all transform ${
              loading
                ? "bg-gray-400"
                : "bg-purple-600 hover:bg-purple-700 hover:shadow-lg "
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
            {loading ? <Loader className="animate-spin"/> : <LogIn  />}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500">
          Don't have an account?{" "}
          <Link href="/register">
            <span className="font-semibold text-indigo-600 hover:text-indigo-700 transition duration-150">
              Register here
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
