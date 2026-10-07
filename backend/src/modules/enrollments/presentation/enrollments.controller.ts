import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import type { AccessTokenPayload } from '../../auth/application/ports/token-service.js';
import { CurrentUser } from '../../auth/presentation/decorators/current-user.decorator.js';
import { Roles } from '../../auth/presentation/decorators/roles.decorator.js';
import { type CourseResponse, toCourseResponse } from '../../courses/presentation/course.response.js';
import { Role } from '../../users/domain/role.js';
import { EnrollStudentUseCase } from '../application/enroll-student.use-case.js';
import { ListStudentCoursesUseCase } from '../application/list-student-courses.use-case.js';
import { UnenrollStudentUseCase } from '../application/unenroll-student.use-case.js';
import { type EnrollDto, enrollSchema } from './dto/enroll.dto.js';
import { type EnrollmentResponse, toEnrollmentResponse } from './enrollment.response.js';

@Controller('enrollments')
@Roles(Role.STUDENT)
export class EnrollmentsController {
  constructor(
    private readonly enrollStudentUseCase: EnrollStudentUseCase,
    private readonly unenrollStudentUseCase: UnenrollStudentUseCase,
    private readonly listStudentCoursesUseCase: ListStudentCoursesUseCase,
  ) {}

  @Post()
  async enroll(
    @Body({ schema: enrollSchema }) body: EnrollDto,
    @CurrentUser() user: AccessTokenPayload,
  ): Promise<EnrollmentResponse> {
    const enrollment = await this.enrollStudentUseCase.execute({
      studentId: user.userId,
      courseId: body.courseId,
    });
    return toEnrollmentResponse(enrollment);
  }

  @Delete(':courseId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unenroll(
    @Param('courseId', ParseUUIDPipe) courseId: string,
    @CurrentUser() user: AccessTokenPayload,
  ): Promise<void> {
    await this.unenrollStudentUseCase.execute({ studentId: user.userId, courseId });
  }

  @Get('my-courses')
  async listMyCourses(@CurrentUser() user: AccessTokenPayload): Promise<CourseResponse[]> {
    const courses = await this.listStudentCoursesUseCase.execute(user.userId);
    return courses.map(toCourseResponse);
  }
}