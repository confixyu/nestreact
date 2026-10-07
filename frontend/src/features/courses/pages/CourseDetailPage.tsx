import { Link, useNavigate, useParams } from 'react-router';
import { ApiError } from '../../../shared/api/http-client';
import { useCourse, useDeleteCourse } from '../hooks';
import { useState } from 'react';
import { useAuth } from '../../auth/use-auth';
import { EnrollmentButton } from '../../enrollments/components/EnrollmentButton';

export function CourseDetailPage() {
    const { courseId } = useParams<{ courseId: string }>();
    const { data: course, isPending, isError, error } = useCourse(courseId);
    const navigate = useNavigate();
    const { user } = useAuth();
    const deleteCourse = useDeleteCourse();
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

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
        {course.teacherId === user?.id && (
        <div className="owner-actions">
            <Link to={`/courses/${course.id}/edit`}>Editar</Link>
            {isConfirmingDelete ? (
            <>
                <span>¿Seguro que quieres eliminarlo?</span>
                <button
                className="danger"
                disabled={deleteCourse.isPending}
                onClick={() =>
                    deleteCourse.mutate(course.id, {
                    onSuccess: () => navigate('/courses', { replace: true }),
                    })
                }
                >
                {deleteCourse.isPending ? 'Eliminando...' : 'Sí, eliminar'}
                </button>
                <button onClick={() => setIsConfirmingDelete(false)}>Cancelar</button>
            </>
            ) : (
            <button className="danger" onClick={() => setIsConfirmingDelete(true)}>
                Eliminar
            </button>
            )}
            {deleteCourse.error && <p className="error">{deleteCourse.error.message}</p>}
        </div>
        )}
        <EnrollmentButton courseId={course.id} />
        </section>
    );
}