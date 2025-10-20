import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/services/sidenav.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Output() toggleSidenavEvent = new EventEmitter<void>();

  constructor(
    private sideNavService: SidenavService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngAfterViewInit() {
  }

  ngOnInit() {
  }

  toggleSidenav(){
    console.log('Toggle sidenav called from header component');
    // Don't call both the service and emit an event - this causes double toggle
    // Just emit the event to let the parent component handle it
    this.toggleSidenavEvent.emit();
  }
  
  logout(): void {
    this.authService.logout();
  }
}
