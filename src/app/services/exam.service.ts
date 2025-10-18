import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Exam } from '../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends BaseService<Exam> {

  constructor(http: HttpClient) {
    super(http, `Exam`);
  }
}
