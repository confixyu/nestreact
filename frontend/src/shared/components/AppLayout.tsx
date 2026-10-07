import { NavLink, Outlet } from 'react-router';
import { useAuth } from '../../features/auth/use-auth';
import { Role } from '../../features/auth/types';

export function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="app">
      <header className="app-header">
        <strong>Aula</strong>
        <nav>
          <NavLink to="/courses">Cursos</NavLink>
          {user?.role === Role.STUDENT && <NavLink to="/enrollments">Mis cursos</NavLink>}
        </nav>
        <div className="session">
          {user ? (
            <>
              <span>{user.name} ({user.role === 'TEACHER' ? 'Profesor' : 'Estudiante'})</span>
              <button onClick={logout}>Salir</button>
            </>
          ) : (
            <NavLink to="/login">Iniciar sesión</NavLink>
          )}
        </div>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}