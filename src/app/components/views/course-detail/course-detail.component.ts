import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { MediaService } from 'src/app/services/media.service';
import { CourseContent } from 'src/app/models/course-content.model';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-course-detail',
  standalone: false,
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  courseId: number;
  course: Course | null = null;
  courseContents: CourseContent[] = [];
  isLoading = true;
  selectedContent: CourseContent | null = null;
  @ViewChild('videoElement') videoElement: ElementRef<HTMLVideoElement>;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private mediaService: MediaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['courseId']) {
        this.courseId = +params['courseId'];
        
        // Check if content ID is specified in the URL query params
        this.route.queryParams.subscribe(queryParams => {
          const contentId = queryParams['contentId'] ? +queryParams['contentId'] : null;
          this.loadCourseData(this.courseId, contentId);
        });
      } else {
        this.snackBar.open('Course ID not provided', 'Close', { duration: 3000 });
        this.router.navigate(['/Courses']);
      }
    });
  }
  
  loadCourseData(courseId: number, contentId: number | null = null): void {
    this.isLoading = true;
    
    this.courseService.getById(courseId)
      .pipe(
        switchMap(course => {
          this.course = course;
          
          // Load media for course if exists
          const courseMediaRequest = course.mediaId ? 
            this.mediaService.getById(course.mediaId).pipe(
              catchError(() => of(null))
            ) : of(null);
          
          // Load course contents
          const contentsRequest = this.courseService.getContents(courseId).pipe(
            catchError(() => {
              console.error('Error loading course contents');
              return of([]);
            }),
            switchMap(contents => {
              this.courseContents = (contents as CourseContent[]).sort((a, b) => a.order - b.order);
              
              // If contentId is provided, find that specific content
              if (contentId && this.courseContents.length > 0) {
                const targetContent = this.courseContents.find(c => c.id === contentId);
                if (targetContent) {
                  this.selectedContent = targetContent;
                } else {
                  // Fallback to first content if specified content not found
                  this.selectedContent = this.courseContents[0];
                }
              }
              // Otherwise set first content as selected by default if no content is currently selected
              else if (this.courseContents.length > 0 && !this.selectedContent) {
                this.selectedContent = this.courseContents[0];
              }              // Load media for each content
              const contentMediaRequests = this.courseContents
                .filter(content => content.mediaId)
                .map(content => 
                  this.mediaService.getById(content.mediaId!)
                    .pipe(
                      catchError(() => of(null)),
                      switchMap(media => {
                        if (media) {
                          const contentIndex = this.courseContents.findIndex(c => c.id === content.id);
                          if (contentIndex >= 0) {
                            this.courseContents[contentIndex].media = media;
                          }
                        }
                        return of(null);
                      })
                    )
                );
              
              if (contentMediaRequests.length > 0) {
                return forkJoin(contentMediaRequests);
              }
              
              return of(null);
            })
          );
          
          return forkJoin({
            courseMedia: courseMediaRequest,
            contents: contentsRequest
          });
        })
      )
      .subscribe({
        next: ({ courseMedia }) => {
          if (courseMedia && this.course) {
            this.course.media = courseMedia;
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading course:', error);
          this.snackBar.open('Error loading course', 'Close', { duration: 3000 });
          this.isLoading = false;
          this.router.navigate(['/Courses']);
        }
      });
  }

  selectContent(content: CourseContent): void {
    this.selectedContent = content;
    // Scroll to top of content section
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Update URL query param without reloading the page
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { contentId: content.id },
      queryParamsHandling: 'merge'
    });
  }
  
  getMediaUrl(url: string | undefined): string {
    return url ? this.mediaService.getFullUrl(url) : '';
  }
  
  // Helper method to check if video is currently playing
  isVideoPlaying(video: HTMLVideoElement): boolean {
    return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
  }
  
  // Handle play button click
  playVideo(event: Event): void {
    event.stopPropagation();
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      if (this.isVideoPlaying(video)) {
        video.pause();
      } else {
        video.play();
      }
    }
  }
  
  // Navigate to next or previous content
  navigateContent(direction: 'next' | 'prev'): void {
    if (!this.selectedContent || this.courseContents.length === 0) return;
    
    const currentIndex = this.courseContents.findIndex(c => c.id === this.selectedContent?.id);
    if (currentIndex === -1) return;
    
    let targetIndex: number;
    if (direction === 'next') {
      targetIndex = currentIndex + 1 >= this.courseContents.length ? 0 : currentIndex + 1;
    } else {
      targetIndex = currentIndex - 1 < 0 ? this.courseContents.length - 1 : currentIndex - 1;
    }
    
    this.selectContent(this.courseContents[targetIndex]);
    
    // Update URL query param without reloading the page
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { contentId: this.courseContents[targetIndex].id },
      queryParamsHandling: 'merge'
    });
  }
}