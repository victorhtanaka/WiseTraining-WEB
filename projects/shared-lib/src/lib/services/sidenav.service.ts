import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenav: MatSidenav;
  private sidenavState = new BehaviorSubject<boolean>(false);
  
  public sidenavState$ = this.sidenavState.asObservable();

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open(): void {
    if (this.sidenav) {
      this.sidenav.open();
      this.sidenavState.next(true);
    }
  }
  
  public close(): void {
    if (this.sidenav) {
      this.sidenav.close();
      this.sidenavState.next(false);
    }
  }

  public toggle(): void {
    if (this.sidenav) {
      console.log('Toggling sidenav. Current state:', this.sidenav.opened);
      this.sidenav.toggle();
      console.log('New sidenav state:', this.sidenav.opened);
      this.sidenavState.next(this.sidenav.opened);
    } else {
      console.error('Sidenav reference is not set in SidenavService');
    }
  }
  
  public isOpen(): boolean {
    return this.sidenav && this.sidenav.opened;
  }
}
