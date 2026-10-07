import type { Course } from './types';

export const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Introducción a NestJS',
    description: 'Desde cero',
    teacherId: 't1',
    createdAt: '2026-10-01T10:00:00.000Z',
    updatedAt: '2026-10-01T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'React para principiantes',
    description: null,
    teacherId: 't1',
    createdAt: '2026-10-02T10:00:00.000Z',
    updatedAt: '2026-10-02T10:00:00.000Z',
  },
];