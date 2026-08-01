"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    router.push("/login");
  };

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
    {
      name: "Members",
      path: "/members",
      icon: "👥",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">

      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        RBAC Admin
      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menus.map((menu) => (

          <Link
            key={menu.path}
            href={menu.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition

              ${
                pathname === menu.path
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }

            `}
          >
            <span>{menu.icon}</span>

            <span>{menu.name}</span>
          </Link>

        ))}

      </nav>

      <div className="p-4 border-t border-gray-700">

        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded"
        >
          🚪 Logout
        </button>

      </div>

    </aside>
  );
}