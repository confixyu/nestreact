import { Module } from '@nestjs/common';
import { CoursesController } from './presentation/courses.controller.js';
import { CreateCourseUseCase } from './application/create-course.use-case.js';
import { GetCourseUseCase } from './application/get-course.use-case.js';
import { ListCourseUseCase } from './application/list-course.use-case.js';
import { PrismaCourseRepository } from './infrastructure/prisma-course.repository.js';
import { CourseRepository } from './domain/course.repository.js';
import { UsersModule } from '../users/users.module.js';
import { UpdateCourseUseCase } from './application/update-course.use-case.js';
import { DeleteCourseUseCase } from './application/delete-course.use-case.js';

@Module({
    imports: [UsersModule],
    exports: [CourseRepository],
    controllers: [CoursesController],
    providers: [
        CreateCourseUseCase,
        ListCourseUseCase,
        GetCourseUseCase,
        UpdateCourseUseCase,
        DeleteCourseUseCase,
        { provide: CourseRepository, useClass: PrismaCourseRepository },
    ],
})
export class CoursesModule {}
