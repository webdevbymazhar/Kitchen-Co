// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FaUser } from "react-icons/fa";
// import { RiLockPasswordFill } from "react-icons/ri";
// import { MdEmail } from "react-icons/md";

// const RegisterForm = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isEmailValid, setIsEmailValid] = useState(true);

//   const router = useRouter();

//   const validateEmail = (email) => {
//     const regex = /\S+@\S+\.\S+/;
//     setIsEmailValid(regex.test(email));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       setError("All fields are necessary.");
//       return;
//     }

//     if (!isEmailValid) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const resUserExists = await fetch("/api/userExists", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const { user } = await resUserExists.json();
//       if (user) {
//         setError("User already exists.");
//         setLoading(false);
//         return;
//       }

//       const res = await fetch("/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, password }),
//       });

//       if (res.ok) {
//         setLoading(false);
//         e.target.reset();
//         router.push("/login");
//       } else {
//         setError("User registration failed. Please try again.");
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error during registration", error);
//       setError("An error occurred. Please try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 relative overflow-hidden">
//     <div className="relative bg-white shadow-md rounded-lg p-8 max-w-md w-full transform transition-transform duration-300 hover:scale-105">
//       <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Sign Up</h1>
      
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div className="relative">
//           <input
//             onChange={(e) => setName(e.target.value)}
//             type="text"
//             placeholder="Username"
//             required
//             className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-600 focus:outline-none focus:border-blue-400 transition-all duration-200"
//           />
//           <FaUser className="absolute top-3 right-4 text-gray-400" />
//         </div>
        
//         <div className="relative">
//           <input
//             onChange={(e) => {
//               setEmail(e.target.value);
//               validateEmail(e.target.value);
//             }}
//             type="email"
//             placeholder="Email ID"
//             required
//             className={`w-full px-4 py-3 rounded-md bg-gray-50 placeholder-gray-400 text-gray-600 border ${
//               isEmailValid ? "border-gray-300" : "border-red-500"
//             } focus:outline-none focus:border-blue-400 transition-all duration-200`}
//           />
//           <MdEmail className="absolute top-3 right-4 text-gray-400" />
//         </div>
        
//         <div className="relative">
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             placeholder="Password"
//             required
//             className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-600 focus:outline-none focus:border-blue-400 transition-all duration-200"
//           />
//           <RiLockPasswordFill className="absolute top-3 right-4 text-gray-400" />
//         </div>

//         <button
//           type="submit"
//           className="w-full flex items-center justify-center py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
//           disabled={loading}
//         >
//           {loading ? (
//             <svg
//               className="animate-spin h-5 w-5 mr-3"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
//               />
//             </svg>
//           ) : (
//             "Register"
//           )}
//         </button>

//         <div className="text-center mt-4">
//           <p className="text-sm text-gray-500">
//             Already have an account?{" "}
//             <Link href="/login" className="text-blue-500 font-semibold hover:underline">
//               Login
//             </Link>
//           </p>
//         </div>

//         {error && (
//           <div className="bg-red-100 text-red-600 w-full text-sm py-2 px-3 rounded-md mt-4 text-center border border-red-300">
//             {error}
//           </div>
//         )}
//       </form>
//     </div>
//   </div>
//   );
// };

// export default RegisterForm;




// RegisterForm.js
"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"
import OtpVerificationForm from "./OTPForm";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  const router = useRouter();

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    setIsEmailValid(regex.test(email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    if (!isEmailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();
      if (user) {
        setError("User already exists.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        setLoading(false);
        e.target.reset();
        setIsRegistered(true); // Show OTP form on successful registration
      } else {
        setError("User registration failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during registration", error);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 relative overflow-hidden">
      <div className="relative bg-white shadow-md rounded-lg p-8 max-w-md w-full transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Sign Up</h1>
        
        {isRegistered ? (
          <OtpVerificationForm email={email} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Username"
                required
                className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-600 focus:outline-none focus:border-blue-400 transition-all duration-200"
              />
              <FaUser className="absolute top-3 right-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                type="email"
                placeholder="Email ID"
                required
                className={`w-full px-4 py-3 rounded-md bg-gray-50 placeholder-gray-400 text-gray-600 border ${
                  isEmailValid ? "border-gray-300" : "border-red-500"
                } focus:outline-none focus:border-blue-400 transition-all duration-200`}
              />
              <MdEmail className="absolute top-3 right-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-600 focus:outline-none focus:border-blue-400 transition-all duration-200"
              />
              <RiLockPasswordFill className="absolute top-3 right-4 text-gray-400" />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                  />
                </svg>
              ) : (
                "Register"
              )}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </div>

            {error && (
              <div className="bg-red-100 text-red-600 w-full text-sm py-2 px-3 rounded-md mt-4 text-center border border-red-300">
                {error}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
