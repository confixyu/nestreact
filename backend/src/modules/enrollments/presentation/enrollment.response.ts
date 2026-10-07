import type { Enrollment } from '../domain/enrollment.entity.js';

export interface EnrollmentResponse {
  studentId: string;
  courseId: string;
  enrolledAt: string;
}

export function toEnrollmentResponse(enrollment: Enrollment): EnrollmentResponse {
  return {
    studentId: enrollment.studentId,
    courseId: enrollment.courseId,
    enrolledAt: enrollment.enrolledAt.toISOString(),
  };
}