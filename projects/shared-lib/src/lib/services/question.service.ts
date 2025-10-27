import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseService<Question> {

  constructor(http: HttpClient) {
    super(http, `Question`);
  }
}
