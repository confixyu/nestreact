import { ConflictError } from '../../../shared/domain/domain.error.js';

export class OnlyTeachersCanCreateCoursesError extends ConflictError {
    constructor() {
        super('Only teachers can create courses');
    }
}
