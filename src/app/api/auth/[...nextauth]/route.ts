import NextAuth from "next-auth";
import { authConfig } from "@/config/auth.config";

/**
 * NextAuth handler following SRP - only handles HTTP requests
 * Configuration is separated into auth.config.ts
 */
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
export { authConfig as authOptions }; // Export for compatibility
