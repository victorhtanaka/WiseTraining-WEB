import { Base } from './base.model';
import { Course } from './course.model';
import { User } from './user.model';
export interface UserCourse extends Base {
    comment: string;
    rating: number;
    progress: number;
    timeSpent: number;
    enrolledAt: Date;
    userId: number;
    user?: User;
    courseId: number;
    course?: Course;
}
