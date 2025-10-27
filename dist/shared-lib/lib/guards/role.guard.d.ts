import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as i0 from "@angular/core";
export declare class RoleGuard {
    private authService;
    private router;
    private snackBar;
    constructor(authService: AuthService, router: Router, snackBar: MatSnackBar);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
    static ɵfac: i0.ɵɵFactoryDeclaration<RoleGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RoleGuard>;
}
