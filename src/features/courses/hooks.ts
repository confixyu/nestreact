import { skipToken, useQuery } from '@tanstack/react-query';
import { getCourse, getCourses } from './api';

export const courseKeys = {
  all: ['courses'] as const,
  detail: (id: string | undefined) => ['courses', id] as const,
};

export function useCourses() {
  return useQuery({
    queryKey: courseKeys.all,
    queryFn: getCourses,
  });
}

export function useCourse(courseId: string | undefined) {
  return useQuery({
    queryKey: courseKeys.detail(courseId),
    queryFn: courseId ? () => getCourse(courseId) : skipToken,
  });
}