"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface UseAuthOptions {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

export function useAuth(options?: UseAuthOptions) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      // Redirect logic
      if (options?.redirectTo) {
        if (options.redirectIfFound && user) {
          // User is logged in, redirect away (useful for login page)
          router.replace(options.redirectTo);
        } else if (!options.redirectIfFound && !user) {
          // User is NOT logged in, redirect to login (useful for protected pages)
          router.replace(options.redirectTo);
        }
      }
    });

    return () => unsubscribe();
  }, [router, options?.redirectTo, options?.redirectIfFound]);

  return { user, loading };
}