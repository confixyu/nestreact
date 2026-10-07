import { Module } from '@nestjs/common';
import { CoursesModule } from '../courses/courses.module.js';
import { UsersModule } from '../users/users.module.js';
import { EnrollStudentUseCase } from './application/enroll-student.use-case.js';
import { ListStudentCoursesUseCase } from './application/list-student-courses.use-case.js';
import { UnenrollStudentUseCase } from './application/unenroll-student.use-case.js';
import { EnrollmentRepository } from './domain/enrollment.repository.js';
import { PrismaEnrollmentRepository } from './infrastructure/prisma-enrollment.repository.js';
import { EnrollmentsController } from './presentation/enrollments.controller.js';

@Module({
  imports: [UsersModule, CoursesModule],
  controllers: [EnrollmentsController],
  providers: [
    EnrollStudentUseCase,
    UnenrollStudentUseCase,
    ListStudentCoursesUseCase,
    { provide: EnrollmentRepository, useClass: PrismaEnrollmentRepository },
  ],
})
export class EnrollmentsModule {}