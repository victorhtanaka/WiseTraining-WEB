import { Base } from './base.model';
import { Category } from './category.model';
import { Company } from './company.model';
import { CourseContent } from './course-content.model';
import { Media } from './media.model';
import { Tag } from './tag.model';
import { UserCourse } from './user-course.model';

export interface Course extends Base {
  title?: string;
  description?: string;
  mediaId: number;
  media?: Media;
  companyId: number;
  company?: Company;
  duration: number;
  price: number;
  isPublished: boolean;
  categoryId: number;
  category?: Category;
  language?: string;
  tags?: Tag[];
  contents?: CourseContent[];
  enrollments?: UserCourse[];
}
