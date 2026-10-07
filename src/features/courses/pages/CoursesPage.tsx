import { CourseCard } from '../components/CourseCard';
import { useCourses } from '../hooks';

export function CoursesPage() {
  const { data: courses, isPending, isError, error, refetch } = useCourses();

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

  return (
    <section>
      <h1>Cursos</h1>
      {courses.length === 0 ? (
        <p className="muted">Aún no hay cursos.</p>
      ) : (
        courses.map((course) => <CourseCard key={course.id} course={course} />)
      )}
    </section>
  );
}