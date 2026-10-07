import { Injectable } from '@nestjs/common';
import type { Course } from '../domain/course.entity.js';
import { CourseNotFoundError } from '../domain/course-not-found.error.js';
import { CourseRepository } from '../domain/course.repository.js';

export interface UpdateCourseInput {
  courseId: string;
  teacherId: string;
  title?: string;
  description?: string | null;
}

@Injectable()
export class UpdateCourseUseCase {
  constructor(private readonly courses: CourseRepository) {}

  async execute(input: UpdateCourseInput): Promise<Course> {
    const course = await this.courses.findById(input.courseId);
    if (!course) {
      throw new CourseNotFoundError(input.courseId);
    }

    course.ensureOwnedBy(input.teacherId);
    course.update({ title: input.title, description: input.description });

    await this.courses.save(course);
    return course;
  }
}