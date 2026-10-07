import { describe, expect, it } from 'vitest';

import { Course } from './course.entity.js'; 
import { DomainError } from '../../../shared/domain/domain.error.js';

const validInput = {
  title: 'Introducción a NestJS',
  description: 'Desde cero',
  teacherId: 'teacher-id',
};

describe('Course', () => {
  describe('create', () => {
    it('should trim the title', () => {
      const course = Course.create({ ...validInput, title: '  NestJS  ' });

      expect(course.title).toBe('NestJS');
    });

    it('should accept titles at the length limits (3 and 120)', () => {
      expect(() => Course.create({ ...validInput, title: 'a'.repeat(3) })).not.toThrow();
      expect(() => Course.create({ ...validInput, title: 'a'.repeat(120) })).not.toThrow();
    });

    it('should throw DomainError when the title is too short', () => {
      expect(() => Course.create({ ...validInput, title: 'ab' })).toThrow(DomainError);
    });

    it('should throw DomainError when the title is too long', () => {
      expect(() => Course.create({ ...validInput, title: 'a'.repeat(121) })).toThrow(DomainError);
    });

    it('should count the title length after trimming', () => {
      expect(() => Course.create({ ...validInput, title: '  ab  ' })).toThrow(DomainError);
    });

    it('should store a blank description as null', () => {
      const course = Course.create({ ...validInput, description: '   ' });

      expect(course.description).toBeNull();
    });

    it('should store a missing description as null', () => {
      const { description: _omit, ...withoutDescription } = validInput;
      const course = Course.create(withoutDescription);

      expect(course.description).toBeNull();
    });
  });
});
