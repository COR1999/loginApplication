"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export type FieldErrors = {
  fullName?: string;
  email?: string;
  password?: string;
};

export default function useAuthForm(initialIsSignUp = true) {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // ✅ Handles all sign-in / sign-up logic
  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();

    setError(null);
    setFieldErrors({});

    const errors: FieldErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ✅ Basic validation
    if (isSignUp && !fullName.trim())
      errors.fullName = "Full name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!emailRegex.test(email))
      errors.email = "Please enter a valid email address";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      // ✅ "Remember Me" persistence
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      if (isSignUp) {
        // ✅ Register user
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (cred.user) {
          await updateProfile(cred.user, { displayName: fullName });
        }
      } else {
        // ✅ Login user
        await signInWithEmailAndPassword(auth, email, password);
      }

      router.push("/home");
    } catch (err) {
      let message = "Authentication failed.";

      if (err instanceof Error) {
        if (err.message.includes("auth/email-already-in-use"))
          message = "This email is already registered.";
        else if (err.message.includes("auth/invalid-credential"))
          message = "Incorrect email or password.";
        else if (err.message.includes("auth/weak-password"))
          message = "Password must be at least 6 characters.";
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    isSignUp,
    setIsSignUp,
    rememberMe,
    setRememberMe,
    loading,
    error,
    fieldErrors,
    handleSubmit,
  } as const;
}
