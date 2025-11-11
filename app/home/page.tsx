"use client";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth({ 
    redirectTo: "/login", 
    redirectIfFound: false
  });

  // Force body background on this page
  useEffect(() => {
    document.body.style.background = '';
  }, []);

  async function handleLogout() {
    await signOut(auth);
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center !bg-white dark:!bg-black">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-300 border-t-blue-500 dark:border-zinc-700 dark:border-t-blue-400"></div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const userName = user?.displayName || user?.email || "User";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-zinc-50 dark:bg-zinc-900 p-8 shadow-2xl border border-zinc-200 dark:border-zinc-700">
        {/* Header with avatar circle */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Welcome back!
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              {userName}
            </p>
          </div>
        </div>

        {/* Success message card */}
        <div className="mb-8 rounded-xl bg-blue-100 dark:bg-blue-900/40 p-6 border border-blue-300 dark:border-blue-700">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-blue-500 p-2 mt-0.5">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-black dark:text-white mb-1">
                Successfully signed in
              </h2>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                You&apos;re now logged into your account and can access all features.
              </p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-3 mb-8">
          <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button 
              disabled
              className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-800 text-left border border-zinc-300 dark:border-zinc-600 opacity-50 blur-[0.5px] cursor-not-allowed"
            >
              <div className="rounded-lg bg-green-500 p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-black dark:text-white">View Profile</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Coming soon</p>
              </div>
            </button>
            
            <button 
              disabled
              className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-zinc-800 text-left border border-zinc-300 dark:border-zinc-600 opacity-50 blur-[0.5px] cursor-not-allowed"
            >
              <div className="rounded-lg bg-purple-500 p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-black dark:text-white">Settings</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Coming soon</p>
              </div>
            </button>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="w-full rounded-xl px-6 py-3.5 font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log Out
          </div>
        </button>
      </div>
    </div>
  );
}