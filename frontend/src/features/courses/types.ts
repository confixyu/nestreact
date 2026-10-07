export interface Course {
  id: string;
  title: string;
  description: string | null;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseInput {
  title: string;
  description?: string;
}

export interface UpdateCourseInput {
  title?: string;
  description?: string | null;
}