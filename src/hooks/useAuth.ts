"use client";

import { useSession } from "next-auth/react";
import { IAuthHook, IUser } from "@/types/auth.types";
import { authService } from "@/services/AuthService";

/**
 * Custom auth hook implementing DIP - depends on abstractions, not concretions
 * Provides a clean interface for components to interact with auth state
 */
export function useAuth(): IAuthHook {
  const { data: session, status } = useSession();
  console.log(session);

  const user: IUser | null = session?.user
    ? {
        id: session.user.email || undefined,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: (session.user as any).role || "user",
      }
    : null;

  return {
    // State
    user,
    isLoading: status === "loading",
    isAuthenticated: !!session,

    // Actions - delegated to service layer
    signIn: authService.signIn.bind(authService),
    signOut: authService.signOut.bind(authService),
    signUp: authService.signUp?.bind(authService),
  } as IAuthHook;
}
