"use client";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Register() {
  const [animate, setAnimate] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Registration failed");

      console.log("Registration successful:", data);
      navigate("/");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <>
      {/* Inline custom animation styles */}
      <style>{`
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradientMove 15s ease infinite;
        }
      `}</style>

      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-800 animate-gradient">
        <div
          className={`backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 w-[90%] max-w-md transition-all duration-700 transform ${
            animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-widest animate-pulse drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            Join the Community
          </h2>

          {errorMsg && (
            <p className="text-red-300 text-sm text-center mb-4 bg-red-500/20 px-4 py-2 rounded">
              {errorMsg}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border border-white/30 rounded-lg px-4 pt-6 pb-2 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
                required
              />
              <label
                htmlFor="username"
                className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-2 peer-focus:text-sm peer-focus:text-cyan-300"
              >
                Username
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border border-white/30 rounded-lg px-4 pt-6 pb-2 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
                required
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-2 peer-focus:text-sm peer-focus:text-cyan-300"
              >
                Email Address
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border border-white/30 rounded-lg px-4 pt-6 pb-2 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
                required
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-2 peer-focus:text-sm peer-focus:text-cyan-300"
              >
                Password
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-500 hover:to-indigo-600 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-white/80">
            Already have an account?{" "}
            <Link to="/" className="text-cyan-200 hover:underline transition">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
