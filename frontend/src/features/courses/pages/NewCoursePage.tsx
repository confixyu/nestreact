import { useNavigate } from 'react-router';
import { CourseForm } from '../components/CourseForm';
import { useCreateCourse } from '../hooks';

export function NewCoursePage() {
  const navigate = useNavigate();
  const createCourse = useCreateCourse();

  return (
    <section>
      <h1>Nuevo curso</h1>
      <CourseForm
        submitLabel="Crear curso"
        isSubmitting={createCourse.isPending}
        serverError={createCourse.error?.message ?? null}
        onSubmit={(values) =>
          createCourse.mutate(
            { title: values.title, description: values.description || undefined },
            { onSuccess: (course) => navigate(`/courses/${course.id}`) },
          )
        }
      />
    </section>
  );
}