import { Base } from './base.model';
import { Course } from './course.model';

export interface Category extends Base {
  name: string;
  description?: string;
  courses?: Course[];
}
