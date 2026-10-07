import { Navigate, Outlet } from 'react-router';
import type { Role } from '../types';
import { useAuth } from '../use-auth';

export function RequireRole({ role }: { role: Role }) {
  const { user } = useAuth();

  if (user?.role !== role) {
    return <Navigate to="/courses" replace />;
  }
  return <Outlet />;
}