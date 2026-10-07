import { apiRequest } from '../../shared/api/http-client';
import type { Course } from '../courses/types';

export function getMyCourses(): Promise<Course[]> {
  return apiRequest<Course[]>('/enrollments/my-courses');
}

export function enroll(courseId: string): Promise<void> {
  return apiRequest<void>('/enrollments', { method: 'POST', body: { courseId } });
}

export function unenroll(courseId: string): Promise<void> {
  return apiRequest<void>(`/enrollments/${courseId}`, { method: 'DELETE' });
}