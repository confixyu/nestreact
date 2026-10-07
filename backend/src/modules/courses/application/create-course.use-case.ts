import { Injectable } from '@nestjs/common';
import { Course } from '../domain/course.entity.js';
import { CourseRepository } from '../domain/course.repository.js';
import { OnlyTeachersCanCreateCoursesError } from '../domain/only-teachers-can-create-courses.error.js';
import { UserRepository } from '../../users/domain/user.repository.js';


export interface CreateCourseInput {
  title: string;
  description?: string | null;
  teacherId: string;
}

@Injectable()
export class CreateCourseUseCase {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly users: UserRepository,
) {}

  async execute(input: CreateCourseInput): Promise<Course> {
    const teacher = await this.users.findById(input.teacherId);
    if (!teacher?.isTeacher()) {
        throw new OnlyTeachersCanCreateCoursesError();   // → 403
    }

    const course = Course.create(input);
    await this.courseRepository.save(course);
    return course;
  }
}