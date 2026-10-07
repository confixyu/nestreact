export interface EnrollmentProps {
  studentId: string;
  courseId: string;
  enrolledAt: Date;
}

export class Enrollment {
  private constructor(private readonly props: EnrollmentProps) {}

  static create(input: { studentId: string; courseId: string }): Enrollment {
    return new Enrollment({ ...input, enrolledAt: new Date() });
  }

  static restore(props: EnrollmentProps): Enrollment {
    return new Enrollment(props);
  }

  get studentId(): string {
    return this.props.studentId;
  }
  get courseId(): string {
    return this.props.courseId;
  }
  get enrolledAt(): Date {
    return this.props.enrolledAt;
  }
}