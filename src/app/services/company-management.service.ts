import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Company } from '../models/company.model';
import { User } from '../models/user.model';
import { Group } from '../models/group.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyManagementService extends BaseService<Company> {
  
  constructor(protected override http: HttpClient) {
    super(http, 'Company');
  }
  
  getMyCompany(): Observable<Company> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Company>(`${environment.apiUri}/Company/GetMyCompany`, this.httpOptions);
  }
  
  getCompanyUsers(companyId: number): Observable<User[]> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<User[]>(`${environment.apiUri}/Company/GetCompanyUsers/${companyId}`, this.httpOptions);
  }
  
  addUserToGroup(userId: number, groupId: number): Observable<boolean> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<boolean>(`${environment.apiUri}/Company/AddUserToGroup`, { userId, groupId }, this.httpOptions);
  }
  
  removeUserFromGroup(userId: number, groupId: number): Observable<boolean> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<boolean>(`${environment.apiUri}/Company/RemoveUserFromGroup/${userId}/${groupId}`, this.httpOptions);
  }
  
  update(company: Company): Observable<Company> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put<Company>(`${environment.apiUri}/${this.endpoint}`, company, this.httpOptions);
  }
}