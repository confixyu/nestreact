import type { Enrollment as PrismaEnrollment } from '../../../generated/prisma/client.js';
import { Enrollment } from '../domain/enrollment.entity.js';

export class EnrollmentMapper {
  static toDomain(raw: PrismaEnrollment): Enrollment {
    return Enrollment.restore({
      studentId: raw.studentId,
      courseId: raw.courseId,
      enrolledAt: raw.enrolledAt,
    });
  }
}