"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import useAuth from "@/hooks/useAuth";

import {
  getMembers,
  deleteMember,
} from "@/services/members.service";

interface Member {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: boolean;
}

export default function MembersPage() {
  const router = useRouter();
  const user = useAuth();
  
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Sorting States
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMembers, setTotalMembers] = useState(0);
  const membersPerPage = 5;

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await getMembers(
        currentPage,
        membersPerPage,
        search,
        roleFilter,
        statusFilter,
        sortBy,
        order
      );

      setMembers(response.data);
      setTotalPages(response.totalPages);
      setTotalMembers(response.total);
    } catch (error) {
      console.error("GET MEMBERS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [
    currentPage,
    search,
    roleFilter,
    statusFilter,
    sortBy,
    order,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    roleFilter,
    statusFilter,
    sortBy,
    order,
  ]);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMember(id);
      alert("Member Deleted Successfully");

      if (members.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchMembers();
      }
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  if (loading || !user) {
    return (
      <Layout>
        <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <div className="flex flex-col items-center justify-center pt-20 gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              Loading Members...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Members Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Total Members: {totalMembers}
            </p>
          </div>

          <div className="flex gap-3 flex-wrap items-center">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Member">Member</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="createdAt">Created Date</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="role">Role</option>
            </select>

            

            <SearchBar
              value={search}
              onChange={setSearch}
            />

            {user.role === "admin" && (
              <button
                onClick={() => router.push("/members/add")}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 font-medium transition"
              >
                + Add Member
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white">
              <tr>
                <th className="border-b border-gray-200 dark:border-gray-700 p-3 text-left">
                  Name
                </th>
                <th className="border-b border-gray-200 dark:border-gray-700 p-3 text-left">
                  Email
                </th>
                <th className="border-b border-gray-200 dark:border-gray-700 p-3 text-left">
                  Phone
                </th>
                <th className="border-b border-gray-200 dark:border-gray-700 p-3 text-left">
                  Role
                </th>
                <th className="border-b border-gray-200 dark:border-gray-700 p-3 text-left">
                  Status
                </th>
                <th className="border-b border-gray-200 dark:border-gray-700 p-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 ? (
                members.map((member) => (
                  <tr
                    key={member._id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="p-3 text-black dark:text-white">
                      {member.name}
                    </td>
                    <td className="p-3 text-black dark:text-white">
                      {member.email}
                    </td>
                    <td className="p-3 text-black dark:text-white">
                      {member.phone}
                    </td>
                    <td className="p-3 text-black dark:text-white">
                      {member.role
                        ? member.role.charAt(0).toUpperCase() +
                          member.role.slice(1)
                        : "Member"}
                    </td>
                    <td className="p-3 text-black dark:text-white">
                      {member.status ? (
                        <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400 font-medium">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 font-medium">
                          <span className="h-2 w-2 rounded-full bg-red-500"></span>
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        {/* VIEW */}
                        <button
                          onClick={() =>
                            router.push(`/members/view/${member._id}`)
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition text-sm"
                        >
                          View
                        </button>

                        {/* EDIT : ADMIN + MANAGER */}
                        {(user.role === "admin" || user.role === "manager") && (
                          <button
                            onClick={() =>
                              router.push(`/members/edit/${member._id}`)
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition text-sm"
                          >
                            Edit
                          </button>
                        )}

                        {/* DELETE : ADMIN ONLY */}
                        {user.role === "admin" && (
                          <button
                            onClick={() => handleDelete(member._id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition text-sm"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center p-6 text-gray-500 dark:text-gray-400"
                  >
                    No Members Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </Layout>
  );
}