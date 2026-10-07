import { Controller, Get, Post, Patch, Delete, Param, Body, ParseUUIDPipe, HttpStatus, HttpCode } from "@nestjs/common";
import { GetCourseUseCase } from "../application/get-course.use-case.js";
import { ListCourseUseCase } from "../application/list-course.use-case.js";
import { CreateCourseUseCase } from "../application/create-course.use-case.js";
import { type CourseResponse, toCourseResponse } from "./course.response.js";
import { type CreateCourseDto, createCourseSchema } from './dto/create-course.dto.js';
import { Role } from "../../users/domain/role.js";
import { Roles } from "../../auth/presentation/decorators/roles.decorator.js";
import { CurrentUser } from "../../auth/presentation/decorators/current-user.decorator.js";
import type { AccessTokenPayload } from "../../auth/application/ports/token-service.js";
import { type UpdateCourseDto, updateCourseSchema } from "./dto/update-course.dto.js";
import { UpdateCourseUseCase } from "../application/update-course.use-case.js";
import { DeleteCourseUseCase } from "../application/delete-course.use-case.js";



@Controller('courses')
export class CoursesController {
    constructor(
        private readonly getCourseUseCase: GetCourseUseCase,
        private readonly listCourseUseCase: ListCourseUseCase,
        private readonly createCourseUseCase: CreateCourseUseCase,
        private readonly updateCourseUseCase: UpdateCourseUseCase,
        private readonly deleteCourseUseCase: DeleteCourseUseCase,
    ) {}

    @Get(':id')
    async getCourse(@Param('id', ParseUUIDPipe) id: string): Promise<CourseResponse> {
        const course = await this.getCourseUseCase.execute(id);
        return toCourseResponse(course);
    }

    @Get()
    async listCourses(): Promise<CourseResponse[]> {
        const courses = await this.listCourseUseCase.execute();
        return courses.map(toCourseResponse);
    }

    @Post()
    @Roles(Role.TEACHER)
    async createCourse(
        @Body({ schema: createCourseSchema }) body: CreateCourseDto,
        @CurrentUser() user: AccessTokenPayload,
    ): Promise<CourseResponse> {
        const course = await this.createCourseUseCase.execute({...body, teacherId: user.userId});
        return toCourseResponse(course);
    }

    @Patch(':id')
    @Roles(Role.TEACHER)
    async updateCourse(
        @Param('id', ParseUUIDPipe) id: string,
        @Body({ schema: updateCourseSchema }) body: UpdateCourseDto,
        @CurrentUser() user: AccessTokenPayload,
    ): Promise<CourseResponse> {
        const course = await this.updateCourseUseCase.execute({
            ...body,
            courseId: id,
            teacherId: user.userId,
        });
        return toCourseResponse(course);
    }

    @Delete(':id')
    @Roles(Role.TEACHER)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteCourse(
        @Param('id', ParseUUIDPipe) id: string,
        @CurrentUser() user: AccessTokenPayload,
    ): Promise<void> {
        await this.deleteCourseUseCase.execute(id, user.userId);
    }
}