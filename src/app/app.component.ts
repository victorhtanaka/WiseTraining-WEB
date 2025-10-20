import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './services/sidenav.service';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  
  private readonly _destroying$ = new Subject<void>();
  title = 'Wise Training';
  showHeader = false;
  isAdmin = false;
  isSuperAdmin = false;
  isCompany = false;
  currentUser: any = null;

  constructor(
    private router: Router,
    private sidenavService: SidenavService,
    private authService: AuthService
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this._destroying$)
      )
      .subscribe((event: any) => {
        const hiddenHeaderRoutes = ['/', '/Login', '/CompanyRegister', '/Unlogged'];
        this.showHeader = !hiddenHeaderRoutes.includes(event.urlAfterRedirects || event.url);
      });
  }

  ngOnInit(): void {
    this.checkUserRole();
  }

  ngAfterViewInit() {
    // Registrar o sidenav no serviço
    setTimeout(() => {
      if (this.sidenav) {
        console.log('Sidenav registered successfully');
        this.sidenavService.setSidenav(this.sidenav);
      } else {
        console.error('Sidenav reference not found in afterViewInit');
      }
    });
  }
  
  toggleSidenav() {
    console.log('Toggle sidenav called from app component');
    if (!this.sidenav) {
      console.error('Sidenav reference is missing');
      return;
    }
    this.sidenavService.toggle();
  }

  ngOnDestroy() {
    this.destroy();
  }

  destroy() {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
  
  checkUserRole(): void {
    const token = localStorage.getItem('token');
    
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(window.atob(payload));
      
      // Verificar o papel do usuário
      if (decodedPayload && decodedPayload.role) {
        this.isAdmin = decodedPayload.role === 'Admin';
        this.isSuperAdmin = decodedPayload.role === 'SuperAdmin';
        this.isCompany = decodedPayload.role === 'Company';
      }
    }
  }
  
  logout(): void {
    // Limpar o token do localStorage
    localStorage.removeItem('token');
    
    // Redirecionar para a página de login
    this.router.navigate(['/Login']);
  }
}
