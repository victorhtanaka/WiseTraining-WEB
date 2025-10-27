import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CourseContent } from '../models/course-content.model';

@Injectable({
  providedIn: 'root'
})
export class CourseContentService extends BaseService<CourseContent> {

  constructor(http: HttpClient) {
    super(http, `CourseContent`);
  }
}
