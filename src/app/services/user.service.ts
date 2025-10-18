import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(http: HttpClient) {
    super(http, `User`);
  }

  register(user: User, isCompany: boolean): Observable<any> {
    return this.http.post(`${environment.apiUri}/User/Register?isCompany=${isCompany}`, user, this.httpOptions);
  }

  login(credentials: User): Observable<any> {
    return this.http.post(`${environment.apiUri}/User/Login`, credentials, this.httpOptions);
  }

  loginGoogle(token: string): Observable<any> {
    const tokenRequest = { IdToken: token };
    return this.http.post(`${environment.apiUri}/User/LoginWithGoogle`, tokenRequest, this.httpOptions);
  }

  getAuthenticatedUser(): Observable<User> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<User>(`${environment.apiUri}/User/GetAuthenticatedUser`, this.httpOptions);
  }
}
