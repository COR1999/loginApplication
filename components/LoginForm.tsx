'use client';

import { usePasswordStrength } from '../hooks/usePasswordStrength';
import useAuthForm from '../hooks/useAuthForm';

interface LoginFormProps {
  isSignUp?: boolean;
}

export default function LoginForm({ isSignUp: initialIsSignUp = true }: LoginFormProps) {
  
  const {
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
  } = useAuthForm(initialIsSignUp);

  const passwordStrength = usePasswordStrength(password);

  return (
    <div className="w-full max-w-md rounded-lg p-8 shadow-lg"
         style={{ backgroundColor: 'var(--card-bg)', color: 'var(--card-text)' }}>

      <h1 className="mb-6 text-3xl font-bold">
        {isSignUp ? 'Create Account' : 'Sign In'}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Full Name (only sign-up) */}
        {isSignUp && (
          <>
            <input
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-md border px-4 py-2.5"
              style={{
                backgroundColor: 'var(--input-bg)',
                color: 'var(--input-text)',
                borderColor: 'var(--input-border)',
              }}
            />
            {fieldErrors.fullName && (
              <div className="text-sm text-red-500">{fieldErrors.fullName}</div>
            )}
          </>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border px-4 py-2.5"
          style={{
            backgroundColor: 'var(--input-bg)',
            color: 'var(--input-text)',
            borderColor: 'var(--input-border)',
          }}
        />
        {fieldErrors.email && (
          <div className="text-sm text-red-500">{fieldErrors.email}</div>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md border px-4 py-2.5"
          style={{
            backgroundColor: 'var(--input-bg)',
            color: 'var(--input-text)',
            borderColor: 'var(--input-border)',
          }}
        />
        {fieldErrors.password && (
          <div className="text-sm text-red-500">{fieldErrors.password}</div>
        )}

        {/* Password Strength (Sign-Up Only) */}
        {isSignUp && (
          <div className="mt-1">
            <div className="h-2 w-full rounded" 
                 style={{ backgroundColor: 'var(--input-border)' }}>
              <div
                className="h-2 rounded"
                style={{
                  width: `${passwordStrength.percent}%`,
                  backgroundColor: passwordStrength.color,
                  transition: 'width 160ms linear',
                }}
              />
            </div>

            <div className="mt-2 text-sm font-medium">
              {password ? passwordStrength.label : ''}
            </div>

            {passwordStrength.suggestions?.length > 0 && (
              <ul className="mt-1 text-xs">
                {passwordStrength.suggestions.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {error && <div className="text-sm text-red-500">{error}</div>}

        {/* Submit + Remember-me */}
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md px-4 py-2.5 font-semibold text-white"
            style={{ backgroundColor: '#2563eb' }}
          >
            {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>

          {!isSignUp && (
            <label className="hidden sm:flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border"
              />
              Remember me
            </label>
          )}
        </div>

        {/* Switch Mode */}
        <button
          type="button"
          onClick={() => setIsSignUp((s) => !s)}
          className="mt-2 text-sm underline"
        >
          {isSignUp
            ? 'Already have an account? Sign in'
            : 'Don’t have an account? Sign up'}
        </button>
      </form>
    </div>
  );
}
