import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit, AfterViewInit {

  constructor(
    private sideNav: SidenavService
  ) { }

  ngAfterViewInit() {
  }

  ngOnInit() {
  }

  toggleSidenav(){
    this.sideNav.toggle();
  }
}
