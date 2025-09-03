import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  standalone: false,
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  courseId: string;
  courseData = {
    title: 'Advanced Project Management',
    modules: [
      {
        title: 'Module 1: Introduction to Agile',
        lessons: [
          { title: 'What is Agile?', type: 'video', completed: true },
          { title: 'The Agile Manifesto', type: 'text', completed: true },
          { title: 'Scrum vs. Kanban', type: 'video', completed: false },
        ],
      },
      {
        title: 'Module 2: The Scrum Framework',
        lessons: [
          { title: 'Roles in Scrum', type: 'video', completed: false },
          { title: 'Scrum Events', type: 'text', completed: false },
          { title: 'Scrum Artifacts', type: 'text', completed: false },
        ],
      },
      {
        title: 'Module 3: Leadership & Management',
        lessons: [
          { title: 'Servant Leadership', type: 'video', completed: false },
          { title: 'Conflict Resolution', type: 'video', completed: false },
          { title: 'Stakeholder Management', type: 'text', completed: false },
        ],
      },
    ],
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    /* this.courseId = this.route.snapshot.paramMap.get('courseId'); */
  }

  toggleModule(moduleIndex: number) {
    // Logic to expand/collapse module
  }
}