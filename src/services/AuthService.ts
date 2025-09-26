"use client";

import { signIn, signOut } from "next-auth/react";
import { IAuthenticationService } from "@/types/auth.types";

/**
 * Authentication service implementing SRP - only handles authentication operations
 */
export class AuthService implements IAuthenticationService {
  async signIn(provider: string = "auth0"): Promise<void> {
    try {
      await signIn(provider);
    } catch (error) {
      console.error("Sign in error:", error);
      throw new Error("Authentication failed");
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
      throw new Error("Sign out failed");
    }
  }

  async signUp(provider: string = "auth0"): Promise<void> {
    try {
      // Use Auth0's screen_hint to show the signup page
      await signIn(provider, undefined, { screen_hint: "signup", prompt: "login" });
    } catch (error) {
      console.error("Sign up error:", error);
      throw new Error("Sign up failed");
    }
  }
}

// Singleton instance for dependency injection
export const authService = new AuthService();

