import type { Enrollment } from '../domain/enrollment.entity.js';

export abstract class EnrollmentRepository {
    abstract exists(studentId: string, courseId: string): Promise<boolean>;
    abstract findByStudent(studentId: string): Promise<Enrollment[]>;
    abstract save(enrollment: Enrollment): Promise<void>;
    abstract delete(studentId: string, courseId: string): Promise<void>;
}