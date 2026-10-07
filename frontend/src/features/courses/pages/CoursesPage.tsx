import { useAuth } from '../../auth/use-auth';
import { CourseCard } from '../components/CourseCard';
import { useCourses } from '../hooks';
import { Link } from 'react-router';
import { Role } from '../../auth/types';
import { useState } from 'react';

export function CoursesPage() {
    const { data: courses, isPending, isError, error, refetch } = useCourses();
    const { user } = useAuth();
    const [onlyMine, setOnlyMine] = useState(false);

    if (isPending) {
        return <p>Cargando cursos...</p>;
    }

    if (isError) {
        return (
        <section>
            <p className="error">No se pudieron cargar los cursos: {error.message}</p>
            <button onClick={() => void refetch()}>Reintentar</button>
        </section>
        );
    }
    const isTeacher = user?.role === Role.TEACHER;
    const visibleCourses = onlyMine ? courses.filter((course) => course.teacherId === user?.id) : courses;

    return (
    <section>
      <div className="page-header">
        <h1>Cursos</h1>
        {isTeacher && <Link to="/courses/new">+ Nuevo curso</Link>}
      </div>

      {isTeacher && (
        <label className="filter">
          <input
            type="checkbox"
            checked={onlyMine}
            onChange={(event) => setOnlyMine(event.target.checked)}
          />
          Mostrar solo mis cursos
        </label>
      )}

      {visibleCourses.length === 0 ? (
        <p className="muted">{onlyMine ? 'Todavía no has creado cursos.' : 'Aún no hay cursos.'}</p>
      ) : (
        visibleCourses.map((course) => <CourseCard key={course.id} course={course} />)
      )}
    </section>
  );
}