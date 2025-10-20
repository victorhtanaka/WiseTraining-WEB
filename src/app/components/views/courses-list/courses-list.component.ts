import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { MediaService } from 'src/app/services/media.service';
import { Media } from 'src/app/models/media.model';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-courses-list',
  standalone: false,
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss', '../course-create/file-upload.scss']
})
export class CoursesListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'enrollments', 'actions'];
  courses: Course[] = [];
  isLoading = false;

  constructor(
    private courseService: CourseService,
    private mediaService: MediaService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.courseService.getAll()
      .pipe(
        switchMap(courses => {
          const mediaRequests = courses
            .filter(course => course.mediaId)
            .map(course => 
              this.mediaService.getById(course.mediaId!)
                .pipe(
                  catchError(() => of(null)),
                  switchMap(media => {
                    if (media) {
                      const courseIndex = courses.findIndex(c => c.id === course.id);
                      if (courseIndex >= 0) {
                        courses[courseIndex].media = media;
                      }
                    }
                    return of(null);
                  })
                )
            );
            
          if (mediaRequests.length > 0) {
            return forkJoin(mediaRequests).pipe(switchMap(() => of(courses)));
          }
          
          return of(courses);
        })
      )
      .subscribe({
        next: (data) => {
          this.courses = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading courses:', error);
          this.snackBar.open('Error loading courses', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      });
  }
  
  getMediaUrl(course: Course): string {
    return course.media ? this.mediaService.getFullUrl(course.media.url) : '';
  }

  async createDefaultCourse(): Promise<void> {
    try {
      this.isLoading = true;
      
      // Create default media
      const defaultMedia: Media = {
        id: 0,
        url: 'https://placehold.co/600x400?text=Default+Course+Image',
        type: 'image'
      };
      
      const createdMedia = await this.mediaService.post(defaultMedia).toPromise();
      
      if (!createdMedia) {
        throw new Error('Failed to create default media');
      }
      
      // Create default course
      const defaultCourse: Course = {
        id: 0,
        title: 'New Course',
        description: 'Course description',
        categoryId: 1, // Default category ID
        duration: 60,
        price: 0,
        language: 'Portuguese',
        isPublished: false,
        companyId: 1, // TODO: Get from authenticated user
        mediaId: createdMedia.id!
      };
      
      const createdCourse = await this.courseService.post(defaultCourse).toPromise();
      
      if (!createdCourse) {
        throw new Error('Failed to create default course');
      }
      
      // Navigate to edit the created course
      this.router.navigate(['/Courses/Edit', createdCourse.id]);
      
    } catch (error: any) {
      console.error('Error creating default course:', error);
      this.snackBar.open('Error creating default course: ' + (error.message || 'Unknown error'), 'Close', { 
        duration: 5000 
      });
      this.isLoading = false;
    }
  }
}