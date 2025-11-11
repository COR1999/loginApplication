"use client";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth({ 
    redirectTo: "/login", 
    redirectIfFound: false // Redirect if user is NOT logged in
  });

  async function handleLogout() {
    await signOut(auth);
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  const userName = user?.displayName || user?.email || "User";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div 
        className="w-full max-w-2xl rounded-lg p-8 shadow-lg" 
        style={{ backgroundColor: 'var(--card-bg)', color: 'var(--card-text)' }}
      >
        <h1 className="mb-6 text-3xl font-bold">Welcome, {userName}! 👋</h1>
        <p className="mb-8 text-lg opacity-80">
          You are successfully signed in to your account.
        </p>
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