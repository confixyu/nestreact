import { Link, useNavigate, useParams } from 'react-router';
import { useAuth } from '../../auth/use-auth';
import { CourseForm } from '../components/CourseForm';
import { useCourse, useUpdateCourse } from '../hooks';

export function EditCoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: course, isPending, isError } = useCourse(courseId);
  const updateCourse = useUpdateCourse();

  if (isPending) {
    return <p>Cargando curso...</p>;
  }
  if (isError) {
    return (
      <section>
        <h1>Curso no encontrado</h1>
        <Link to="/courses">Volver a los cursos</Link>
      </section>
    );
  }
  if (course.teacherId !== user?.id) {
    return (
      <section>
        <h1>No puedes editar este curso</h1>
        <p className="muted">Solo el profesor que lo creó puede modificarlo.</p>
        <Link to={`/courses/${course.id}`}>Volver al curso</Link>
      </section>
    );
  }

  return (
    <section>
      <Link to={`/courses/${course.id}`}>← Cancelar</Link>
      <h1>Editar curso</h1>
      <CourseForm
        key={course.id}
        initialValues={{ title: course.title, description: course.description ?? '' }}
        submitLabel="Guardar cambios"
        isSubmitting={updateCourse.isPending}
        serverError={updateCourse.error?.message ?? null}
        onSubmit={(values) =>
          updateCourse.mutate(
            {
              id: course.id,
              input: { title: values.title, description: values.description || null },
            },
            { onSuccess: () => navigate(`/courses/${course.id}`) },
          )
        }
      />
    </section>
  );
}