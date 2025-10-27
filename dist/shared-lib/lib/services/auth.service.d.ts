import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { JwtUser } from '../models/jwt-user.model';
import * as i0 from "@angular/core";
export declare class AuthService {
    private readonly router;
    private readonly auth;
    private readonly tokenKey;
    private currentUser;
    constructor(router: Router, auth: Auth);
    authenticate(token: string): void;
    private setUserFromToken;
    logout(): void;
    private isTokenValid;
    getToken(): string | null;
    isAuthenticated(): boolean;
    getFirebaseToken(): Promise<string | null>;
    logoutGoogle(): Promise<void>;
    getCurrentUser(): JwtUser | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthService>;
}
