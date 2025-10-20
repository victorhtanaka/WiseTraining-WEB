import { Course } from './course.model';
import { CourseContent } from './course-content.model';
import { Media } from './media.model';

export interface CourseContentComplete {
  content: CourseContent;
  contentMedia?: Media;
}

export interface CourseComplete {
  course: Course;
  courseMedia: Media;
  contents: CourseContentComplete[];
  contentIdsToDelete: number[];
}