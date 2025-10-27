import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { CourseContent } from '../models/course-content.model';
import * as i0 from "@angular/core";
export declare class CourseContentService extends BaseService<CourseContent> {
    constructor(http: HttpClient);
    static ɵfac: i0.ɵɵFactoryDeclaration<CourseContentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CourseContentService>;
}
