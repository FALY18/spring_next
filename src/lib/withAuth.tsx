// lib/withAuth.tsx
import { useRouter } from 'next/router';
import { useEffect, useState, ComponentType, JSX } from 'react';

export function withAuth<T>(WrappedComponent: ComponentType<T>, allowedRoles: string[] = []) {
  return function ProtectedRoute(props: T) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('jwt');
      const role = localStorage.getItem('userRole');

      if (!token || !role || (allowedRoles.length > 0 && !allowedRoles.includes(role))) {
        router.replace('/auth'); // redirige vers l'auth si non autorisé
      } else {
        setAuthorized(true); // autorisé : affiche la page
      }
    }, []);

    if (!authorized) return null; // ou un loader

    return <WrappedComponent {...(props as T & JSX.IntrinsicAttributes)} />;
  };
}
