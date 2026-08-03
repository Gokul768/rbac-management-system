"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Layout from "@/components/Layout";
import RoleGuard from "@/components/RoleGuard";
import { getMemberById } from "@/services/members.service";

interface Member {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: boolean;
  createdAt?: string;
}

export default function ViewMemberPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const data = await getMemberById(id);
        setMember(data);
      } catch (error) {
        console.error("GET MEMBER ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMember();
    }
  }, [id]);

  return (
    <RoleGuard allowedRoles={["admin", "manager", "member"]}>
      <Layout>
        <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300 flex flex-col items-center justify-center">
          <div className="w-full max-w-xl">
            <button
              onClick={() => router.back()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition mb-6 inline-flex items-center gap-2"
            >
              ← Back
            </button>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Loading Member...
                </p>
              </div>
            ) : !member ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-8 text-center">
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Member Not Found
                </p>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold text-black dark:text-white mb-6 text-center">
                  Member Profile
                </h1>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-8 space-y-6">
                  <div>
                    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Full Name
                    </h2>
                    <p className="text-xl font-semibold text-black dark:text-white mt-1">
                      {member.name}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email Address
                    </h2>
                    <p className="text-lg text-black dark:text-white mt-1">
                      {member.email}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Phone
                    </h2>
                    <p className="text-lg text-black dark:text-white mt-1">
                      {member.phone || "N/A"}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Role
                    </h2>
                    <p className="text-lg text-black dark:text-white mt-1">
                      {member.role
                        ? member.role.charAt(0).toUpperCase() +
                          member.role.slice(1)
                        : "Member"}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Status
                    </h2>
                    {member.status ? (
                      <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400 font-medium text-base">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 font-medium text-base">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                        Inactive
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Created Date
                    </h2>
                    <p className="text-lg text-black dark:text-white mt-1">
                      {member.createdAt
                        ? new Date(member.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </RoleGuard>
  );
}