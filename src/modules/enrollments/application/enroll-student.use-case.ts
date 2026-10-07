import { Injectable } from '@nestjs/common';
import { CourseNotFoundError } from '../../courses/domain/course-not-found.error.js';
import { CourseRepository } from '../../courses/domain/course.repository.js';
import { UserRepository } from '../../users/domain/user.repository.js';
import { AlreadyEnrolledError } from '../domain/already-enrolled.error.js';
import { Enrollment } from '../domain/enrollment.entity.js';
import { EnrollmentRepository } from '../domain/enrollment.repository.js';
import { OnlyStudentsCanEnrollError } from '../domain/only-students-can-enroll.error.js';

export interface EnrollStudentInput {
  studentId: string;
  courseId: string;
}

@Injectable()
export class EnrollStudentUseCase {
  constructor(
    private readonly enrollments: EnrollmentRepository,
    private readonly users: UserRepository,
    private readonly courses: CourseRepository,
  ) {}

  async execute(input: EnrollStudentInput): Promise<Enrollment> {
    const student = await this.users.findById(input.studentId);
    if (!student?.isStudent()) {
      throw new OnlyStudentsCanEnrollError();
    }

    const course = await this.courses.findById(input.courseId);
    if (!course) {
      throw new CourseNotFoundError(input.courseId);
    }

    if (await this.enrollments.exists(input.studentId, input.courseId)) {
      throw new AlreadyEnrolledError(input.courseId);
    }

    const enrollment = Enrollment.create(input);
    await this.enrollments.save(enrollment);
    return enrollment;
  }
}