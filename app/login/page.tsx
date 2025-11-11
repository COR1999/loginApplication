"use client";

import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { loading } = useAuth({ 
    redirectTo: "/home", 
    redirectIfFound: true // Redirect if user IS logged in
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm isSignUp={true} />
    </div>
  );
}
