import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client.js';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service.js';
import { AlreadyEnrolledError } from '../domain/already-enrolled.error.js';
import type { Enrollment } from '../domain/enrollment.entity.js';
import { EnrollmentRepository } from '../domain/enrollment.repository.js';
import { EnrollmentMapper } from './enrollment.mapper.js';

@Injectable()
export class PrismaEnrollmentRepository implements EnrollmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async exists(studentId: string, courseId: string): Promise<boolean> {
    const row = await this.prisma.enrollment.findUnique({
      where: { studentId_courseId: { studentId, courseId } },
    });
    return row !== null;
  }

  async findByStudent(studentId: string): Promise<Enrollment[]> {
    const rows = await this.prisma.enrollment.findMany({
      where: { studentId },
      orderBy: { enrolledAt: 'desc' },
    });
    return rows.map((row) => EnrollmentMapper.toDomain(row));
  }

  async save(enrollment: Enrollment): Promise<void> {
    try {
      await this.prisma.enrollment.create({
        data: {
          studentId: enrollment.studentId,
          courseId: enrollment.courseId,
          enrolledAt: enrollment.enrolledAt,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new AlreadyEnrolledError(enrollment.courseId);
      }
      throw error;
    }
  }

  async delete(studentId: string, courseId: string): Promise<void> {
    await this.prisma.enrollment.delete({
      where: { studentId_courseId: { studentId, courseId } },
    });
  }
}