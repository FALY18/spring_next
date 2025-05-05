'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Changer ici
import { getToken, getUserRole } from "./auth";

const withAuth = (WrappedComponent: React.ComponentType, allowedRoles: string[]) => {
  return function ProtectedRoute(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = getToken();
      const role = getUserRole();

      if (!token || !allowedRoles.includes(role)) {
        router.replace("/auth"); // ✅ Redirection fonctionne avec App Router
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
