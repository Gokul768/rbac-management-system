"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}