import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subject } from 'rxjs';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _destroying$ = new Subject<void>();
  title = 'Wise Training';
  showHeader = false;

  constructor(private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const hiddenHeaderRoutes = ['/', '/Login', '/CompanyRegister', '/Unlogged'];
        this.showHeader = !hiddenHeaderRoutes.includes(event.urlAfterRedirects || event.url);
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroy();
  }

  destroy() {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
