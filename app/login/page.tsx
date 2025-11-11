"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth } from "../../lib/firebase";

type FieldErrors = {
  fullName?: string;
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: User | null) => {
      if (user) router.push("/home");
    });
    return () => unsub();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // basic client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors: FieldErrors = {};
    if (isSignUp && !fullName.trim()) errors.fullName = "Full name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!emailRegex.test(email)) errors.email = "Please enter a valid email address";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, { displayName: fullName });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/home");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md rounded-md bg-white p-8 shadow">
        <h1 className="mb-4 text-2xl font-semibold">
          {isSignUp ? "Create account" : "Sign in"}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {isSignUp && (
            <>
              <input
                required
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded border px-3 py-2"
              />
              {fieldErrors.fullName && (
                <div className="text-sm text-red-600">{fieldErrors.fullName}</div>
              )}
            </>
          )}
          <>
            <input
              required
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded border px-3 py-2"
            />
            {fieldErrors.email && (
              <div className="text-sm text-red-600">{fieldErrors.email}</div>
            )}
          </>
          <>
            <input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded border px-3 py-2"
            />
            {fieldErrors.password && (
              <div className="text-sm text-red-600">{fieldErrors.password}</div>
            )}
          </>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded bg-black px-4 py-2 text-white disabled:opacity-60"
          >
            {loading ? "Please wait..." : isSignUp ? "Sign up" : "Sign in"}
          </button>

          <button
            type="button"
            onClick={() => setIsSignUp((s) => !s)}
            className="mt-2 text-sm text-zinc-600 underline"
          >
            {isSignUp ? "Already have an account? Sign in" : "Create an account"}
          </button>
        </form>
      </div>
    </div>
  );
}
