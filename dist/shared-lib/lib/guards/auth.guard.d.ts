import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as i0 from "@angular/core";
export declare class AuthGuard {
    private authService;
    private router;
    constructor(authService: AuthService, router: Router);
    canActivate(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthGuard>;
}
