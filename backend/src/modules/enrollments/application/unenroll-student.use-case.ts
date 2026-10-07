import { Injectable } from '@nestjs/common';
import { EnrollmentRepository } from '../domain/enrollment.repository.js';
import { NotEnrolledError } from '../domain/not-enrolled.error.js';

@Injectable()
export class UnenrollStudentUseCase {
  constructor(private readonly enrollments: EnrollmentRepository) {}

  async execute(input: { studentId: string; courseId: string }): Promise<void> {
    const isEnrolled = await this.enrollments.exists(input.studentId, input.courseId);
    if (!isEnrolled) {
      throw new NotEnrolledError(input.courseId);
    }
    await this.enrollments.delete(input.studentId, input.courseId);
  }
}