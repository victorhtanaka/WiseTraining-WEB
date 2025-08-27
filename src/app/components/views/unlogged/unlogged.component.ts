import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-unlogged',
    templateUrl: './unlogged.component.html',
    styleUrls: ['./unlogged.component.scss'],
    standalone: false
})
export class UnloggedComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
}
