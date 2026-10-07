import { DomainError } from '../../../shared/domain/domain.error.js';
import { NotCourseOwnerError } from './not-course-owner.error.js';

const TITLE_MIN_LENGTH = 3;
const TITLE_MAX_LENGTH = 120;

export interface CourseProps {
  id: string;
  title: string;
  description: string | null;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateCourseInput {
  title: string;
  description?: string | null;
  teacherId: string;
}

export class Course {
  private constructor(private readonly props: CourseProps) {}

  static create(input: CreateCourseInput): Course {
    const now = new Date();
    return new Course({
      id: crypto.randomUUID(),
      title: Course.validateTitle(input.title),
      description: Course.normalizeDescription(input.description),
      teacherId: input.teacherId,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(props: CourseProps): Course {
    return new Course(props);
  }

  get id(): string {
    return this.props.id;
  }
  get title(): string {
    return this.props.title;
  }
  get description(): string | null {
    return this.props.description;
  }
  get teacherId(): string {
    return this.props.teacherId;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  isOwnedBy(teacherId: string): boolean {
    return this.props.teacherId === teacherId;
  }

  ensureOwnedBy(teacherId: string): void {
    if (!this.isOwnedBy(teacherId)) {
      throw new NotCourseOwnerError(this.id);
    }
  }

  update(changes: { title?: string; description?: string | null }): void {
    if (changes.title !== undefined) {
      this.props.title = Course.validateTitle(changes.title);
    }
    if (changes.description !== undefined) {
      this.props.description = Course.normalizeDescription(changes.description);
    }
    this.props.updatedAt = new Date();
  }

  private static validateTitle(raw: string): string {
    const title = raw.trim();
    if (title.length < TITLE_MIN_LENGTH || title.length > TITLE_MAX_LENGTH) {
      throw new DomainError(
        `Course title must be between ${TITLE_MIN_LENGTH} and ${TITLE_MAX_LENGTH} characters`,
      );
    }
    return title;
  }

  private static normalizeDescription(raw: string | null | undefined): string | null {
    const description = raw?.trim();
    return description ? description : null;
  }
}