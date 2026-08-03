"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import RoleGuard from "@/components/RoleGuard";
import Layout from "@/components/Layout";

import { 
  createMember,
  CreateMemberPayload
} from "@/services/members.service";

export default function AddMemberPage() {
  const router = useRouter();

  const [form, setForm] = useState<CreateMemberPayload>({
    name: "",
    email: "",
    phone: "",
    role: "Member",
    status: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "status"
          ? value === "true"
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createMember(form);

      alert("Member Added Successfully");
      router.push("/members");
    } catch (error) {
      console.error(error);
      alert("Failed to Add Member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <Layout>
        <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-8">
            <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
              Add Member
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  placeholder="John Doe"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  name="email"
                  value={form.email}
                  placeholder="john@example.com"
                  type="email"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  name="phone"
                  value={form.phone}
                  placeholder="1234567890"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={form.role}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                >
                  <option value="Member">Member</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={String(form.status)}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded disabled:bg-gray-400 dark:disabled:bg-gray-600 font-medium transition"
                >
                  {loading ? "Adding..." : "Add Member"}
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/members")}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2.5 rounded font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </RoleGuard>
  );
}