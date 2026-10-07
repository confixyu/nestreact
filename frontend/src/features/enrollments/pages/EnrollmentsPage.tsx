
import { CourseCard } from '../../courses/components/CourseCard';
import { useMyCourses } from '../hooks';

export function EnrollmentsPage() {
    const { data: courses, isPending, isError, error, refetch } = useMyCourses();

    if (isPending) {
        return <p>Cargando mis cursos...</p>;
    }

    if (isError) {
        return (
        <section>
            <p className="error">No se pudieron cargar los cursos: {error.message}</p>
            <button onClick={() => void refetch()}>Reintentar</button>
        </section>
        );
    }

    return (
    <section>
      <div className="page-header">
        <h1>Mis cursos inscritos</h1>
      </div>

      {courses.length === 0 ? (
        <p className="muted">{'Aún no hay cursos inscritos.'}</p>
      ) : (
        courses.map((course) => <CourseCard key={course.id} course={course} />)
      )}
    </section>
  );
}