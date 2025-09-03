import { Component, inject, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  courses = [
    { id: '1', title: 'Corporate Communication', progress: 75, image: 'https://placehold.co/600x400.png', hint: 'office presentation' },
    { id: '2', title: 'Advanced Project Management', progress: 40, image: 'https://placehold.co/600x400.png', hint: 'team planning' },
    { id: '3', title: 'Cybersecurity Fundamentals', progress: 90, image: 'https://placehold.co/600x400.png', hint: 'digital security' },
    { id: '4', title: 'Leadership and Team Building', progress: 25, image: 'https://placehold.co/600x400.png', hint: 'team collaboration' },
    { id: '5', title: 'Data Analysis with Python', progress: 0, image: 'https://placehold.co/600x400.png', hint: 'code analytics' },
    { id: '6', title: 'Sales and Negotiation Skills', progress: 100, image: 'https://placehold.co/600x400.png', hint: 'business handshake' },
  ];

  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor() { }

  ngOnInit(): void {
  }
}
