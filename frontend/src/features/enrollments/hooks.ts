import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Role } from '../auth/types';
import { useAuth } from '../auth/use-auth';
import { enroll, getMyCourses, unenroll } from './api';

export const enrollmentKeys = {
  all: ['enrollments'] as const,
  myCourses: ['enrollments', 'my-courses'] as const,
};

export function useMyCourses() {
  const { user } = useAuth();
  return useQuery({
    queryKey: enrollmentKeys.myCourses,
    queryFn: getMyCourses,
    enabled: user?.role === Role.STUDENT,
  });
}

export function useEnroll() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: enroll,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: enrollmentKeys.all }),
  });
}

export function useUnenroll() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unenroll,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: enrollmentKeys.all }),
  });
}