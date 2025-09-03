import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(http: HttpClient) {
    super(http, `User`);
  }

  protected override httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }),
  };

  register(user: User, isCompany: boolean): Observable<any> {
    return this.http.post(`https://localhost:7213/api/User/Register?isCompany=${isCompany}`, user, this.httpOptions);
  }

  login(credentials: User): Observable<any> {
    return this.http.post('https://localhost:7213/api/User/Login', credentials, this.httpOptions);
  }

  loginGoogle(token: string): Observable<any> {
    const tokenRequest = { IdToken: token };
    return this.http.post('https://localhost:7213/api/User/LoginWithGoogle', tokenRequest, this.httpOptions);
  }

  getAuthenticatedUser(): Observable<User> {
    return this.http.get<User>('https://localhost:7213/api/User/GetAuthenticatedUser', this.httpOptions);
  }
}
