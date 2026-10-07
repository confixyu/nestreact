import { Link, useParams } from 'react-router';
import { ApiError } from '../../../shared/api/http-client';
import { useCourse } from '../hooks';

export function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: course, isPending, isError, error } = useCourse(courseId);

  if (isPending) {
    return <p>Cargando curso...</p>;
  }

  if (isError) {
    const notFound = error instanceof ApiError && (error.status === 404 || error.status === 400);
    return (
      <section>
        <h1>{notFound ? 'Curso no encontrado' : 'Error al cargar el curso'}</h1>
        <Link to="/courses">Volver a los cursos</Link>
      </section>
    );
  }

  return (
    <section>
      <Link to="/courses">← Volver</Link>
      <h1>{course.title}</h1>
      {course.description ? <p>{course.description}</p> : <p className="muted">Sin descripción</p>}
      <p className="muted">Creado el {new Date(course.createdAt).toLocaleDateString('es-CO')}</p>
    </section>
  );
}