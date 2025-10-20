import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Course } from '../models/course.model';
import { CourseContent } from '../models/course-content.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourseComplete } from '../models/course-complete.model';
import { CourseSearchParams, CourseSearchResult } from '../models/course-search.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService<Course> {

  constructor(http: HttpClient) {
    super(http, `Course`);
  }

  saveComplete(courseComplete: CourseComplete): Observable<Course> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Course>(`${environment.apiUri}/${this.endpoint}/SaveComplete`, courseComplete, this.httpOptions);
  }
  
  getContents(courseId: number): Observable<CourseContent[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<CourseContent[]>(`${environment.apiUri}/${this.endpoint}/GetContents/${courseId}`, this.httpOptions);
  }

  searchCourses(searchParams: CourseSearchParams): Observable<CourseSearchResult> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<CourseSearchResult>(`${environment.apiUri}/${this.endpoint}/Search`, searchParams, this.httpOptions);
  }

  purchaseCourse(courseId: number, companyId: number): Observable<boolean> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<boolean>(`${environment.apiUri}/${this.endpoint}/Purchase`, { CourseId: courseId, CompanyId: companyId }, this.httpOptions);
  }

  isCourseOwnedByCompany(courseId: number, companyId: number): Observable<boolean> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<boolean>(`${environment.apiUri}/${this.endpoint}/IsOwnedByCompany/${courseId}/${companyId}`, this.httpOptions);
  }
  
  getCourse(courseId: string | number): Observable<Course> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Course>(`${environment.apiUri}/${this.endpoint}/GetById/${courseId}`, this.httpOptions);
  }
}
