import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { SidenavService } from 'src/app/services/sidenav.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.scss'],
    standalone: false
})
export class BodyComponent implements OnInit, AfterViewInit {
  @ViewChildren('sidenav') public sidenav: QueryList<MatSidenav>;

  constructor(
    private sidenavService: SidenavService,
    private spinnerService: SpinnerService,
  ) {}

  ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav.first);
  }

  isVisible(): boolean {
    return this.spinnerService.isVisible();
  }
}
