import { Injectable } from "@nestjs/common";
import { CourseRepository } from "../domain/course.repository.js";
import { CourseNotFoundError } from "../domain/course-not-found.error.js";
import { Course } from "../domain/course.entity.js";


@Injectable()
export class GetCourseUseCase {
    constructor(private readonly courseRepository: CourseRepository) {}

    async execute(id: string): Promise<Course> {
        const course = await this.courseRepository.findById(id);
        if (!course) {
            throw new CourseNotFoundError(id);
        }
        return course;
    }
}