import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../use-auth';

export function GuestRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  if (user) {
    return <Navigate to="/courses" replace />;
  }
  return <Outlet />;
}
