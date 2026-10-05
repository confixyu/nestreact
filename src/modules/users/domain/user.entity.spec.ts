import { describe, expect, it } from 'vitest';

import { User } from './user.entity.js'; 
import { DomainError } from '../../../shared/domain/domain.error.js';

describe('User', () => {
    const teacher = User.create({
        email: 'user@example.com',
        passwordHash: 'hashed-password',
        name: 'John Doe',
        role: 'TEACHER',
    });

    const student = User.create({
        email: 'user@example.com',
        passwordHash: 'hashed-password',
        name: 'John Doe',
        role: 'STUDENT',
    });

    describe('isTeacher', () => {
        it('should return true for a teacher user', () => {
            expect(teacher.isTeacher()).toBe(true);
        });

        it('should return false for a student user', () => {
            expect(student.isTeacher()).toBe(false);
        });
    });

    describe('userEmailError', () => {
        it('should throw a DomainError for an invalid email', () => {
            expect(() => User.create({ 
                email: 'invalid-email',
                passwordHash: 'hashed-password',
                name: 'John Doe',
                role: 'STUDENT',
            })).toThrow(DomainError);
        });
    });
});
