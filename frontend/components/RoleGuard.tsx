"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useAuth from "@/hooks/useAuth";

export default function RoleGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const router = useRouter();
  const user = useAuth();

  useEffect(() => {
    if (!user) return;

    if (!allowedRoles.includes(user.role)) {
      router.push("/dashboard");
    }
  }, [user, router, allowedRoles]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}