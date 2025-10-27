import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Course } from '../models/course.model';
import { CourseContent } from '../models/course-content.model';
import { Observable } from 'rxjs';
import { CourseComplete } from '../models/course-complete.model';
import { CourseSearchParams, CourseSearchResult } from '../models/course-search.model';
import * as i0 from "@angular/core";
export declare class CourseService extends BaseService<Course> {
    constructor(http: HttpClient);
    saveComplete(courseComplete: CourseComplete): Observable<Course>;
    getContents(courseId: number): Observable<CourseContent[]>;
    searchCourses(searchParams: CourseSearchParams): Observable<CourseSearchResult>;
    purchaseCourse(courseId: number, companyId: number): Observable<boolean>;
    isCourseOwnedByCompany(courseId: number, companyId: number): Observable<boolean>;
    getCourse(courseId: string | number): Observable<Course>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CourseService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CourseService>;
}
