import { ForbiddenError } from '../../../shared/domain/domain.error.js';

export class OnlyStudentsCanEnrollError extends ForbiddenError {
  constructor() {
    super('Only students can enroll in courses');
  }
}