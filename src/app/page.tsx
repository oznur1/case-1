import { getServerSession } from "next-auth";
import { authConfig } from "@/config/auth.config";
import AuthButton from "@/components/AuthButton";
import Link from "next/link";

/**
 * HomePage component following SRP - only handles home page presentation
 * Uses server-side session for optimal performance
 */
export default async function HomePage() {
  const session = await getServerSession(authConfig);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Auth0 + Next.js Demo</h1>

        {session ? (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-md border border-green-200">
              <p className="text-green-800 font-medium">Hoş geldin, {session.user?.name}!</p>
              <p className="text-green-600 text-sm mt-1">Role: {(session.user as any)?.role || "user"}</p>
            </div>

            <Link
              href="/admin"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium"
            >
              Admin Sayfasına Git
            </Link>

            <div className="pt-4">
              <AuthButton />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <p className="text-blue-800 font-medium">Güvenli kimlik doğrulama sistemi</p>
              <p className="text-blue-600 text-sm mt-1">Auth0 ile giriş yaparak korumalı sayfalara erişin.</p>
            </div>

            <AuthButton />
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">Next.js 15 + NextAuth.js + Auth0 + SOLID Principles</p>
        </div>
      </div>
    </main>
  );
}
