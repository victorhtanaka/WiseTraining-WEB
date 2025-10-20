import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Group } from '../models/group.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseService<Group> {

  constructor(protected override http: HttpClient) {
    super(http, `Group`);
  }

  getByCompanyId(companyId: number): Observable<Group[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Group[]>(`${environment.apiUri}/Group/GetByCompanyId/${companyId}`, this.httpOptions);
  }

  create(group: Group): Observable<Group> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Group>(`${environment.apiUri}/Group`, group, this.httpOptions);
  }

  update(group: Group): Observable<Group> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put<Group>(`${environment.apiUri}/Group`, group, this.httpOptions);
  }

  deleteGroup(groupId: number): Observable<boolean> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<boolean>(`${environment.apiUri}/Group/${groupId}`, this.httpOptions);
  }
}
