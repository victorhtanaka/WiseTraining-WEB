import { Component, inject, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { JwtUser } from 'src/app/models/jwt-user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: JwtUser | null = null;
  
  courses = [
    { id: '1', title: 'Corporate Communication', progress: 75, image: 'https://placehold.co/600x400.png', hint: 'office presentation' },
    { id: '2', title: 'Advanced Project Management', progress: 40, image: 'https://placehold.co/600x400.png', hint: 'team planning' },
    { id: '3', title: 'Cybersecurity Fundamentals', progress: 90, image: 'https://placehold.co/600x400.png', hint: 'digital security' },
    { id: '4', title: 'Leadership and Team Building', progress: 25, image: 'https://placehold.co/600x400.png', hint: 'team collaboration' },
    { id: '5', title: 'Data Analysis with Python', progress: 0, image: 'https://placehold.co/600x400.png', hint: 'code analytics' },
    { id: '6', title: 'Sales and Negotiation Skills', progress: 100, image: 'https://placehold.co/600x400.png', hint: 'business handshake' },
  ];
  
  mockStats = {
    activeUsers: 142,
    userGrowth: 12,
    courses: 24,
    newCourses: 3,
    completionRate: 78,
    completionGrowth: 5
  };
  
  mockStudentStats = {
    overallProgress: 68,
    coursesCompleted: 4,
    coursesInProgress: 2
  };
  
  mockActivities = [
    { 
      type: 'enrollment', 
      icon: 'how_to_reg', 
      text: 'New team member enrolled in "Leadership Training"', 
      time: '2 hours ago' 
    },
    { 
      type: 'completion', 
      icon: 'check_circle', 
      text: '5 employees completed "Cybersecurity Fundamentals"', 
      time: '1 day ago' 
    },
    { 
      type: 'addition', 
      icon: 'add_circle', 
      text: 'New course added: "Advanced Data Analytics"', 
      time: '2 days ago' 
    }
  ];
  
  mockDeadlines = [
    {
      day: '25',
      month: 'Oct',
      title: 'Project Management Certification Exam',
      description: 'Final assessment for the certification course',
      timeLeft: '6 days left'
    },
    {
      day: '02',
      month: 'Nov',
      title: 'Leadership Workshop Submission',
      description: 'Submit your leadership development plan',
      timeLeft: '2 weeks left'
    },
    {
      day: '10',
      month: 'Nov',
      title: 'Data Analysis Group Project',
      description: 'Final group project deadline',
      timeLeft: '3 weeks left'
    }
  ];

  private breakpointObserver = inject(BreakpointObserver);

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }
  
  isCompanyRole(): boolean {
    return this.currentUser?.role === 'Company';
  }
  
  isStudentRole(): boolean {
    return this.currentUser?.role === 'Student';
  }
}
