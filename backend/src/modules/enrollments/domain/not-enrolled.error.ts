import { NotFoundError } from '../../../shared/domain/domain.error.js';

export class NotEnrolledError extends NotFoundError {
  constructor(courseId: string) {
    super(`Student is not enrolled in course ${courseId}`);
  }
}