"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Layout from "@/components/Layout";
import RoleGuard from "@/components/RoleGuard";

import {
  getMemberById,
  updateMember,
} from "@/services/members.service";

export default function EditMemberPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: true,
  });

  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMemberById(id);

        setForm({
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.role,
          status: data.status,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setPageLoading(false);
      }
    };

    if (id) {
      load();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "status"
          ? value === "true"
          : value,
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateMember(id, form);

      alert("Member Updated Successfully");
      router.push("/members");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <Layout>
        <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 dark:text-gray-300">
              Loading member details...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <RoleGuard allowedRoles={["admin", "manager"]}>
      <Layout>
        <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-8">
            <button
              onClick={() => router.back()}
              className="mb-5 text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-1"
            >
              ← Back
            </button>

            <div className="mb-6">
              <h1 className="text-3xl font-bold text-black dark:text-white">
                Edit Member
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Update member information
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  onChange={handleChange}
                  placeholder="1234567890"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  {loading ? "Updating..." : "Update Member"}
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