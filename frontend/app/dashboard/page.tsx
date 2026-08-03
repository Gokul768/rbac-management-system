"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { getDashboardStats } from "@/services/dashboard.service";
import {
  Users,
  ShieldCheck,
  UserCog,
  UserRound,
  Activity,
} from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  totalAdmins: number;
  totalManagers: number;
  totalMembers: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalAdmins: 0,
    totalManagers: 0,
    totalMembers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardStats();
        console.log("DASHBOARD DATA:", data);
        setStats(data);
      } catch (error) {
        console.log("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
          <div className="text-xl font-semibold text-black dark:text-white">
            Loading Dashboard...
          </div>
        </div>
      </Layout>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={32} />,
      bg: "bg-blue-500",
    },
    {
      title: "Total Admins",
      value: stats.totalAdmins,
      icon: <ShieldCheck size={32} />,
      bg: "bg-red-500",
    },
    {
      title: "Total Managers",
      value: stats.totalManagers,
      icon: <UserCog size={32} />,
      bg: "bg-green-500",
    },
    {
      title: "Total Members",
      value: stats.totalMembers,
      icon: <UserRound size={32} />,
      bg: "bg-purple-500",
    },
  ];

  return (
    <Layout>
      <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="flex items-center gap-3 mb-8">
          <Activity size={35} className="text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl font-bold text-black dark:text-white">
            Admin Dashboard
          </h1>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    {card.title}
                  </p>
                  <h2 className="text-4xl font-bold mt-3 text-black dark:text-white">
                    {card.value}
                  </h2>
                </div>

                <div className={`${card.bg} text-white p-4 rounded-full shadow-lg`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System Overview Section */}
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
            System Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Total Users
              </p>
              <p className="text-2xl font-bold text-black dark:text-white">
                {stats.totalUsers}
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Admin Access
              </p>
              <p className="text-2xl font-bold text-black dark:text-white">
                {stats.totalAdmins}
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Manager Team
              </p>
              <p className="text-2xl font-bold text-black dark:text-white">
                {stats.totalManagers}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}