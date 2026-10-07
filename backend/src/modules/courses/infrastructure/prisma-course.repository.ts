import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service.js';
import type { Course } from '../domain/course.entity.js';
import { CourseRepository } from '../domain/course.repository.js';
import { CourseMapper } from './course.mapper.js';

@Injectable()
export class PrismaCourseRepository implements CourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Course | null> {
    const raw = await this.prisma.course.findUnique({ where: { id } });
    return raw ? CourseMapper.toDomain(raw) : null;
  }

  async findByIds(ids: string[]): Promise<Course[]> {
    const rows = await this.prisma.course.findMany({
        where: { id: { in: ids } },
        orderBy: { createdAt: 'desc' },
    });
    return rows.map((row) => CourseMapper.toDomain(row));
  }

  async findAll(): Promise<Course[]> {
    const rows = await this.prisma.course.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map((row) => CourseMapper.toDomain(row));
  }

  async save(course: Course): Promise<void> {
    const data = CourseMapper.toPersistence(course);
    await this.prisma.course.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.course.delete({ where: { id } });
  }
}