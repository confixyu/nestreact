import { apiRequest } from '../../shared/api/http-client';
import type { Course, CreateCourseInput, UpdateCourseInput } from './types';

export function getCourses(): Promise<Course[]> {
  return apiRequest<Course[]>('/courses');
}

export function getCourse(id: string): Promise<Course> {
  return apiRequest<Course>(`/courses/${id}`);
}

export function createCourse(input: CreateCourseInput): Promise<Course> {
  return apiRequest<Course>('/courses', { method: 'POST', body: input });
}

export function updateCourse(id: string, input: UpdateCourseInput): Promise<Course> {
  return apiRequest<Course>(`/courses/${id}`, { method: 'PATCH', body: input });
}

export function deleteCourse(id: string): Promise<void> {
  return apiRequest<void>(`/courses/${id}`, { method: 'DELETE' });
}