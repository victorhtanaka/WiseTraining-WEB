import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'shared-lib';
import { Tag } from 'shared-lib';
import { Course } from 'shared-lib';
import { CourseService } from 'shared-lib';
import { CategoryService } from 'shared-lib';
import { TagService } from 'shared-lib';
import { MediaService } from 'shared-lib';
import { CourseContentService } from 'shared-lib';
import { Media } from 'shared-lib';
import { CourseContent } from 'shared-lib';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  standalone: false,
  styleUrls: ['./course-create.component.scss', './file-upload.scss']
})
export class CourseCreateComponent implements OnInit {
  courseForm!: FormGroup;
  categories: Category[] = [];
  tags: Tag[] = [];
  isLoading = false;
  isEditMode = false;
  courseId?: number;
  existingCourse?: Course;
  existingMedia?: Media;
  existingContents: CourseContent[] = [];
  uploadedFile: File | null = null;
  previewUrl: string | null = null;
  courseMediaFile: File | null = null;
  contentMediaFiles: Map<number, File> = new Map<number, File>();

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private tagService: TagService,
    private mediaService: MediaService,
    private courseContentService: CourseContentService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.loadTags();
    
    // Check if we're in edit mode by looking for courseId param
    this.route.params.subscribe(params => {
      if (params['courseId']) {
        this.isEditMode = true;
        this.courseId = +params['courseId'];
        this.loadCourseData(this.courseId);
      }
    });
  }
  
  initForm(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.required],
      categoryId: [null, Validators.required],
      tagIds: [[]],
      duration: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      language: ['', Validators.maxLength(50)],
      isPublished: [false],
      companyId: [1], // TODO: Get from authenticated user's company
      media: this.fb.group({
        url: ['', Validators.required],
        type: ['', Validators.required]
      }),
      contents: this.fb.array([])
    });
  }
  
  loadCourseData(courseId: number): void {
    this.isLoading = true;
    
    // Get course details
    this.courseService.getById(courseId)
      .pipe(
        switchMap(course => {
          this.existingCourse = course;
          
          // Get media details if exists
          const mediaRequest = course.mediaId ? 
            this.mediaService.getById(course.mediaId).pipe(
              catchError(error => {
                console.error('Error loading media:', error);
                return of(null);
              })
            ) : of(null);
          
          // Get course contents
          const contentsRequest = this.courseContentService.getAll().pipe(
            catchError(error => {
              console.error('Error loading course contents:', error);
              return of([]);
            }),
            // Filter contents for this course
            switchMap(allContents => {
              const courseContents = allContents.filter(
                content => content.courseId === courseId
              );
              
              // If we have contents with media, load their media too
              if (courseContents.length > 0) {
                const mediaRequests = courseContents
                  .filter(content => content.mediaId)
                  .map(content => this.mediaService.getById(content.mediaId!)
                    .pipe(
                      catchError(() => of(null)),
                      switchMap(media => {
                        if (media) {
                          // Assign media to content
                          const contentWithIndex = courseContents.findIndex(c => c.id === content.id);
                          if (contentWithIndex >= 0) {
                            courseContents[contentWithIndex].media = media;
                          }
                        }
                        return of(null);
                      })
                    )
                  );
                
                if (mediaRequests.length > 0) {
                  return forkJoin(mediaRequests).pipe(
                    switchMap(() => of(courseContents))
                  );
                }
              }
              
              return of(courseContents);
            })
          );
          
          return forkJoin({
            media: mediaRequest,
            contents: contentsRequest
          });
        })
      )
      .subscribe({
        next: ({ media, contents }) => {
          this.existingMedia = media ?? undefined;
          this.existingContents = contents;
          this.populateForm();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading course data:', error);
          this.snackBar.open('Error loading course data', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      });
  }
  
  populateForm(): void {
    if (!this.existingCourse) return;
    
    // Populate main form
    this.courseForm.patchValue({
      title: this.existingCourse.title,
      description: this.existingCourse.description,
      categoryId: this.existingCourse.categoryId,
      duration: this.existingCourse.duration,
      price: this.existingCourse.price,
      language: this.existingCourse.language,
      isPublished: this.existingCourse.isPublished,
      companyId: this.existingCourse.companyId
    });
    
    // Set tag IDs if available
    if (this.existingCourse.tags && this.existingCourse.tags.length > 0) {
      const tagIds = this.existingCourse.tags.map(tag => tag.id!);
      this.courseForm.get('tagIds')?.setValue(tagIds);
    }
    
    // Set media if available
    if (this.existingMedia) {
      this.courseForm.get('media')?.patchValue({
        url: this.existingMedia.url,
        type: this.existingMedia.type
      });
      
      // Set preview URL if it's an image or video
      if (this.existingMedia?.url) {
        // Use the full URL with API base path
        this.previewUrl = this.mediaService.getFullUrl(this.existingMedia.url);
        // Simulate file type for display
        this.uploadedFile = new File([], 'existing-media', { 
          type: this.existingMedia.type === 'image' ? 'image/jpeg' : 
                this.existingMedia.type === 'video' ? 'video/mp4' : 'application/octet-stream'
        });
      }
    }
    
    // Add course contents if available
    if (this.existingContents && this.existingContents.length > 0) {
      this.contents.clear(); // Clear default empty content
      
      // Sort by order
      const sortedContents = [...this.existingContents].sort((a, b) => a.order - b.order);
      
      for (const content of sortedContents) {
        const contentGroup = this.fb.group({
          id: [content.id],
          order: [content.order, Validators.required],
          title: [content.title, Validators.required],
          textContent: [content.textContent],
          duration: [content.duration, [Validators.required, Validators.min(1)]],
          mediaId: [content.mediaId],
          media: this.fb.group({
            url: [content.media?.url || ''],
            type: [content.media?.type || '']
          })
        });
        
        // If content has media, set the preview for the content
        if (content.media) {
          // Store the content media for reference
          this.contentMediaFiles.set(this.contents.length, new File([], 'existing-media', {
            type: content.media.type === 'image' ? 'image/jpeg' : 
                  content.media.type === 'video' ? 'video/mp4' : 'application/octet-stream'
          }));
        }
        
        this.contents.push(contentGroup);
      }
    }
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.snackBar.open('Error loading categories', 'Close', { duration: 3000 });
      }
    });
  }

  loadTags(): void {
    this.tagService.getAll().subscribe({
      next: (tags) => {
        this.tags = tags;
      },
      error: (error) => {
        console.error('Error loading tags:', error);
        this.snackBar.open('Error loading tags', 'Close', { duration: 3000 });
      }
    });
  }

  get contents(): FormArray {
    return this.courseForm.get('contents') as FormArray;
  }

  get media(): FormGroup {
    return this.courseForm.get('media') as FormGroup;
  }

  getMediaGroup(content: AbstractControl): FormGroup {
    return content.get('media') as FormGroup;
  }

  addContent() {
    this.contents.push(
      this.fb.group({
        order: [this.contents.length + 1, Validators.required],
        title: ['', Validators.required],
        textContent: [''],
        duration: [0, [Validators.required, Validators.min(1)]],
        media: this.fb.group({
          url: [''],
          type: ['']
        })
      })
    );
  }

  removeContent(index: number) {
    this.contents.removeAt(index);
  }

  async onSaveCourse() {
    if (!this.courseForm.valid) {
      this.courseForm.markAllAsTouched();
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;

    try {
      // Prepare form values
      const formValue = this.courseForm.value;
      
      // Upload course media file if exists
      let courseMedia: Media;
      if (this.courseMediaFile) {
        try {
          const uploadedMedia = await this.mediaService.uploadFile(this.courseMediaFile).toPromise();
          if (!uploadedMedia) {
            throw new Error('Failed to upload course media: Response is empty');
          }
          courseMedia = uploadedMedia;
        } catch (error) {
          console.error('Error uploading course media:', error);
          throw new Error('Failed to upload course media');
        }
      } else {
        // Use existing media or create empty one
        courseMedia = {
          id: this.isEditMode && this.existingMedia ? this.existingMedia.id : 0,
          url: this.courseForm.get('media.url')?.value || '',
          type: this.courseForm.get('media.type')?.value || ''
        };
      }
      
      // Prepare course data
      const courseData: Course = {
        id: this.isEditMode && this.courseId ? this.courseId : 0,
        title: formValue.title,
        description: formValue.description,
        categoryId: formValue.categoryId,
        duration: formValue.duration,
        price: formValue.price,
        language: formValue.language,
        isPublished: formValue.isPublished,
        companyId: formValue.companyId,
        mediaId: 0, // Temporary value, will be set by backend
        tags: formValue.tagIds?.length > 0 
          ? formValue.tagIds.map((id: number) => ({ id }))
          : undefined
      };
      
      // Process course contents and their media
      const courseContentsPromises = formValue.contents 
        ? formValue.contents.map(async (content: any, index: number) => {
          let contentMedia;
          
          // Upload content media file if exists
          const contentMediaFile = this.contentMediaFiles.get(index);
          if (contentMediaFile) {
            try {
              const uploadedMedia = await this.mediaService.uploadFile(contentMediaFile).toPromise();
              if (!uploadedMedia) {
                throw new Error(`Failed to upload media for content ${index}: Response is empty`);
              }
              contentMedia = uploadedMedia;
            } catch (error) {
              console.error(`Error uploading media for content ${index}:`, error);
              throw new Error(`Failed to upload media for content ${index}`);
            }
          } else if (content.media?.url && content.media?.type) {
            // Use existing media data if no new file but URL exists
            contentMedia = {
              id: content.mediaId || 0,
              url: content.media.url,
              type: content.media.type
            };
          }
          
          // Prepare content data
          return {
            content: {
              id: content.id || 0,
              order: content.order,
              title: content.title,
              textContent: content.textContent,
              duration: content.duration,
              // courseId will be set on backend
            },
            contentMedia
          };
        }) 
        : [];
      
      // Wait for all content media uploads to complete
      const courseContents = await Promise.all(courseContentsPromises);
      
      // Determine contents to delete (if in edit mode)
      const contentIdsToDelete: number[] = [];
      if (this.isEditMode && this.existingContents && this.existingContents.length > 0) {
        const currentContentIds = formValue.contents
          ? formValue.contents
              .filter((c: any) => c.id) // Only include contents with IDs (existing contents)
              .map((c: any) => c.id)
          : [];
          
        const deletedContentIds = this.existingContents
          .filter(c => c.id && !currentContentIds.includes(c.id))
          .map(c => c.id!);
          
        contentIdsToDelete.push(...deletedContentIds);
      }
      
      // Create the complete course object for saving
      const courseComplete = {
        course: courseData,
        courseMedia: courseMedia,
        contents: courseContents,
        contentIdsToDelete: contentIdsToDelete
      };
      
      // Save the complete course in a single request
      const savedCourse = await this.courseService.saveComplete(courseComplete).toPromise();
      
      if (!savedCourse) {
        throw new Error('Failed to save course');
      }

      const successMessage = this.isEditMode ? 'Course updated successfully!' : 'Course created successfully!';
      this.snackBar.open(successMessage, 'Close', { duration: 3000 });
      this.router.navigate(['/Courses']);
    } catch (error: any) {
      console.error('Error saving course:', error);
      this.snackBar.open('Error saving course: ' + (error.message || 'Unknown error'), 'Close', { 
        duration: 5000 
      });
    } finally {
      this.isLoading = false;
    }
  }

  onDiscardCourse() {
    if (confirm('Are you sure you want to discard this course?')) {
      this.router.navigate(['/Courses']);
    }
  }

  onFileSelected(event: Event, contentIndex?: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      if (contentIndex !== undefined) {
        // Store for content media
        this.contentMediaFiles.set(contentIndex, file);
        
        // Get the content form group
        const contentFormGroup = this.contents.at(contentIndex);
        if (contentFormGroup) {
          const contentMediaGroup = this.getMediaGroup(contentFormGroup);
          
          const fileType = file.type.startsWith('image')
            ? 'image'
            : file.type.startsWith('video')
              ? 'video'
              : 'other';
          
          contentMediaGroup.patchValue({ type: fileType });
          
          // Create preview for content
          const reader = new FileReader();
          reader.onload = () => {
            const preview = reader.result as string;
            contentMediaGroup.patchValue({ url: preview });
          };
          reader.readAsDataURL(file);
        }
      } else {
        // This is for the main course media
        this.uploadedFile = file;
        this.courseMediaFile = file;

        const reader = new FileReader();
        reader.onload = () => (this.previewUrl = reader.result as string);
        reader.readAsDataURL(this.uploadedFile);

        const fileType = this.uploadedFile.type.startsWith('image')
          ? 'image'
          : this.uploadedFile.type.startsWith('video')
            ? 'video'
            : 'other';
        this.media.patchValue({ type: fileType });
      }
    }
  }

  isImageFile(contentIndex?: number): boolean {
    if (contentIndex !== undefined) {
      const file = this.contentMediaFiles.get(contentIndex);
      return file ? file.type.startsWith('image') : false;
    }
    return this.uploadedFile ? this.uploadedFile.type.startsWith('image') : false;
  }

  isVideoFile(contentIndex?: number): boolean {
    if (contentIndex !== undefined) {
      const file = this.contentMediaFiles.get(contentIndex);
      return file ? file.type.startsWith('video') : false;
    }
    return this.uploadedFile ? this.uploadedFile.type.startsWith('video') : false;
  }
  
  getMediaUrl(url: string | undefined): string {
    return url ? this.mediaService.getFullUrl(url) : '';
  }
}

