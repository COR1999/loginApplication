"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../../lib/firebase";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: User | null) => {
      if (user) router.push("/home");
    });
    return () => unsub();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm isSignUp={true} />
    </div>
  );
}
