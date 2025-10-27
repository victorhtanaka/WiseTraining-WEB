import { Base } from './base.model';
import { Group } from './group.model';
import { Role } from './role.model';
import { UserCourse } from './user-course.model';
export interface User extends Base {
    email?: string;
    fullName?: string;
    passwordHash?: string;
    roleId?: number;
    role?: Role;
    enrollments?: UserCourse[];
    groups?: Group[];
}
