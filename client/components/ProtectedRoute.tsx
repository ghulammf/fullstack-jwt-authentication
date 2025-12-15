"use client";

import useAuthStore from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { accessToken, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/auth/login");
      return;
    }

    if (requireAdmin && user?.role !== "ADMIN") {
      router.push("/dashboard");
    }
  }, [accessToken, user, router, requireAdmin]);

  if (!accessToken || (requireAdmin && user?.role !== "ADMIN")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;
