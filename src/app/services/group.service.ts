import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseService<Group> {

  constructor(http: HttpClient) {
    super(http, `Group`);
  }
}
