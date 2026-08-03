"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  UserCircle,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    router.replace("/login");
  };

  return (
    <aside
      className="
        w-64
        min-h-screen
        bg-white
        dark:bg-gray-800
        border-r
        border-gray-200
        dark:border-gray-700
        text-black
        dark:text-white
        p-5
        transition-colors
        duration-300
      "
    >
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-8">
        RBAC Admin
      </h1>

      <nav className="space-y-3">
        <Link
          href="/dashboard"
          className="
            flex items-center gap-3
            p-3 rounded-lg
            hover:bg-gray-100
            dark:hover:bg-gray-700
            transition
          "
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/members"
          className="
            flex items-center gap-3
            p-3 rounded-lg
            hover:bg-gray-100
            dark:hover:bg-gray-700
            transition
          "
        >
          <Users size={20} />
          Members
        </Link>

        <Link
          href="/profile"
          className="
            flex items-center gap-3
            p-3 rounded-lg
            hover:bg-gray-100
            dark:hover:bg-gray-700
            transition
          "
        >
          <UserCircle size={20} />
          Profile
        </Link>

        <button
          onClick={logout}
          className="
            flex items-center gap-3
            p-3 rounded-lg
            w-full
            text-red-600
            dark:text-red-400
            hover:bg-red-100
            dark:hover:bg-red-900/40
            transition
          "
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
}