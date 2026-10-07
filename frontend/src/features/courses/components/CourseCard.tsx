import { Link } from 'react-router';
import type { Course } from '../types';
import { EnrollmentButton } from '../../enrollments/components/EnrollmentButton';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    return (
        <article className="course-card">
        <h2>
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
        </h2>
        {course.description ? <p>{course.description}</p> : <p className="muted">Sin descripción</p>}
        <EnrollmentButton courseId={course.id} />
        </article>
    );
}