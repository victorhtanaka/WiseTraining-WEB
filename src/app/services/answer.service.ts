import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Answer } from '../models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class AnswerService extends BaseService<Answer> {

  constructor(http: HttpClient) {
    super(http, `Answer`);
  }
}
