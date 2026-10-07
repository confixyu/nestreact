import { Role } from '../../auth/types';
import { useAuth } from '../../auth/use-auth';
import { useEnroll, useMyCourses, useUnenroll } from '../hooks';

interface EnrollmentButtonProps {
  courseId: string;
}

export function EnrollmentButton({ courseId }: EnrollmentButtonProps) {
  const { user } = useAuth();
  const { data: myCourses, isPending } = useMyCourses();
  const enrollMutation = useEnroll();
  const unenrollMutation = useUnenroll();

  if (user?.role !== Role.STUDENT) {
    return null;
  }
  if (isPending) {
    return <button disabled>...</button>;
  }

  const isEnrolled = myCourses?.some((course) => course.id === courseId) ?? false;
  const isWorking = enrollMutation.isPending || unenrollMutation.isPending;
  const error = enrollMutation.error ?? unenrollMutation.error;

  return (
    <div className="enrollment">
      {isEnrolled ? (
        <button disabled={isWorking} onClick={() => unenrollMutation.mutate(courseId)}>
          {isWorking ? 'Procesando...' : '✓ Inscrito · Darme de baja'}
        </button>
      ) : (
        <button disabled={isWorking} onClick={() => enrollMutation.mutate(courseId)}>
          {isWorking ? 'Procesando...' : 'Inscribirme'}
        </button>
      )}
      {error && <p className="error">{error.message}</p>}
    </div>
  );
}