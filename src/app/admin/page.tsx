import { getServerSession } from "next-auth";
import { authConfig } from "@/config/auth.config";
import { redirect } from "next/navigation";
import AuthButton from "@/components/AuthButton";
import { authorizationService } from "@/services/AuthorizationService";

/**
 * AdminPage component following SRP and authorization principles
 * Server-side protection with role-based access control
 */
export default async function AdminPage() {
  const session = await getServerSession(authConfig);

  // Authentication check
  if (!session) {
    redirect("/api/auth/signin");
  }

  // Authorization check - server-side role validation
  const user = {
    ...session.user,
    role: (session.user as any)?.role || "user",
  };

  if (!authorizationService.hasRole("admin", user)) {
    redirect("/?error=access_denied");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full mx-4">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Hoş geldin, {session.user?.name}</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-md border border-purple-200 mb-6">
          <p className="text-purple-800 font-medium">Admin yetkilerine sahipsiniz</p>
          <p className="text-purple-600 text-sm mt-1">Role: {(session.user as any)?.role || "user"}</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 transition-colors">
              Kullanıcı Yönetimi
            </button>
            <button className="bg-green-500 text-white px-4 py-3 rounded-md hover:bg-green-600 transition-colors">
              Sistem Ayarları
            </button>
            <button className="bg-yellow-500 text-white px-4 py-3 rounded-md hover:bg-yellow-600 transition-colors">
              Raporlar
            </button>
            <button className="bg-purple-500 text-white px-4 py-3 rounded-md hover:bg-purple-600 transition-colors">
              Güvenlik
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <AuthButton />
          </div>
        </div>
      </div>
    </main>
  );
}
