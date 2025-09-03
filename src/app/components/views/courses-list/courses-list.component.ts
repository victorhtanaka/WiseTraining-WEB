import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  standalone: false,
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'enrollments', 'actions'];
  courses = [
    { id: '1', title: 'Corporate Communication', status: 'Published', totalEnrollments: 210 },
    { id: '2', title: 'Advanced Project Management', status: 'Published', totalEnrollments: 185 },
    { id: '3', title: 'Cybersecurity Fundamentals', status: 'Draft', totalEnrollments: 0 },
    { id: '4', title: 'Leadership and Team Building', status: 'Draft', totalEnrollments: 0 },
    { id: '5', title: 'Data Analysis with Python', status: 'Archived', totalEnrollments: 350 },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}