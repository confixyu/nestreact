import { beforeEach, describe, expect, it } from 'vitest';
import { Course } from '../domain/course.entity.js';
import { CourseNotFoundError } from '../domain/course-not-found.error.js';
import { NotCourseOwnerError } from '../domain/not-course-owner.error.js';
import { InMemoryCourseRepository } from '../infrastructure/in-memory-course.repository.js';
import { UpdateCourseUseCase } from './update-course.use-case.js';

const OWNER_ID = 'owner-teacher-id';
const OTHER_TEACHER_ID = 'other-teacher-id';

describe('UpdateCourseUseCase', () => {
  let courses: InMemoryCourseRepository;
  let useCase: UpdateCourseUseCase;
  let existing: Course;

  beforeEach(async () => {
    courses = new InMemoryCourseRepository();
    useCase = new UpdateCourseUseCase(courses);

    existing = Course.create({
      title: 'Título original',
      description: 'Descripción original',
      teacherId: OWNER_ID,
    });
    await courses.save(existing);
  });

  it('should let the owner update the title', async () => {
    const updated = await useCase.execute({
      courseId: existing.id,
      teacherId: OWNER_ID,
      title: 'Título nuevo',
    });

    expect(updated.title).toBe('Título nuevo');
    const stored = await courses.findById(existing.id);
    expect(stored?.title).toBe('Título nuevo');
  });

  it('should reject a teacher who is not the owner and leave the course unchanged', async () => {
    await expect(
      useCase.execute({
        courseId: existing.id,
        teacherId: OTHER_TEACHER_ID,
        title: 'Hackeado',
      }),
    ).rejects.toThrow(NotCourseOwnerError);

    const stored = await courses.findById(existing.id);
    expect(stored?.title).toBe('Título original');
  });

  it('should throw CourseNotFoundError when the course does not exist', async () => {
    await expect(
      useCase.execute({
        courseId: crypto.randomUUID(),
        teacherId: OWNER_ID,
        title: 'Título nuevo',
      }),
    ).rejects.toThrow(CourseNotFoundError);
  });

  it('should clear the description when it is null', async () => {
    const updated = await useCase.execute({
      courseId: existing.id,
      teacherId: OWNER_ID,
      description: null,
    });

    expect(updated.description).toBeNull();
  });

  it('should keep the description when it is omitted', async () => {
    const updated = await useCase.execute({
      courseId: existing.id,
      teacherId: OWNER_ID,
      title: 'Título nuevo',
    });

    expect(updated.description).toBe('Descripción original');
  });
});
