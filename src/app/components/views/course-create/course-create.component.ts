import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/models/category.model';
import { Tag } from 'src/app/models/tag.model';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { CategoryService } from 'src/app/services/category.service';
import { TagService } from 'src/app/services/tag.service';
import { MediaService } from 'src/app/services/media.service';
import { CourseContentService } from 'src/app/services/course-content.service';
import { Media } from 'src/app/models/media.model';
import { CourseContent } from 'src/app/models/course-content.model';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  standalone: false,
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {
  courseForm!: FormGroup;
  categories: Category[] = [];
  tags: Tag[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private tagService: TagService,
    private mediaService: MediaService,
    private courseContentService: CourseContentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.loadTags();
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
      // First, create the media object
      const mediaData: Media = {
        id: 0,
        url: this.courseForm.get('media.url')?.value,
        type: this.courseForm.get('media.type')?.value
      };

      // Create media first
      const createdMedia = await this.mediaService.post(mediaData).toPromise();
      
      if (!createdMedia) {
        throw new Error('Failed to create media');
      }

      // Prepare course data
      const formValue = this.courseForm.value;
      const courseData: Course = {
        id: 0,
        title: formValue.title,
        description: formValue.description,
        categoryId: formValue.categoryId,
        duration: formValue.duration,
        price: formValue.price,
        language: formValue.language,
        isPublished: formValue.isPublished,
        companyId: formValue.companyId,
        mediaId: createdMedia.id!,
        tags: formValue.tagIds?.length > 0 
          ? formValue.tagIds.map((id: number) => ({ id }))
          : undefined
      };

      // Create course
      const createdCourse = await this.courseService.post(courseData).toPromise();

      if (!createdCourse) {
        throw new Error('Failed to create course');
      }

      // Create course contents if any
      if (formValue.contents && formValue.contents.length > 0) {
        for (const content of formValue.contents) {
          // Create media for content if exists
          let contentMediaId: number | undefined = undefined;
          if (content.media?.url && content.media?.type) {
            const contentMedia = await this.mediaService.post({
              id: 0,
              url: content.media.url,
              type: content.media.type
            }).toPromise();
            contentMediaId = contentMedia?.id;
          }

          // Create content
          const contentData: CourseContent = {
            id: 0,
            order: content.order,
            title: content.title,
            textContent: content.textContent,
            duration: content.duration,
            courseId: createdCourse.id!,
            mediaId: contentMediaId
          };

          await this.courseContentService.post(contentData).toPromise();
        }
      }

      this.snackBar.open('Course created successfully!', 'Close', { duration: 3000 });
      this.router.navigate(['/Courses']);
    } catch (error: any) {
      console.error('Error creating course:', error);
      this.snackBar.open('Error creating course: ' + (error.message || 'Unknown error'), 'Close', { 
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

  uploadedFile: File | null = null;
  previewUrl: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFile = input.files[0];

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

  isImageFile(): boolean {
    return this.uploadedFile ? this.uploadedFile.type.startsWith('image') : false;
  }

  isVideoFile(): boolean {
    return this.uploadedFile ? this.uploadedFile.type.startsWith('video') : false;
  }

}
