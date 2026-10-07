import { Injectable } from '@nestjs/common';
import type { Course } from '../../courses/domain/course.entity.js';
import { CourseRepository } from '../../courses/domain/course.repository.js';
import { EnrollmentRepository } from '../domain/enrollment.repository.js';

@Injectable()
export class ListStudentCoursesUseCase {
  constructor(
    private readonly enrollments: EnrollmentRepository,
    private readonly courses: CourseRepository,
  ) {}

  async execute(studentId: string): Promise<Course[]> {
    const enrollments = await this.enrollments.findByStudent(studentId);
    const courseIds = enrollments.map((enrollment) => enrollment.courseId);
    return this.courses.findByIds(courseIds);
  }
}