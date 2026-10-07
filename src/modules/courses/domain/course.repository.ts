import type { Course } from './course.entity.js';

export abstract class CourseRepository {
  abstract findById(id: string): Promise<Course | null>;
  abstract findByIds(ids: string[]): Promise<Course[]>;
  abstract findAll(): Promise<Course[]>;
  abstract save(course: Course): Promise<void>;
  abstract delete(id: string): Promise<void>;
}