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
      description: 'Create engaging courses with multimedia content and track student progress in real-time.',
      icon: 'school'
    },
    { 
      title: 'AI-Assisted Content', 
      description: 'Generate course content ideas and descriptions with our AI assistant for efficient development.',
      icon: 'auto_fix_high'
    },
    { 
      title: 'Interactive Learning', 
      description: 'Engage with course material through interactive exercises and comprehensive assessments.',
      icon: 'psychology'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track learning metrics and course performance with detailed analytics and reporting.',
      icon: 'insights'
    },
    {
      title: 'Team Management',
      description: 'Organize learners into groups and assign tailored training paths for targeted skill development.',
      icon: 'groups'
    },
    {
      title: 'Mobile Learning',
      description: 'Access all course materials on any device with our responsive mobile-friendly platform.',
      icon: 'devices'
    }
  ];

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }


}
