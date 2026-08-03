"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import ThemeToggle from "@/components/ThemeToggle";

import {
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const user = useAuth();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <header
      className="
        h-16
        bg-white
        dark:bg-gray-800
        shadow-md
        border-b
        border-gray-200
        dark:border-gray-700
        flex
        items-center
        justify-between
        px-6
        transition-colors
        duration-300
      "
    >
      <h1
        className="
          text-xl
          font-bold
          text-blue-600
          dark:text-blue-400
        "
      >
        RBAC Admin Panel
      </h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                w-10
                h-10
                rounded-full
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                font-bold
              "
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="text-right">
              <p className="font-semibold text-black dark:text-white">
                {user?.name}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-300">
                {user?.role}
              </p>
            </div>

            <ChevronDown
              size={18}
              className="text-black dark:text-white"
            />
          </button>

          {open && (
            <div
              className="
                absolute
                right-0
                mt-3
                w-48
                bg-white
                dark:bg-gray-800
                border
                border-gray-200
                dark:border-gray-700
                shadow-lg
                rounded-lg
                p-2
                z-50
              "
            >
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/profile");
                }}
                className="
                  w-full
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  hover:bg-gray-100
                  dark:hover:bg-gray-700
                  rounded
                  text-black
                  dark:text-white
                "
              >
                <User size={18} />
                Profile
              </button>

              <button
                onClick={logout}
                className="
                  w-full
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  hover:bg-red-100
                  dark:hover:bg-red-900/50
                  text-red-600
                  dark:text-red-400
                  rounded
                "
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}