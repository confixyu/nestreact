import { ForbiddenError } from '../../../shared/domain/domain.error.js';

export class NotCourseOwnerError extends ForbiddenError {
  constructor(courseId: string) {
    super(`Only the course owner can modify course ${courseId}`);
  }
}