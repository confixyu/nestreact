import { Injectable } from "@nestjs/common";
import { CourseRepository } from "../domain/course.repository.js";
import { CourseNotFoundError } from "../domain/course-not-found.error.js";


@Injectable()
export class DeleteCourseUseCase {
    constructor(private readonly courseRepository: CourseRepository) {}

    async execute(id: string, teacherId: string): Promise<void> {
        const course = await this.courseRepository.findById(id);
        if (!course) {
            throw new CourseNotFoundError(id);
        }

        course.ensureOwnedBy(teacherId);
        await this.courseRepository.delete(id);
    }
}