"use client";

import { useAuth } from "@/hooks/useAuth";

interface AuthButtonProps {
  className?: string;
  signInText?: string;
  signOutText?: string;
}

/**
 * AuthButton component following SRP and DIP
 * - Single responsibility: rendering auth button UI
 * - Depends on abstraction (useAuth hook) not concrete implementation
 */
export default function AuthButton({
  className = "",
  signInText = "Sign in with Auth0",
  signOutText = "Çıkış Yap",
}: AuthButtonProps) {
  const { isAuthenticated, isLoading, signIn, signOut, signUp } = useAuth();

  if (isLoading) {
    return (
      <button
        disabled
        className={`bg-gray-300 text-gray-500 px-4 py-2 rounded transition-all cursor-not-allowed ${className}`}
      >
        Loading...
      </button>
    );
  }

  return isAuthenticated ? (
    <button
      onClick={() => signOut()}
      className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all cursor-pointer ${className}`}
    >
      {signOutText}
    </button>
  ) : (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <button
        onClick={() => signIn("auth0")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all cursor-pointer"
      >
        {signInText}
      </button>
      <button
        onClick={() => signUp?.("auth0")}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all cursor-pointer"
      >
        Kayıt Ol
      </button>
    </div>
  );
}
