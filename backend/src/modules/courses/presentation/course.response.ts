import type { Course } from '../domain/course.entity.js';

export interface CourseResponse {
    id: string;
    title: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export function toCourseResponse(course: Course): CourseResponse {
    return {
        id: course.id,
        title: course.title,
        description: course.description,
        createdAt: course.createdAt.toISOString(),
        updatedAt: course.updatedAt.toISOString(),
    };
}