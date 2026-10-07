import { ConflictError } from '../../../shared/domain/domain.error.js';

export class AlreadyEnrolledError extends ConflictError {
  constructor(courseId: string) {
    super(`Student is already enrolled in course ${courseId}`);
  }
}