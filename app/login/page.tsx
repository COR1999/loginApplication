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
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg p-8 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--card-text)' }}>
        <h1 className="mb-6 text-3xl font-bold">
          {isSignUp ? "Create Account" : "Sign In"}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignUp && (
            <>
              <input
                required
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded-md border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ 
                  backgroundColor: 'var(--input-bg)', 
                  color: 'var(--input-text)',
                  borderColor: 'var(--input-border)'
                }}
              />
              {fieldErrors.fullName && (
                <div className="text-sm text-red-500 font-medium">{fieldErrors.fullName}</div>
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
              className="rounded-md border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ 
                backgroundColor: 'var(--input-bg)', 
                color: 'var(--input-text)',
                borderColor: 'var(--input-border)'
              }}
            />
            {fieldErrors.email && (
              <div className="text-sm text-red-500 font-medium">{fieldErrors.email}</div>
            )}
          </>
          <>
            <input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ 
                backgroundColor: 'var(--input-bg)', 
                color: 'var(--input-text)',
                borderColor: 'var(--input-border)'
              }}
            />
            {fieldErrors.password && (
              <div className="text-sm text-red-500 font-medium">{fieldErrors.password}</div>
            )}
          </>

          {error && <div className="text-sm text-red-500 font-medium">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-md px-4 py-2.5 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: '#2563eb' }}
          >
            {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>

          <button
            type="button"
            onClick={() => setIsSignUp((s) => !s)}
            className="mt-2 text-sm font-medium underline hover:opacity-80 transition-opacity"
            style={{ color: 'var(--card-text)' }}
          >
            {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
