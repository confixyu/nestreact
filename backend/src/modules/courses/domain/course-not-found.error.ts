import { NotFoundError } from '../../../shared/domain/domain.error.js';

export class CourseNotFoundError extends NotFoundError {
    constructor(id: string) {
        super(`Course ${id} not found`);
    }
}