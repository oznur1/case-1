"use client";

import { useAuth } from "./useAuth";
import { authorizationService } from "@/services/AuthorizationService";

/**
 * Authorization hook following ISP - focused only on authorization logic
 */
export function useAuthorization() {
  const { user } = useAuth();

  return {
    canAccess: (resource: string) => authorizationService.canAccess(resource, user || undefined),
    hasRole: (role: string) => authorizationService.hasRole(role, user || undefined),
    isAdmin: () => authorizationService.hasRole("admin", user || undefined),
    isUser: () => authorizationService.hasRole("user", user || undefined),
  };
}
