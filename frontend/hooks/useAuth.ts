"use client";

import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  return user;
}