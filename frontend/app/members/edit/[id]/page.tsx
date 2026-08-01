"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

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

  useEffect(() => {
    const load = async () => {
      try {
        const data =
          await getMemberById(id);

        setForm({
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.role,
          status: data.status,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      load();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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

  const submit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await updateMember(id, form);

      alert(
        "Updated Successfully"
      );

      router.push("/members");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">
          Edit Member
        </h1>

        <form
          onSubmit={submit}
          className="space-y-4 max-w-xl"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-3 w-full"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border p-3 w-full"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="border p-3 w-full"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border p-3 w-full"
          >
            <option>Member</option>
            <option>Trainer</option>
            <option>Manager</option>
            <option>Admin</option>
          </select>

          <select
            name="status"
            value={String(form.status)}
            onChange={handleChange}
            className="border p-3 w-full"
          >
            <option value="true">
              Active
            </option>

            <option value="false">
              Inactive
            </option>
          </select>

          <button
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Update Member
          </button>
        </form>
      </div>
    </RoleGuard>
  );
}