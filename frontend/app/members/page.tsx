"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";

import {
  getMembers,
  deleteMember,
} from "@/services/members.service";

export default function MembersPage() {
  const router = useRouter();

  const user = useAuth();

  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const response = await getMembers();

      console.log("MEMBERS:", response);

      setMembers(response.data || response);
    } catch (error) {
      console.log("GET MEMBERS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMember(id);

      alert("Member Deleted Successfully");

      fetchMembers();
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };

  if (loading || !user) {
    return (
      <div className="p-10">
        Loading Members...
      </div>
    );
  }

  return (
    <div className="p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Members Management
        </h1>

        {user.role === "admin" && (
          <button
            onClick={() => router.push("/members/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Member
          </button>
        )}

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full border border-gray-300">

          <thead className="bg-gray-100">

            <tr>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Phone</th>
              <th className="border p-3">Role</th>
              <th className="border p-3">Status</th>
              <th className="border p-3 text-center">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {members.length > 0 ? (

              members.map((member) => (

                <tr key={member._id}>

                  <td className="border p-3">
                    {member.name}
                  </td>

                  <td className="border p-3">
                    {member.email}
                  </td>

                  <td className="border p-3">
                    {member.phone}
                  </td>

                  <td className="border p-3">
                    {member.role}
                  </td>

                  <td className="border p-3">
                    {member.status
                      ? "🟢 Active"
                      : "🔴 Inactive"}
                  </td>

                  <td className="border p-3">

                    <div className="flex gap-2 justify-center">

                      {user.role === "admin" && (
                        <>
                          <button
                            onClick={() =>
                              router.push(
                                `/members/edit/${member._id}`
                              )
                            }
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(member._id)
                            }
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </>
                      )}

                      {user.role !== "admin" && (
                        <span className="text-gray-500">
                          View Only
                        </span>
                      )}

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={6}
                  className="text-center p-5"
                >
                  No Members Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}