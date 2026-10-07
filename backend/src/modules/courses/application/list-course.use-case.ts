import { Injectable } from '@nestjs/common';
import type { Course } from '../domain/course.entity.js';
import { CourseRepository } from '../domain/course.repository.js';

@Injectable()
export class ListCourseUseCase {
  constructor(private readonly courseRepository: CourseRepository) {}

    async execute(): Promise<Course[]> {
        return this.courseRepository.findAll();
    }
}