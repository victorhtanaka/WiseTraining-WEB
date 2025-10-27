import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtUser } from '../models/jwt-user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/Login']);
      return false;
    }

    const user: JwtUser | null = this.authService.getCurrentUser();
    const requiredRole: string = route.data['role'] as string;

    if (!user || !user.role || user.role !== requiredRole) {
      this.snackBar.open('Você não tem permissão para acessar esta página.', 'Fechar', {
        duration: 5000
      });
      this.router.navigate(['/Dashboard']);
      return false;
    }

    return true;
  }
}