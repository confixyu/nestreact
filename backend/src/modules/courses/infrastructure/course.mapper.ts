import type { Course as PrismaCourse } from '../../../generated/prisma/client.js';
import { Course } from '../domain/course.entity.js';

export class CourseMapper {
  static toDomain(raw: PrismaCourse): Course {
    return Course.restore({
      id: raw.id,
      title: raw.title,
      description: raw.description,
      teacherId: raw.teacherId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(course: Course) {
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      teacherId: course.teacherId,
    };
  }
}