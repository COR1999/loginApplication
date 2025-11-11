"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: User | null) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setUserName(user.displayName || user.email || "User");
    });
    return () => unsub();
  }, [router]);

  async function handleLogout() {
    await signOut(auth);
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-2xl rounded-md bg-white p-8 shadow">
        <h1 className="mb-4 text-2xl font-semibold">Welcome, {userName}</h1>
        <p className="mb-6 text-zinc-600">You are signed in.</p>
        <button
          onClick={handleLogout}
          className="rounded bg-black px-4 py-2 text-white"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
