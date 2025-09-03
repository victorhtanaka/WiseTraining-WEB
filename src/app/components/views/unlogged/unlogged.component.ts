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
  features = [
    { 
      title: 'Course Creation', 
      description: 'Create engaging courses with multimedia content and track student progress.',
      icon: 'school'
    },
    { 
      title: 'AI-Assisted Content', 
      description: 'Generate course content ideas and descriptions with our AI assistant.',
      icon: 'auto_fix_high'
    },
    { 
      title: 'Interactive Learning', 
      description: 'Engage with course material through interactive exercises and assessments.',
      icon: 'psychology'
    }
  ];

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }


}
