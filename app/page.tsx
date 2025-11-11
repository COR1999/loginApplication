"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function RootPageRedirect() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: User | null) => {
      if (user) router.replace("/home");
      else router.replace("/login");
      setChecking(false);
    });
    return () => unsub();
  }, [router]);

  // Avoid flashing content while we check auth state — show a spinner + accessible message
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      {checking ? (
        <div className="flex flex-col items-center gap-3">
          <svg
            className="h-12 w-12 animate-spin text-black dark:text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>

          <div className="text-center">
            <p className="font-medium text-lg text-black dark:text-white">Checking authentication...</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">This should only take a moment.</p>
          </div>

          <span className="sr-only" aria-live="polite">
            Authenticating
          </span>
        </div>
      ) : null}
    </div>
  );
}
