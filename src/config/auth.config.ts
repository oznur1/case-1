import { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

/**
 * Authentication configuration following SRP - only handles auth config
 * Separated from handler logic for better maintainability
 */
export const authConfig: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
      profile(profile: any) {
        console.log("🔥 AUTH0 PROFILE CALLBACK TRIGGERED! 🔥", profile); // Debug log
        console.log("Profile keys:", Object.keys(profile)); // Show all available keys
        console.log("Profile stringified:", JSON.stringify(profile, null, 2)); // Full profile

        // Extract roles from Auth0 profile
        const roles = profile["https://yourapp.com/roles"] || profile.roles || profile["custom:roles"] || [];

        // Determine primary role
        let userRole = "user";
        if (Array.isArray(roles)) {
          userRole = roles.includes("admin") ? "admin" : "user";
        } else if (typeof roles === "string") {
          userRole = roles === "admin" ? "admin" : "user";
        }

        // Fallback: check if user has admin role in Auth0 app_metadata
        if (profile.app_metadata?.roles?.includes("admin") || profile.user_metadata?.role === "admin") {
          userRole = "admin";
        }

        // Additional fallback: check Auth0 authorization context
        if (profile.authorization?.roles?.includes("admin")) {
          userRole = "admin";
        }

        // Emergency fallback: check email for testing (remove in production)
        if (profile.email?.includes("admin")) {
          console.log("Using email-based admin fallback for:", profile.email);
          userRole = "admin";
        }

        console.log("Extracted user role:", userRole); // Debug log

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: userRole,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // Add role to token for authorization
      if (user) {
        token.role = (user as any).role || "user";
        console.log("JWT Callback - User role:", (user as any).role); // Debug log
      }

      console.log("JWT Callback - Final token role:", token.role); // Debug log
      return token;
    },
    async session({ session, token }) {
      // Pass role to client-side session
      if (session.user) {
        (session.user as any).role = token.role || "user";
      }

      console.log("Session Callback - Session user role:", (session.user as any).role); // Debug log
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    async signOut(message) {
      console.log("User signed out, clearing session");
    },
    async session(message) {
      console.log("Session created/updated:", message.session);
    },
  },
  debug: true, // Enable debug mode
};
