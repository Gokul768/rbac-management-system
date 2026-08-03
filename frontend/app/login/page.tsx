"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

import { loginUser } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Login | RBAC Management System";
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await loginUser({
        email,
        password,
      });

      // ===============================
      // Save Token in Cookies
      // ===============================
      Cookies.set("accessToken", response.accessToken, {
        expires: 1,
        secure: false,
        sameSite: "lax",
      });

      Cookies.set("refreshToken", response.refreshToken, {
        expires: 7,
        secure: false,
        sameSite: "lax",
      });

      Cookies.set("user", JSON.stringify(response.user), {
        expires: 1,
        secure: false,
        sameSite: "lax",
      });

      // ===============================
      // Save Token in LocalStorage
      // ===============================
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));

      // ===============================
      // Redirect Based on Role
      // ===============================
      const role = response.user.role?.toLowerCase();

      if (role === "admin") {
        router.push("/dashboard");
      } else if (role === "manager") {
        router.push("/members");
      } else {
        router.push("/profile");
      }
    } catch (err: any) {
      console.error(err);

      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-8 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            RBAC Management System
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Sign in to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded p-3 text-center">
            <p className="text-red-600 dark:text-red-400 text-sm font-medium">
              {error}
            </p>
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-3 font-medium transition disabled:bg-gray-400 dark:disabled:bg-gray-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}