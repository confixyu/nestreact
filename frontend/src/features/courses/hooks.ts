import { skipToken, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { createCourse, deleteCourse, getCourse, getCourses, updateCourse } from './api';
import type { UpdateCourseInput } from './types';


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

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: courseKeys.all }),
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateCourseInput }) => updateCourse(id, input),
    onSuccess: (course) => {
      queryClient.setQueryData(courseKeys.detail(course.id), course);
      return queryClient.invalidateQueries({ queryKey: courseKeys.all, exact: true });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: courseKeys.all, exact: true }),
  });
}