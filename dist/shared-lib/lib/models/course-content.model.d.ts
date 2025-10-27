import { Base } from './base.model';
import { Course } from './course.model';
import { Exam } from './exam.model';
import { Media } from './media.model';
export interface CourseContent extends Base {
    order: number;
    title?: string;
    mediaId?: number;
    media?: Media;
    textContent?: string;
    duration: number;
    examId?: number;
    exam?: Exam;
    courseId: number;
    course?: Course;
}
