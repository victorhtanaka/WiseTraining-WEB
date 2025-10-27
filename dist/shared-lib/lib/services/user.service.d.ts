import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class UserService extends BaseService<User> {
    constructor(http: HttpClient);
    register(user: User, isCompany: boolean): Observable<any>;
    login(credentials: User): Observable<any>;
    loginGoogle(token: string): Observable<any>;
    getAuthenticatedUser(): Observable<User>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserService>;
}
