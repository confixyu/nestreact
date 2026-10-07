import { Course } from "../domain/course.entity.js";
import { CourseRepository } from "../domain/course.repository.js";


export class InMemoryCourseRepository implements CourseRepository {
    private readonly courses = new Map<string, Course>();

    findById(id: string): Promise<Course | null> {
        return Promise.resolve(this.courses.get(id) ?? null);
    }

    findByIds(ids: string[]): Promise<Course[]> {
        const found = [...this.courses.values()]
            .filter((course) => ids.includes(course.id))
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        return Promise.resolve(found);
    }

    findAll(): Promise<Course[]> {
        const sorted = [...this.courses.values()].sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        );
        return Promise.resolve(sorted);
    }

    save(course: Course): Promise<void> {
        this.courses.set(course.id, course);
        return Promise.resolve();
    }

    delete(id: string): Promise<void> {
        this.courses.delete(id);
        return Promise.resolve();
    }
}