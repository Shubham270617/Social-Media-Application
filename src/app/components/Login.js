"use client";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login() {
  const [animate, setAnimate] = useState(false);
  const [username, setUsername] = useState("");
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
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("username", data.user.username);
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <>
      {/* ⬇️ Embedded CSS styles */}
      <style>{`
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }

        .animate-gradient-xy {
          animation: gradientMove 15s ease infinite;
          background-image: radial-gradient(circle at 50% 0%, rgba(58,28,113,0.7), rgba(0,0,0,0.9));
          background-size: 400% 400%;
          background-repeat: no-repeat;
        }

        .bg-stars {
          background-image: url('https://www.transparenttextures.com/patterns/stardust.png');
        }
      `}</style>

      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* 🌌 Animated Background */}
        <div className="absolute inset-0 animate-gradient-xy">
          <div className="absolute inset-0 bg-stars opacity-10 pointer-events-none" />
        </div>

        {/* 🔮 Glowing Card */}
        <div
          className={`relative z-10 backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] rounded-2xl p-10 w-[90%] max-w-md transition-all duration-700 transform ${
            animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-teal-400 rounded-2xl blur-2xl opacity-30 animate-pulse z-[-1]" />

          <h2 className="text-4xl font-bold text-white text-center mb-6 drop-shadow-lg">
            Login Portal
          </h2>

          {errorMsg && (
            <p className="text-red-200 text-sm text-center mb-4 bg-red-500/10 border border-red-500/30 px-4 py-2 rounded">
              {errorMsg}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                id="username"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="peer w-full bg-transparent border border-white/30 rounded-lg px-4 pt-6 pb-2 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 focus:shadow-md transition duration-300"
                required
              />
              <label
                htmlFor="username"
                className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-sm peer-focus:text-teal-300"
              >
                Username
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full bg-transparent border border-white/30 rounded-lg px-4 pt-6 pb-2 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 focus:shadow-md transition duration-300"
                required
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-2 text-sm text-white/70 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-sm peer-focus:text-teal-300"
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-400 to-fuchsia-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-pink-500/50 hover:from-teal-500 hover:to-pink-500 transition duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-white/70 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-teal-300 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
