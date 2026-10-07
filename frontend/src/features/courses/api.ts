import { apiRequest } from '../../shared/api/http-client';
import type { Course } from './types';

export function getCourses(): Promise<Course[]> {
  return apiRequest<Course[]>('/courses');
}

export function getCourse(id: string): Promise<Course> {
  return apiRequest<Course>(`/courses/${id}`);
}