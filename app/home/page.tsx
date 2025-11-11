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
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-2xl rounded-lg p-8 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--card-text)' }}>
        <h1 className="mb-6 text-3xl font-bold">Welcome, {userName}! 👋</h1>
        <p className="mb-8 text-lg opacity-80">You are successfully signed in to your account.</p>
        <button
          onClick={handleLogout}
          className="rounded-md px-6 py-2.5 font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#2563eb' }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
