// "use client";

// import useAuthStore from "@/store/auth.store";
// import { useRouter } from "next/navigation";
// import { ReactNode, useEffect } from "react";

// interface ProtectedRouteProps {
//   children: ReactNode;
//   requireAdmin?: boolean;
// }

// function ProtectedRoute({
//   children,
//   requireAdmin = false,
// }: ProtectedRouteProps) {
//   const { accessToken, user } = useAuthStore();
//   const router = useRouter();

//   useEffect(() => {
//     if (!accessToken) {
//       router.push("/auth/login");
//       return;
//     }

//     if (requireAdmin && user?.role !== "ADMIN") {
//       router.push("/dashboard");
//     }
//   }, [accessToken, user, router, requireAdmin]);

//   if (!accessToken || (requireAdmin && user?.role !== "ADMIN")) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }

// export default ProtectedRoute;
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/auth.store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }

    if (requireAdmin && !isAdmin()) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isAdmin, requireAdmin, router]);

  if (!isAuthenticated() || (requireAdmin && !isAdmin())) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
}
