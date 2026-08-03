"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import Layout from "@/components/Layout";
import { getProfile } from "@/services/user.service";

import {
  User,
  Mail,
  Shield,
  CircleCheck,
  LogOut,
} from "lucide-react";

interface Profile {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
}

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("user");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    router.push("/login");
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 dark:text-gray-300">
              Loading Profile...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition-colors duration-300">

        <h1 className="text-3xl font-bold text-black dark:text-white mb-8">
          My Profile
        </h1>

        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">

          <div className="flex justify-center mb-8">
            <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-5xl font-bold">
              {profile?.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="space-y-6">

            <div className="flex items-center gap-4">
              <User className="text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Name
                </p>

                <p className="text-lg font-semibold text-black dark:text-white">
                  {profile?.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email
                </p>

                <p className="text-lg font-semibold text-black dark:text-white">
                  {profile?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Shield className="text-red-600 dark:text-red-400" />

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Role
                </p>

                <span className="inline-block mt-1 px-4 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-semibold">
                  {profile?.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <CircleCheck
                className={
                  profile?.status
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400"
                }
              />

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Status
                </p>

                <span
                  className={
                    profile?.status
                      ? "inline-block mt-1 px-4 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 font-semibold"
                      : "inline-block mt-1 px-4 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold"
                  }
                >
                  {profile?.status ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

          </div>

          <button
            onClick={handleLogout}
            className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex justify-center items-center gap-2 transition"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>
      </div>
    </Layout>
  );
}