import { Link } from 'react-router/internal/react-server-client';
import type { Course } from '../types';
import { useState } from 'react';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    const [isInterested, setIsInterested] = useState(false);
    return (
        <article className="course-card">
        <h2>
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
        </h2>
        {course.description ? <p>{course.description}</p> : <p className="muted">Sin descripción</p>}
        <button className="edit-button" onClick={() => setIsInterested(!isInterested)}>
            {isInterested ? 'Ya no me interesa' : 'Me interesa'}
        </button>
        </article>
    );
}