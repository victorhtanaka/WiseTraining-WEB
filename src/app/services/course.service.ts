import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService<Course> {

  constructor(http: HttpClient) {
    super(http, `Course`);
  }
}
