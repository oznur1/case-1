"use client";

import { useAuth } from "@/hooks/useAuth";
import { useAuthorization } from "@/hooks/useAuthorization";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
  fallback?: ReactNode;
  redirectTo?: string;
}

/**
 * ProtectedRoute component following OCP and SRP
 * - Open for extension (different protection strategies)
 * - Closed for modification (core logic doesn't change)
 * - Single responsibility: route protection logic
 */
export default function ProtectedRoute({
  children,
  requiredRole,
  fallback,
  redirectTo = "/api/auth/signin",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { hasRole } = useAuthorization();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    // Redirect to sign in
    if (typeof window !== "undefined") {
      window.location.href = redirectTo;
    }
    return null;
  }

  // Role-based protection
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
          <h1 className="text-2xl font-bold text-red-800 mb-4">Access Denied</h1>
          <p className="text-red-600">You don't have permission to access this page.</p>
          <p className="text-sm text-red-500 mt-2">
            Required role: {requiredRole}, Your role: {user?.role || "user"}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

