import * as i0 from '@angular/core';
import { Component, ViewChild, Inject, NgModule } from '@angular/core';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i1$1 from '@angular/forms';
import { Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import * as i7$1 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i7$2 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i5$1 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i10 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i7 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i8 from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import * as i12$1 from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import * as i1$2 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i11 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i14 from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import * as i12 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as i9 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import * as i8$1 from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import { of, forkJoin } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import * as i1 from 'shared-lib';
import * as i3 from '@angular/material/snack-bar';

class CoursesListComponent {
    constructor(courseService, mediaService, router, snackBar) {
        this.courseService = courseService;
        this.mediaService = mediaService;
        this.router = router;
        this.snackBar = snackBar;
        this.displayedColumns = ['title', 'status', 'enrollments', 'actions'];
        this.courses = [];
        this.isLoading = false;
    }
    ngOnInit() {
        this.loadCourses();
    }
    loadCourses() {
        this.isLoading = true;
        this.courseService.getAll()
            .pipe(switchMap(courses => {
            const mediaRequests = courses
                .filter(course => course.mediaId)
                .map(course => this.mediaService.getById(course.mediaId)
                .pipe(catchError(() => of(null)), switchMap(media => {
                if (media) {
                    const courseIndex = courses.findIndex(c => c.id === course.id);
                    if (courseIndex >= 0) {
                        courses[courseIndex].media = media;
                    }
                }
                return of(null);
            })));
            if (mediaRequests.length > 0) {
                return forkJoin(mediaRequests).pipe(switchMap(() => of(courses)));
            }
            return of(courses);
        }))
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
    getMediaUrl(course) {
        return course.media ? this.mediaService.getFullUrl(course.media.url) : '';
    }
    async createDefaultCourse() {
        try {
            this.isLoading = true;
            // Create default media
            const defaultMedia = {
                id: 0,
                url: 'https://placehold.co/600x400?text=Default+Course+Image',
                type: 'image'
            };
            const createdMedia = await this.mediaService.post(defaultMedia).toPromise();
            if (!createdMedia) {
                throw new Error('Failed to create default media');
            }
            // Create default course
            const defaultCourse = {
                id: 0,
                title: 'New Course',
                description: 'Course description',
                categoryId: 1, // Default category ID
                duration: 60,
                price: 0,
                language: 'Portuguese',
                isPublished: false,
                companyId: 1, // TODO: Get from authenticated user
                mediaId: createdMedia.id
            };
            const createdCourse = await this.courseService.post(defaultCourse).toPromise();
            if (!createdCourse) {
                throw new Error('Failed to create default course');
            }
            // Navigate to edit the created course
            this.router.navigate(['/Courses/Edit', createdCourse.id]);
        }
        catch (error) {
            console.error('Error creating default course:', error);
            this.snackBar.open('Error creating default course: ' + (error.message || 'Unknown error'), 'Close', {
                duration: 5000
            });
            this.isLoading = false;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CoursesListComponent, deps: [{ token: i1.CourseService }, { token: i1.MediaService }, { token: i2.Router }, { token: i3.MatSnackBar }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: CoursesListComponent, isStandalone: false, selector: "app-courses-list", ngImport: i0, template: "<mat-card class=\"courses-list-card\">\r\n  <mat-card-header>\r\n    <div class=\"header-content\">\r\n      <div>\r\n        <mat-card-title>Courses</mat-card-title>\r\n        <mat-card-subtitle>Manage your courses and view their status.</mat-card-subtitle>\r\n      </div>\r\n      <div class=\"header-actions\">\r\n        <button mat-stroked-button>Export</button>\r\n        <button mat-flat-button color=\"primary\" (click)=\"createDefaultCourse()\" [disabled]=\"isLoading\">\r\n          <mat-icon>add_circle</mat-icon>\r\n          Create Course\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-card-header>\r\n  \r\n  <mat-card-content>\r\n    <table mat-table [dataSource]=\"courses\" class=\"courses-table\">\r\n\r\n      <ng-container matColumnDef=\"title\">\r\n        <th mat-header-cell *matHeaderCellDef>Course Title</th>\r\n        <td mat-cell *matCellDef=\"let course\">\r\n          <div class=\"course-title-with-image\">\r\n            <img *ngIf=\"course.media\" [src]=\"getMediaUrl(course)\" alt=\"Course Image\" class=\"course-thumbnail\">\r\n            <span>{{course.title}}</span>\r\n          </div>\r\n        </td>\r\n      </ng-container>\r\n      \r\n      <ng-container matColumnDef=\"status\">\r\n        <th mat-header-cell *matHeaderCellDef>Status</th>\r\n        <td mat-cell *matCellDef=\"let course\">\r\n          <span class=\"status-badge\" [ngClass]=\"{\r\n            'published': course.isPublished,\r\n            'draft': !course.isPublished\r\n          }\">\r\n            {{course.isPublished ? 'Published' : 'Draft'}}\r\n          </span>\r\n        </td>\r\n      </ng-container>\r\n      \r\n      <ng-container matColumnDef=\"enrollments\">\r\n        <th mat-header-cell *matHeaderCellDef>Enrollments</th>\r\n        <td mat-cell *matCellDef=\"let course\">{{course.totalEnrollments}}</td>\r\n      </ng-container>\r\n      \r\n      <ng-container matColumnDef=\"actions\">\r\n        <th mat-header-cell *matHeaderCellDef>\r\n          <span class=\"visually-hidden\">Actions</span>\r\n        </th>\r\n        <td mat-cell *matCellDef=\"let course\">\r\n          <button mat-icon-button [matMenuTriggerFor]=\"actionsMenu\">\r\n            <mat-icon>more_horiz</mat-icon>\r\n          </button>\r\n          <mat-menu #actionsMenu=\"matMenu\">\r\n            <button mat-menu-item [routerLink]=\"['/Courses/Edit', course.id]\">Edit</button>\r\n            <button mat-menu-item>View Enrollments</button>\r\n            <button mat-menu-item>Preview</button>\r\n            <button mat-menu-item class=\"danger\">Delete</button>\r\n          </mat-menu>\r\n        </td>\r\n      </ng-container>\r\n      \r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n    </table>\r\n  </mat-card-content>\r\n</mat-card>", styles: [".courses-list-card{max-width:1200px;margin:2rem auto}.header-content{display:flex;justify-content:space-between;align-items:center;width:100%}.header-actions{display:flex;gap:.75rem}.courses-table{width:100%}.status-badge{display:inline-block;padding:.25rem .75rem;border-radius:9999px;font-size:.75rem}.status-badge.published{background-color:#00c8531a;color:#00963c}.status-badge.draft{background-color:#6464641a;color:#505050;border:1px solid rgba(100,100,100,.2)}.status-badge.archived{background-color:#c800001a;color:#960000}.visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.danger{color:#c80000}button[mat-flat-button] mat-icon{margin-right:.5rem}\n", ".course-title-with-image{display:flex;align-items:center;gap:10px}.course-title-with-image .course-thumbnail{width:60px;height:40px;object-fit:cover;border-radius:4px;border:1px solid #e0e0e0}.upload-container{width:100%;height:200px;border:2px dashed #ccc;border-radius:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;cursor:pointer;transition:all .3s ease;margin-bottom:16px;background-color:#f9f9f9}.upload-container:hover{border-color:#3f51b5;background-color:#f5f5f5}.upload-container mat-icon{font-size:40px;height:40px;width:40px;color:#757575;margin-bottom:8px}.upload-container span{color:#757575}.upload-container .preview{width:100%;height:100%;display:flex;justify-content:center;align-items:center;overflow:hidden}.upload-container .preview img,.upload-container .preview video{max-width:100%;max-height:100%;object-fit:contain}.upload-container .preview .preview-image{border:1px solid #e0e0e0;border-radius:4px}\n"], dependencies: [{ kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i5$1.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i5$1.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }, { kind: "component", type: i10.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }, { kind: "directive", type: i10.MatCardContent, selector: "mat-card-content" }, { kind: "component", type: i10.MatCardHeader, selector: "mat-card-header" }, { kind: "directive", type: i10.MatCardSubtitle, selector: "mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]" }, { kind: "directive", type: i10.MatCardTitle, selector: "mat-card-title, [mat-card-title], [matCardTitle]" }, { kind: "component", type: i7.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i8.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i8.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i8.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i8.MatColumnDef, selector: "[matColumnDef]", inputs: ["matColumnDef"] }, { kind: "directive", type: i8.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i8.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i8.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i8.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i8.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i8.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "component", type: i9.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "component", type: i9.MatMenuItem, selector: "[mat-menu-item]", inputs: ["role", "disabled", "disableRipple"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i9.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CoursesListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-courses-list', standalone: false, template: "<mat-card class=\"courses-list-card\">\r\n  <mat-card-header>\r\n    <div class=\"header-content\">\r\n      <div>\r\n        <mat-card-title>Courses</mat-card-title>\r\n        <mat-card-subtitle>Manage your courses and view their status.</mat-card-subtitle>\r\n      </div>\r\n      <div class=\"header-actions\">\r\n        <button mat-stroked-button>Export</button>\r\n        <button mat-flat-button color=\"primary\" (click)=\"createDefaultCourse()\" [disabled]=\"isLoading\">\r\n          <mat-icon>add_circle</mat-icon>\r\n          Create Course\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </mat-card-header>\r\n  \r\n  <mat-card-content>\r\n    <table mat-table [dataSource]=\"courses\" class=\"courses-table\">\r\n\r\n      <ng-container matColumnDef=\"title\">\r\n        <th mat-header-cell *matHeaderCellDef>Course Title</th>\r\n        <td mat-cell *matCellDef=\"let course\">\r\n          <div class=\"course-title-with-image\">\r\n            <img *ngIf=\"course.media\" [src]=\"getMediaUrl(course)\" alt=\"Course Image\" class=\"course-thumbnail\">\r\n            <span>{{course.title}}</span>\r\n          </div>\r\n        </td>\r\n      </ng-container>\r\n      \r\n      <ng-container matColumnDef=\"status\">\r\n        <th mat-header-cell *matHeaderCellDef>Status</th>\r\n        <td mat-cell *matCellDef=\"let course\">\r\n          <span class=\"status-badge\" [ngClass]=\"{\r\n            'published': course.isPublished,\r\n            'draft': !course.isPublished\r\n          }\">\r\n            {{course.isPublished ? 'Published' : 'Draft'}}\r\n          </span>\r\n        </td>\r\n      </ng-container>\r\n      \r\n      <ng-container matColumnDef=\"enrollments\">\r\n        <th mat-header-cell *matHeaderCellDef>Enrollments</th>\r\n        <td mat-cell *matCellDef=\"let course\">{{course.totalEnrollments}}</td>\r\n      </ng-container>\r\n      \r\n      <ng-container matColumnDef=\"actions\">\r\n        <th mat-header-cell *matHeaderCellDef>\r\n          <span class=\"visually-hidden\">Actions</span>\r\n        </th>\r\n        <td mat-cell *matCellDef=\"let course\">\r\n          <button mat-icon-button [matMenuTriggerFor]=\"actionsMenu\">\r\n            <mat-icon>more_horiz</mat-icon>\r\n          </button>\r\n          <mat-menu #actionsMenu=\"matMenu\">\r\n            <button mat-menu-item [routerLink]=\"['/Courses/Edit', course.id]\">Edit</button>\r\n            <button mat-menu-item>View Enrollments</button>\r\n            <button mat-menu-item>Preview</button>\r\n            <button mat-menu-item class=\"danger\">Delete</button>\r\n          </mat-menu>\r\n        </td>\r\n      </ng-container>\r\n      \r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n    </table>\r\n  </mat-card-content>\r\n</mat-card>", styles: [".courses-list-card{max-width:1200px;margin:2rem auto}.header-content{display:flex;justify-content:space-between;align-items:center;width:100%}.header-actions{display:flex;gap:.75rem}.courses-table{width:100%}.status-badge{display:inline-block;padding:.25rem .75rem;border-radius:9999px;font-size:.75rem}.status-badge.published{background-color:#00c8531a;color:#00963c}.status-badge.draft{background-color:#6464641a;color:#505050;border:1px solid rgba(100,100,100,.2)}.status-badge.archived{background-color:#c800001a;color:#960000}.visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.danger{color:#c80000}button[mat-flat-button] mat-icon{margin-right:.5rem}\n", ".course-title-with-image{display:flex;align-items:center;gap:10px}.course-title-with-image .course-thumbnail{width:60px;height:40px;object-fit:cover;border-radius:4px;border:1px solid #e0e0e0}.upload-container{width:100%;height:200px;border:2px dashed #ccc;border-radius:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;cursor:pointer;transition:all .3s ease;margin-bottom:16px;background-color:#f9f9f9}.upload-container:hover{border-color:#3f51b5;background-color:#f5f5f5}.upload-container mat-icon{font-size:40px;height:40px;width:40px;color:#757575;margin-bottom:8px}.upload-container span{color:#757575}.upload-container .preview{width:100%;height:100%;display:flex;justify-content:center;align-items:center;overflow:hidden}.upload-container .preview img,.upload-container .preview video{max-width:100%;max-height:100%;object-fit:contain}.upload-container .preview .preview-image{border:1px solid #e0e0e0;border-radius:4px}\n"] }]
        }], ctorParameters: () => [{ type: i1.CourseService }, { type: i1.MediaService }, { type: i2.Router }, { type: i3.MatSnackBar }] });

class CourseCreateComponent {
    constructor(fb, courseService, categoryService, tagService, mediaService, courseContentService, router, snackBar, route) {
        this.fb = fb;
        this.courseService = courseService;
        this.categoryService = categoryService;
        this.tagService = tagService;
        this.mediaService = mediaService;
        this.courseContentService = courseContentService;
        this.router = router;
        this.snackBar = snackBar;
        this.route = route;
        this.categories = [];
        this.tags = [];
        this.isLoading = false;
        this.isEditMode = false;
        this.existingContents = [];
        this.uploadedFile = null;
        this.previewUrl = null;
        this.courseMediaFile = null;
        this.contentMediaFiles = new Map();
    }
    ngOnInit() {
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
    initForm() {
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
    loadCourseData(courseId) {
        this.isLoading = true;
        // Get course details
        this.courseService.getById(courseId)
            .pipe(switchMap(course => {
            this.existingCourse = course;
            // Get media details if exists
            const mediaRequest = course.mediaId ?
                this.mediaService.getById(course.mediaId).pipe(catchError(error => {
                    console.error('Error loading media:', error);
                    return of(null);
                })) : of(null);
            // Get course contents
            const contentsRequest = this.courseContentService.getAll().pipe(catchError(error => {
                console.error('Error loading course contents:', error);
                return of([]);
            }), 
            // Filter contents for this course
            switchMap(allContents => {
                const courseContents = allContents.filter(content => content.courseId === courseId);
                // If we have contents with media, load their media too
                if (courseContents.length > 0) {
                    const mediaRequests = courseContents
                        .filter(content => content.mediaId)
                        .map(content => this.mediaService.getById(content.mediaId)
                        .pipe(catchError(() => of(null)), switchMap(media => {
                        if (media) {
                            // Assign media to content
                            const contentWithIndex = courseContents.findIndex(c => c.id === content.id);
                            if (contentWithIndex >= 0) {
                                courseContents[contentWithIndex].media = media;
                            }
                        }
                        return of(null);
                    })));
                    if (mediaRequests.length > 0) {
                        return forkJoin(mediaRequests).pipe(switchMap(() => of(courseContents)));
                    }
                }
                return of(courseContents);
            }));
            return forkJoin({
                media: mediaRequest,
                contents: contentsRequest
            });
        }))
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
    populateForm() {
        if (!this.existingCourse)
            return;
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
            const tagIds = this.existingCourse.tags.map(tag => tag.id);
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
    loadCategories() {
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
    loadTags() {
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
    get contents() {
        return this.courseForm.get('contents');
    }
    get media() {
        return this.courseForm.get('media');
    }
    getMediaGroup(content) {
        return content.get('media');
    }
    addContent() {
        this.contents.push(this.fb.group({
            order: [this.contents.length + 1, Validators.required],
            title: ['', Validators.required],
            textContent: [''],
            duration: [0, [Validators.required, Validators.min(1)]],
            media: this.fb.group({
                url: [''],
                type: ['']
            })
        }));
    }
    removeContent(index) {
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
            let courseMedia;
            if (this.courseMediaFile) {
                try {
                    const uploadedMedia = await this.mediaService.uploadFile(this.courseMediaFile).toPromise();
                    if (!uploadedMedia) {
                        throw new Error('Failed to upload course media: Response is empty');
                    }
                    courseMedia = uploadedMedia;
                }
                catch (error) {
                    console.error('Error uploading course media:', error);
                    throw new Error('Failed to upload course media');
                }
            }
            else {
                // Use existing media or create empty one
                courseMedia = {
                    id: this.isEditMode && this.existingMedia ? this.existingMedia.id : 0,
                    url: this.courseForm.get('media.url')?.value || '',
                    type: this.courseForm.get('media.type')?.value || ''
                };
            }
            // Prepare course data
            const courseData = {
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
                    ? formValue.tagIds.map((id) => ({ id }))
                    : undefined
            };
            // Process course contents and their media
            const courseContentsPromises = formValue.contents
                ? formValue.contents.map(async (content, index) => {
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
                        }
                        catch (error) {
                            console.error(`Error uploading media for content ${index}:`, error);
                            throw new Error(`Failed to upload media for content ${index}`);
                        }
                    }
                    else if (content.media?.url && content.media?.type) {
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
            const contentIdsToDelete = [];
            if (this.isEditMode && this.existingContents && this.existingContents.length > 0) {
                const currentContentIds = formValue.contents
                    ? formValue.contents
                        .filter((c) => c.id) // Only include contents with IDs (existing contents)
                        .map((c) => c.id)
                    : [];
                const deletedContentIds = this.existingContents
                    .filter(c => c.id && !currentContentIds.includes(c.id))
                    .map(c => c.id);
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
        }
        catch (error) {
            console.error('Error saving course:', error);
            this.snackBar.open('Error saving course: ' + (error.message || 'Unknown error'), 'Close', {
                duration: 5000
            });
        }
        finally {
            this.isLoading = false;
        }
    }
    onDiscardCourse() {
        if (confirm('Are you sure you want to discard this course?')) {
            this.router.navigate(['/Courses']);
        }
    }
    onFileSelected(event, contentIndex) {
        const input = event.target;
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
                        const preview = reader.result;
                        contentMediaGroup.patchValue({ url: preview });
                    };
                    reader.readAsDataURL(file);
                }
            }
            else {
                // This is for the main course media
                this.uploadedFile = file;
                this.courseMediaFile = file;
                const reader = new FileReader();
                reader.onload = () => (this.previewUrl = reader.result);
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
    isImageFile(contentIndex) {
        if (contentIndex !== undefined) {
            const file = this.contentMediaFiles.get(contentIndex);
            return file ? file.type.startsWith('image') : false;
        }
        return this.uploadedFile ? this.uploadedFile.type.startsWith('image') : false;
    }
    isVideoFile(contentIndex) {
        if (contentIndex !== undefined) {
            const file = this.contentMediaFiles.get(contentIndex);
            return file ? file.type.startsWith('video') : false;
        }
        return this.uploadedFile ? this.uploadedFile.type.startsWith('video') : false;
    }
    getMediaUrl(url) {
        return url ? this.mediaService.getFullUrl(url) : '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CourseCreateComponent, deps: [{ token: i1$1.FormBuilder }, { token: i1.CourseService }, { token: i1.CategoryService }, { token: i1.TagService }, { token: i1.MediaService }, { token: i1.CourseContentService }, { token: i2.Router }, { token: i3.MatSnackBar }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: CourseCreateComponent, isStandalone: false, selector: "app-course-create", ngImport: i0, template: "<div class=\"create-course-container\">\r\n  <div class=\"header\">\r\n    <button mat-icon-button routerLink=\"/Courses\">\r\n      <mat-icon>arrow_back</mat-icon>\r\n    </button>\r\n    <h1 class=\"title\">{{ isEditMode ? 'Edit Course' : 'New Course' }}</h1>\r\n    <div class=\"status-badge\" [ngClass]=\"{'published': courseForm.get('isPublished')?.value}\">\r\n      {{ courseForm.get('isPublished')?.value ? 'Published' : 'Draft' }}\r\n    </div>\r\n    <div class=\"spacer\"></div>\r\n    <div class=\"actions\">\r\n      <button mat-stroked-button (click)=\"onDiscardCourse()\" [disabled]=\"isLoading\">\r\n        Discard\r\n      </button>\r\n      <button mat-flat-button color=\"primary\" (click)=\"onSaveCourse()\" [disabled]=\"isLoading\">\r\n        <mat-spinner *ngIf=\"isLoading\" diameter=\"20\" style=\"display: inline-block; margin-right: 8px;\"></mat-spinner>\r\n        {{ isLoading ? 'Saving...' : (isEditMode ? 'Update Course' : 'Save Course') }}\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"content-layout\">\r\n    <!-- COLUNA PRINCIPAL -->\r\n    <div class=\"main-column\">\r\n      <mat-card class=\"card\">\r\n        <mat-card-header>\r\n          <mat-card-title>Course Details</mat-card-title>\r\n          <mat-card-subtitle>Provide the main details for your new course.</mat-card-subtitle>\r\n        </mat-card-header>\r\n        <mat-card-content>\r\n          <form [formGroup]=\"courseForm\" class=\"form-layout\">\r\n            <div class=\"form-field\">\r\n              <mat-label>Title</mat-label>\r\n              <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                <input matInput formControlName=\"title\" placeholder=\"e.g. Advanced Project Management\">\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <div class=\"form-field\">\r\n              <mat-label>Description</mat-label>\r\n              <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                <textarea matInput formControlName=\"description\" rows=\"4\"\r\n                  placeholder=\"A short, engaging summary of what learners will achieve.\"></textarea>\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <div class=\"form-field\">\r\n              <mat-label>Category</mat-label>\r\n              <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                <mat-select formControlName=\"categoryId\" placeholder=\"Select category\">\r\n                  <mat-option *ngFor=\"let c of categories\" [value]=\"c.id\">{{ c.name }}</mat-option>\r\n                </mat-select>\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <div class=\"form-field\">\r\n              <mat-label>Tags</mat-label>\r\n              <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                <mat-select formControlName=\"tagIds\" multiple placeholder=\"Select tags\">\r\n                  <mat-option *ngFor=\"let t of tags\" [value]=\"t.id\">{{ t.name }}</mat-option>\r\n                </mat-select>\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <div class=\"form-field\">\r\n              <mat-label>Duration (minutes)</mat-label>\r\n              <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                <input matInput type=\"number\" formControlName=\"duration\" min=\"1\" placeholder=\"Course duration\">\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <div class=\"form-field\">\r\n              <mat-label>Price (R$)</mat-label>\r\n              <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                <input matInput type=\"number\" formControlName=\"price\" min=\"0\" placeholder=\"Course price\">\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <div class=\"form-field\">\r\n              <mat-label>Language</mat-label>\r\n              <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                <input matInput formControlName=\"language\" placeholder=\"e.g. Portugu\u00EAs, English\">\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <!-- CONTE\u00DADOS -->\r\n            <div class=\"form-field\">\r\n              <mat-label>Course Contents</mat-label>\r\n              <div formArrayName=\"contents\">\r\n                <div *ngFor=\"let content of contents.controls; let i = index\" [formGroupName]=\"i\" class=\"content-item\">\r\n                  <mat-card class=\"card\">\r\n                    <div class=\"content-header\">\r\n                      <button mat-icon-button color=\"warn\" (click)=\"removeContent(i)\" type=\"button\"\r\n                        title=\"Remove content\">\r\n                        <mat-icon>delete</mat-icon>\r\n                      </button>\r\n                    </div>\r\n                    <div class=\"form-field\">\r\n                      <mat-label>Order</mat-label>\r\n                      <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                        <input matInput type=\"number\" formControlName=\"order\" min=\"1\">\r\n                      </mat-form-field>\r\n                    </div>\r\n\r\n                    <div class=\"form-field\">\r\n                      <mat-label>Title</mat-label>\r\n                      <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                        <input matInput formControlName=\"title\" placeholder=\"Content title\">\r\n                      </mat-form-field>\r\n                    </div>\r\n\r\n                    <div class=\"form-field\">\r\n                      <mat-label>Text Content</mat-label>\r\n                      <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                        <textarea matInput formControlName=\"textContent\" rows=\"3\"></textarea>\r\n                      </mat-form-field>\r\n                    </div>\r\n\r\n                    <div class=\"form-field\">\r\n                      <mat-label>Duration (minutes)</mat-label>\r\n                      <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                        <input matInput type=\"number\" formControlName=\"duration\" min=\"1\">\r\n                      </mat-form-field>\r\n                    </div>\r\n\r\n                    <div class=\"form-field\">\r\n                      <mat-card class=\"card\">\r\n                        <mat-card-header>\r\n                          <mat-card-title>Content Media</mat-card-title>\r\n                          <mat-card-subtitle>Upload or select an image or video for this content.</mat-card-subtitle>\r\n                        </mat-card-header>\r\n                        <mat-card-content>\r\n                          <div class=\"upload-container\" (click)=\"contentFileInput.click()\">\r\n                            <ng-container *ngIf=\"!getMediaGroup(content).get('url')?.value; else contentPreview\">\r\n                              <mat-icon>cloud_upload</mat-icon>\r\n                              <span>Click to upload a file</span>\r\n                            </ng-container>\r\n\r\n                            <ng-template #contentPreview>\r\n                              <div class=\"preview\">\r\n                                <img *ngIf=\"getMediaGroup(content).get('type')?.value === 'image'\" \r\n                                    [src]=\"getMediaUrl(getMediaGroup(content).get('url')?.value)\" alt=\"Preview\" class=\"preview-image\" />\r\n                                <video *ngIf=\"getMediaGroup(content).get('type')?.value === 'video'\" \r\n                                    [src]=\"getMediaUrl(getMediaGroup(content).get('url')?.value)\" controls></video>\r\n                                <p *ngIf=\"getMediaGroup(content).get('type')?.value !== 'image' && getMediaGroup(content).get('type')?.value !== 'video'\">\r\n                                  Document File\r\n                                </p>\r\n                              </div>\r\n                            </ng-template>\r\n                          </div>\r\n\r\n                          <input #contentFileInput type=\"file\" (change)=\"onFileSelected($event, i)\" hidden\r\n                            accept=\"image/*,video/*,application/pdf\" />\r\n\r\n                          <div [formGroup]=\"media\" class=\"form-field\" *ngIf=\"uploadedFile\">\r\n                            <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                              <input matInput formControlName=\"type\" placeholder=\"File type (e.g. image, video)\" />\r\n                            </mat-form-field>\r\n                          </div>\r\n                        </mat-card-content>\r\n                      </mat-card>\r\n                    </div>\r\n                  </mat-card>\r\n                </div>\r\n                <button mat-stroked-button color=\"primary\" (click)=\"addContent()\" type=\"button\">\r\n                  Add Content\r\n                </button>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </mat-card-content>\r\n      </mat-card>\r\n    </div>\r\n\r\n    <!-- SIDEBAR -->\r\n    <div class=\"sidebar-column\">\r\n      <mat-card class=\"card\">\r\n        <mat-card-header>\r\n          <mat-card-title>Course Status</mat-card-title>\r\n        </mat-card-header>\r\n        <mat-card-content>\r\n          <div [formGroup]=\"courseForm\">\r\n            <mat-slide-toggle formControlName=\"isPublished\">Published</mat-slide-toggle>\r\n          </div>\r\n        </mat-card-content>\r\n      </mat-card>\r\n\r\n      <mat-card class=\"card\">\r\n        <mat-card-header>\r\n          <mat-card-title>Course Media</mat-card-title>\r\n          <mat-card-subtitle>Upload or select a cover image or video for your course.</mat-card-subtitle>\r\n        </mat-card-header>\r\n        <mat-card-content>\r\n          <div class=\"upload-container\" (click)=\"fileInput.click()\">\r\n            <ng-container *ngIf=\"!previewUrl; else preview\">\r\n              <mat-icon>cloud_upload</mat-icon>\r\n              <span>Click to upload a file</span>\r\n            </ng-container>\r\n\r\n            <ng-template #preview>\r\n              <div class=\"preview\">\r\n                <img *ngIf=\"isImageFile()\" [src]=\"previewUrl\" alt=\"Preview\" class=\"preview-image\" />\r\n                <video *ngIf=\"isVideoFile()\" [src]=\"previewUrl\" controls></video>\r\n                <p *ngIf=\"!isImageFile() && !isVideoFile()\">\r\n                  {{ uploadedFile?.name }}\r\n                </p>\r\n              </div>\r\n            </ng-template>\r\n          </div>\r\n\r\n          <input #fileInput type=\"file\" (change)=\"onFileSelected($event)\" hidden\r\n            accept=\"image/*,video/*,application/pdf\" />\r\n\r\n          <div [formGroup]=\"media\" class=\"form-field\" *ngIf=\"uploadedFile\">\r\n            <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n              <input matInput formControlName=\"type\" placeholder=\"File type (e.g. image, video)\" />\r\n            </mat-form-field>\r\n          </div>\r\n        </mat-card-content>\r\n      </mat-card>\r\n\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"mobile-actions\">\r\n    <button mat-stroked-button (click)=\"onDiscardCourse()\">Discard</button>\r\n    <button mat-flat-button color=\"primary\" (click)=\"onSaveCourse()\">{{ isEditMode ? 'Update Course' : 'Save Course' }}</button>\r\n  </div>\r\n</div>", styles: [".create-course-container{max-width:1200px;margin:0 auto;padding:1.5rem}.header{display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem}.title{font-size:1.5rem;font-weight:600;margin:0;font-family:Poppins,sans-serif}.status-badge{padding:.25rem .75rem;border-radius:9999px;border:1px solid rgba(0,0,0,.12);font-size:.75rem}.spacer{flex:1}.actions{display:flex;gap:.75rem}.content-layout{display:grid;grid-template-columns:1fr 250px;gap:1.5rem}.main-column,.sidebar-column{display:flex;flex-direction:column;gap:1.5rem}.card{width:100%}.form-layout{display:flex;flex-direction:column;gap:1.5rem}.form-field{display:flex;flex-direction:column;gap:.5rem}.full-width{width:100%}.text-left{text-align:left}.ai-button{display:flex;align-items:center;gap:.5rem}.upload-container{height:128px;border:2px dashed rgba(0,0,0,.12);border-radius:.375rem;background-color:#0000000a;display:flex;align-items:center;justify-content:center;cursor:pointer}.upload-container mat-icon{font-size:2rem;height:2rem;width:2rem;color:#0006}.mobile-actions{display:none;margin-top:1.5rem;gap:.75rem;justify-content:center}@media (max-width: 768px){.content-layout{grid-template-columns:1fr}.actions{display:none}.mobile-actions{display:flex}}.status-badge.published{background-color:#e0f7e9;border-color:#4caf50;color:#2e7d32}.content-item{margin-bottom:1rem;padding:.5rem}.content-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem}.upload-container{height:160px;border:2px dashed rgba(0,0,0,.2);border-radius:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;color:#00000080;cursor:pointer;text-align:center;transition:border-color .2s ease}.upload-container:hover{border-color:#3f51b5;color:#3f51b5}.preview img,.preview video{max-height:140px;border-radius:6px}.preview p{margin:.5rem 0 0;font-size:.9rem}.content-item{margin-bottom:1rem;transition:transform .2s ease}\n", ".course-title-with-image{display:flex;align-items:center;gap:10px}.course-title-with-image .course-thumbnail{width:60px;height:40px;object-fit:cover;border-radius:4px;border:1px solid #e0e0e0}.upload-container{width:100%;height:200px;border:2px dashed #ccc;border-radius:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;cursor:pointer;transition:all .3s ease;margin-bottom:16px;background-color:#f9f9f9}.upload-container:hover{border-color:#3f51b5;background-color:#f5f5f5}.upload-container mat-icon{font-size:40px;height:40px;width:40px;color:#757575;margin-bottom:8px}.upload-container span{color:#757575}.upload-container .preview{width:100%;height:100%;display:flex;justify-content:center;align-items:center;overflow:hidden}.upload-container .preview img,.upload-container .preview video{max-width:100%;max-height:100%;object-fit:contain}.upload-container .preview .preview-image{border:1px solid #e0e0e0;border-radius:4px}\n"], dependencies: [{ kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.MinValidator, selector: "input[type=number][min][formControlName],input[type=number][min][formControl],input[type=number][min][ngModel]", inputs: ["min"] }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i1$1.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "directive", type: i1$1.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i7$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i7$1.MatLabel, selector: "mat-label" }, { kind: "directive", type: i7$2.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i5$1.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i5$1.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }, { kind: "component", type: i10.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }, { kind: "directive", type: i10.MatCardContent, selector: "mat-card-content" }, { kind: "component", type: i10.MatCardHeader, selector: "mat-card-header" }, { kind: "directive", type: i10.MatCardSubtitle, selector: "mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]" }, { kind: "directive", type: i10.MatCardTitle, selector: "mat-card-title, [mat-card-title], [matCardTitle]" }, { kind: "component", type: i7.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i11.MatSelect, selector: "mat-select", inputs: ["aria-describedby", "panelClass", "disabled", "disableRipple", "tabIndex", "hideSingleSelectionIndicator", "placeholder", "required", "multiple", "disableOptionCentering", "compareWith", "value", "aria-label", "aria-labelledby", "errorStateMatcher", "typeaheadDebounceInterval", "sortComparator", "id", "panelWidth", "canSelectNullableOptions"], outputs: ["openedChange", "opened", "closed", "selectionChange", "valueChange"], exportAs: ["matSelect"] }, { kind: "component", type: i11.MatOption, selector: "mat-option", inputs: ["value", "id", "disabled"], outputs: ["onSelectionChange"], exportAs: ["matOption"] }, { kind: "component", type: i12.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CourseCreateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-course-create', standalone: false, template: "<div class=\"create-course-container\">\r\n  <div class=\"header\">\r\n    <button mat-icon-button routerLink=\"/Courses\">\r\n      <mat-icon>arrow_back</mat-icon>\r\n    </button>\r\n    <h1 class=\"title\">{{ isEditMode ? 'Edit Course' : 'New Course' }}</h1>\r\n    <div class=\"status-badge\" [ngClass]=\"{'published': courseForm.get('isPublished')?.value}\">\r\n      {{ courseForm.get('isPublished')?.value ? 'Published' : 'Draft' }}\r\n    </div>\r\n    <div class=\"spacer\"></div>\r\n    <div class=\"actions\">\r\n      <button mat-stroked-button (click)=\"onDiscardCourse()\" [disabled]=\"isLoading\">\r\n        Discard\r\n      </button>\r\n      <button mat-flat-button color=\"primary\" (click)=\"onSaveCourse()\" [disabled]=\"isLoading\">\r\n        <mat-spinner *ngIf=\"isLoading\" diameter=\"20\" style=\"display: inline-block; margin-right: 8px;\"></mat-spinner>\r\n        {{ isLoading ? 'Saving...' : (isEditMode ? 'Update Course' : 'Save Course') }}\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"content-layout\">\r\n    <!-- COLUNA PRINCIPAL -->\r\n    <div class=\"main-column\">\r\n      <mat-card class=\"card\">\r\n        <mat-card-header>\r\n          <mat-card-title>Course Details</mat-card-title>\r\n          <mat-card-subtitle>Provide the main details for your new course.</mat-card-subtitle>\r\n        </mat-card-header>\r\n        <mat-card-content>\r\n          <form [formGroup]=\"courseForm\" class=\"form-layout\">\r\n            <div class=\"form-field\">\r\n              <mat-label>Title</mat-label>\r\n              <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                <input matInput formControlName=\"title\" placeholder=\"e.g. Advanced Project Management\">\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <div class=\"form-field\">\r\n              <mat-label>Description</mat-label>\r\n              <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                <textarea matInput formControlName=\"description\" rows=\"4\"\r\n                  placeholder=\"A short, engaging summary of what learners will achieve.\"></textarea>\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <div class=\"form-field\">\r\n              <mat-label>Category</mat-label>\r\n              <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                <mat-select formControlName=\"categoryId\" placeholder=\"Select category\">\r\n                  <mat-option *ngFor=\"let c of categories\" [value]=\"c.id\">{{ c.name }}</mat-option>\r\n                </mat-select>\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <div class=\"form-field\">\r\n              <mat-label>Tags</mat-label>\r\n              <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                <mat-select formControlName=\"tagIds\" multiple placeholder=\"Select tags\">\r\n                  <mat-option *ngFor=\"let t of tags\" [value]=\"t.id\">{{ t.name }}</mat-option>\r\n                </mat-select>\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <div class=\"form-field\">\r\n              <mat-label>Duration (minutes)</mat-label>\r\n              <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                <input matInput type=\"number\" formControlName=\"duration\" min=\"1\" placeholder=\"Course duration\">\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <div class=\"form-field\">\r\n              <mat-label>Price (R$)</mat-label>\r\n              <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                <input matInput type=\"number\" formControlName=\"price\" min=\"0\" placeholder=\"Course price\">\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <div class=\"form-field\">\r\n              <mat-label>Language</mat-label>\r\n              <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                <input matInput formControlName=\"language\" placeholder=\"e.g. Portugu\u00EAs, English\">\r\n              </mat-form-field>\r\n            </div>\r\n\r\n            <!-- CONTE\u00DADOS -->\r\n            <div class=\"form-field\">\r\n              <mat-label>Course Contents</mat-label>\r\n              <div formArrayName=\"contents\">\r\n                <div *ngFor=\"let content of contents.controls; let i = index\" [formGroupName]=\"i\" class=\"content-item\">\r\n                  <mat-card class=\"card\">\r\n                    <div class=\"content-header\">\r\n                      <button mat-icon-button color=\"warn\" (click)=\"removeContent(i)\" type=\"button\"\r\n                        title=\"Remove content\">\r\n                        <mat-icon>delete</mat-icon>\r\n                      </button>\r\n                    </div>\r\n                    <div class=\"form-field\">\r\n                      <mat-label>Order</mat-label>\r\n                      <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                        <input matInput type=\"number\" formControlName=\"order\" min=\"1\">\r\n                      </mat-form-field>\r\n                    </div>\r\n\r\n                    <div class=\"form-field\">\r\n                      <mat-label>Title</mat-label>\r\n                      <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                        <input matInput formControlName=\"title\" placeholder=\"Content title\">\r\n                      </mat-form-field>\r\n                    </div>\r\n\r\n                    <div class=\"form-field\">\r\n                      <mat-label>Text Content</mat-label>\r\n                      <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                        <textarea matInput formControlName=\"textContent\" rows=\"3\"></textarea>\r\n                      </mat-form-field>\r\n                    </div>\r\n\r\n                    <div class=\"form-field\">\r\n                      <mat-label>Duration (minutes)</mat-label>\r\n                      <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                        <input matInput type=\"number\" formControlName=\"duration\" min=\"1\">\r\n                      </mat-form-field>\r\n                    </div>\r\n\r\n                    <div class=\"form-field\">\r\n                      <mat-card class=\"card\">\r\n                        <mat-card-header>\r\n                          <mat-card-title>Content Media</mat-card-title>\r\n                          <mat-card-subtitle>Upload or select an image or video for this content.</mat-card-subtitle>\r\n                        </mat-card-header>\r\n                        <mat-card-content>\r\n                          <div class=\"upload-container\" (click)=\"contentFileInput.click()\">\r\n                            <ng-container *ngIf=\"!getMediaGroup(content).get('url')?.value; else contentPreview\">\r\n                              <mat-icon>cloud_upload</mat-icon>\r\n                              <span>Click to upload a file</span>\r\n                            </ng-container>\r\n\r\n                            <ng-template #contentPreview>\r\n                              <div class=\"preview\">\r\n                                <img *ngIf=\"getMediaGroup(content).get('type')?.value === 'image'\" \r\n                                    [src]=\"getMediaUrl(getMediaGroup(content).get('url')?.value)\" alt=\"Preview\" class=\"preview-image\" />\r\n                                <video *ngIf=\"getMediaGroup(content).get('type')?.value === 'video'\" \r\n                                    [src]=\"getMediaUrl(getMediaGroup(content).get('url')?.value)\" controls></video>\r\n                                <p *ngIf=\"getMediaGroup(content).get('type')?.value !== 'image' && getMediaGroup(content).get('type')?.value !== 'video'\">\r\n                                  Document File\r\n                                </p>\r\n                              </div>\r\n                            </ng-template>\r\n                          </div>\r\n\r\n                          <input #contentFileInput type=\"file\" (change)=\"onFileSelected($event, i)\" hidden\r\n                            accept=\"image/*,video/*,application/pdf\" />\r\n\r\n                          <div [formGroup]=\"media\" class=\"form-field\" *ngIf=\"uploadedFile\">\r\n                            <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n                              <input matInput formControlName=\"type\" placeholder=\"File type (e.g. image, video)\" />\r\n                            </mat-form-field>\r\n                          </div>\r\n                        </mat-card-content>\r\n                      </mat-card>\r\n                    </div>\r\n                  </mat-card>\r\n                </div>\r\n                <button mat-stroked-button color=\"primary\" (click)=\"addContent()\" type=\"button\">\r\n                  Add Content\r\n                </button>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </mat-card-content>\r\n      </mat-card>\r\n    </div>\r\n\r\n    <!-- SIDEBAR -->\r\n    <div class=\"sidebar-column\">\r\n      <mat-card class=\"card\">\r\n        <mat-card-header>\r\n          <mat-card-title>Course Status</mat-card-title>\r\n        </mat-card-header>\r\n        <mat-card-content>\r\n          <div [formGroup]=\"courseForm\">\r\n            <mat-slide-toggle formControlName=\"isPublished\">Published</mat-slide-toggle>\r\n          </div>\r\n        </mat-card-content>\r\n      </mat-card>\r\n\r\n      <mat-card class=\"card\">\r\n        <mat-card-header>\r\n          <mat-card-title>Course Media</mat-card-title>\r\n          <mat-card-subtitle>Upload or select a cover image or video for your course.</mat-card-subtitle>\r\n        </mat-card-header>\r\n        <mat-card-content>\r\n          <div class=\"upload-container\" (click)=\"fileInput.click()\">\r\n            <ng-container *ngIf=\"!previewUrl; else preview\">\r\n              <mat-icon>cloud_upload</mat-icon>\r\n              <span>Click to upload a file</span>\r\n            </ng-container>\r\n\r\n            <ng-template #preview>\r\n              <div class=\"preview\">\r\n                <img *ngIf=\"isImageFile()\" [src]=\"previewUrl\" alt=\"Preview\" class=\"preview-image\" />\r\n                <video *ngIf=\"isVideoFile()\" [src]=\"previewUrl\" controls></video>\r\n                <p *ngIf=\"!isImageFile() && !isVideoFile()\">\r\n                  {{ uploadedFile?.name }}\r\n                </p>\r\n              </div>\r\n            </ng-template>\r\n          </div>\r\n\r\n          <input #fileInput type=\"file\" (change)=\"onFileSelected($event)\" hidden\r\n            accept=\"image/*,video/*,application/pdf\" />\r\n\r\n          <div [formGroup]=\"media\" class=\"form-field\" *ngIf=\"uploadedFile\">\r\n            <mat-form-field appearance=\"outline\" class=\"full-width\">\r\n              <input matInput formControlName=\"type\" placeholder=\"File type (e.g. image, video)\" />\r\n            </mat-form-field>\r\n          </div>\r\n        </mat-card-content>\r\n      </mat-card>\r\n\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"mobile-actions\">\r\n    <button mat-stroked-button (click)=\"onDiscardCourse()\">Discard</button>\r\n    <button mat-flat-button color=\"primary\" (click)=\"onSaveCourse()\">{{ isEditMode ? 'Update Course' : 'Save Course' }}</button>\r\n  </div>\r\n</div>", styles: [".create-course-container{max-width:1200px;margin:0 auto;padding:1.5rem}.header{display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem}.title{font-size:1.5rem;font-weight:600;margin:0;font-family:Poppins,sans-serif}.status-badge{padding:.25rem .75rem;border-radius:9999px;border:1px solid rgba(0,0,0,.12);font-size:.75rem}.spacer{flex:1}.actions{display:flex;gap:.75rem}.content-layout{display:grid;grid-template-columns:1fr 250px;gap:1.5rem}.main-column,.sidebar-column{display:flex;flex-direction:column;gap:1.5rem}.card{width:100%}.form-layout{display:flex;flex-direction:column;gap:1.5rem}.form-field{display:flex;flex-direction:column;gap:.5rem}.full-width{width:100%}.text-left{text-align:left}.ai-button{display:flex;align-items:center;gap:.5rem}.upload-container{height:128px;border:2px dashed rgba(0,0,0,.12);border-radius:.375rem;background-color:#0000000a;display:flex;align-items:center;justify-content:center;cursor:pointer}.upload-container mat-icon{font-size:2rem;height:2rem;width:2rem;color:#0006}.mobile-actions{display:none;margin-top:1.5rem;gap:.75rem;justify-content:center}@media (max-width: 768px){.content-layout{grid-template-columns:1fr}.actions{display:none}.mobile-actions{display:flex}}.status-badge.published{background-color:#e0f7e9;border-color:#4caf50;color:#2e7d32}.content-item{margin-bottom:1rem;padding:.5rem}.content-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem}.upload-container{height:160px;border:2px dashed rgba(0,0,0,.2);border-radius:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;color:#00000080;cursor:pointer;text-align:center;transition:border-color .2s ease}.upload-container:hover{border-color:#3f51b5;color:#3f51b5}.preview img,.preview video{max-height:140px;border-radius:6px}.preview p{margin:.5rem 0 0;font-size:.9rem}.content-item{margin-bottom:1rem;transition:transform .2s ease}\n", ".course-title-with-image{display:flex;align-items:center;gap:10px}.course-title-with-image .course-thumbnail{width:60px;height:40px;object-fit:cover;border-radius:4px;border:1px solid #e0e0e0}.upload-container{width:100%;height:200px;border:2px dashed #ccc;border-radius:8px;display:flex;flex-direction:column;justify-content:center;align-items:center;cursor:pointer;transition:all .3s ease;margin-bottom:16px;background-color:#f9f9f9}.upload-container:hover{border-color:#3f51b5;background-color:#f5f5f5}.upload-container mat-icon{font-size:40px;height:40px;width:40px;color:#757575;margin-bottom:8px}.upload-container span{color:#757575}.upload-container .preview{width:100%;height:100%;display:flex;justify-content:center;align-items:center;overflow:hidden}.upload-container .preview img,.upload-container .preview video{max-width:100%;max-height:100%;object-fit:contain}.upload-container .preview .preview-image{border:1px solid #e0e0e0;border-radius:4px}\n"] }]
        }], ctorParameters: () => [{ type: i1$1.FormBuilder }, { type: i1.CourseService }, { type: i1.CategoryService }, { type: i1.TagService }, { type: i1.MediaService }, { type: i1.CourseContentService }, { type: i2.Router }, { type: i3.MatSnackBar }, { type: i2.ActivatedRoute }] });

class CourseDetailComponent {
    constructor(route, router, courseService, mediaService, snackBar) {
        this.route = route;
        this.router = router;
        this.courseService = courseService;
        this.mediaService = mediaService;
        this.snackBar = snackBar;
        this.course = null;
        this.courseContents = [];
        this.isLoading = true;
        this.selectedContent = null;
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['courseId']) {
                this.courseId = +params['courseId'];
                // Check if content ID is specified in the URL query params
                this.route.queryParams.subscribe(queryParams => {
                    const contentId = queryParams['contentId'] ? +queryParams['contentId'] : null;
                    this.loadCourseData(this.courseId, contentId);
                });
            }
            else {
                this.snackBar.open('Course ID not provided', 'Close', { duration: 3000 });
                this.router.navigate(['/Courses']);
            }
        });
    }
    loadCourseData(courseId, contentId = null) {
        this.isLoading = true;
        this.courseService.getById(courseId)
            .pipe(switchMap(course => {
            this.course = course;
            // Load media for course if exists
            const courseMediaRequest = course.mediaId ?
                this.mediaService.getById(course.mediaId).pipe(catchError(() => of(null))) : of(null);
            // Load course contents
            const contentsRequest = this.courseService.getContents(courseId).pipe(catchError(() => {
                console.error('Error loading course contents');
                return of([]);
            }), switchMap(contents => {
                this.courseContents = contents.sort((a, b) => a.order - b.order);
                // If contentId is provided, find that specific content
                if (contentId && this.courseContents.length > 0) {
                    const targetContent = this.courseContents.find(c => c.id === contentId);
                    if (targetContent) {
                        this.selectedContent = targetContent;
                    }
                    else {
                        // Fallback to first content if specified content not found
                        this.selectedContent = this.courseContents[0];
                    }
                }
                // Otherwise set first content as selected by default if no content is currently selected
                else if (this.courseContents.length > 0 && !this.selectedContent) {
                    this.selectedContent = this.courseContents[0];
                } // Load media for each content
                const contentMediaRequests = this.courseContents
                    .filter(content => content.mediaId)
                    .map(content => this.mediaService.getById(content.mediaId)
                    .pipe(catchError(() => of(null)), switchMap(media => {
                    if (media) {
                        const contentIndex = this.courseContents.findIndex(c => c.id === content.id);
                        if (contentIndex >= 0) {
                            this.courseContents[contentIndex].media = media;
                        }
                    }
                    return of(null);
                })));
                if (contentMediaRequests.length > 0) {
                    return forkJoin(contentMediaRequests);
                }
                return of(null);
            }));
            return forkJoin({
                courseMedia: courseMediaRequest,
                contents: contentsRequest
            });
        }))
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
    selectContent(content) {
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
    getMediaUrl(url) {
        return url ? this.mediaService.getFullUrl(url) : '';
    }
    // Helper method to check if video is currently playing
    isVideoPlaying(video) {
        return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
    }
    // Handle play button click
    playVideo(event) {
        event.stopPropagation();
        if (this.videoElement && this.videoElement.nativeElement) {
            const video = this.videoElement.nativeElement;
            if (this.isVideoPlaying(video)) {
                video.pause();
            }
            else {
                video.play();
            }
        }
    }
    // Navigate to next or previous content
    navigateContent(direction) {
        if (!this.selectedContent || this.courseContents.length === 0)
            return;
        const currentIndex = this.courseContents.findIndex(c => c.id === this.selectedContent?.id);
        if (currentIndex === -1)
            return;
        let targetIndex;
        if (direction === 'next') {
            targetIndex = currentIndex + 1 >= this.courseContents.length ? 0 : currentIndex + 1;
        }
        else {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CourseDetailComponent, deps: [{ token: i2.ActivatedRoute }, { token: i2.Router }, { token: i1.CourseService }, { token: i1.MediaService }, { token: i3.MatSnackBar }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: CourseDetailComponent, isStandalone: false, selector: "app-course-detail", viewQueries: [{ propertyName: "videoElement", first: true, predicate: ["videoElement"], descendants: true }], ngImport: i0, template: "<div class=\"course-container\" *ngIf=\"!isLoading && course\">\r\n  <div class=\"course-main\">\r\n    <div class=\"video-container\">\r\n      <div class=\"media-placeholder\" *ngIf=\"selectedContent && selectedContent.mediaId\">\r\n        <!-- Display media based on type -->\r\n        <img *ngIf=\"selectedContent.media && selectedContent.media.type === 'image'\" [src]=\"getMediaUrl(selectedContent.media.url)\" alt=\"Content media\" class=\"content-media\">\r\n        <video #videoElement *ngIf=\"selectedContent.media && selectedContent.media.type === 'video'\" [src]=\"getMediaUrl(selectedContent.media.url)\" controls class=\"content-media\"></video>\r\n        <div class=\"play-button\" *ngIf=\"selectedContent.media && selectedContent.media.type === 'video'\" (click)=\"playVideo($event)\">\r\n          <mat-icon>play_arrow</mat-icon>\r\n        </div>\r\n      </div>\r\n      \r\n      <!-- Display course thumbnail if no content is selected -->\r\n      <div class=\"media-placeholder\" *ngIf=\"(!selectedContent || !selectedContent.mediaId) && course.mediaId && course.media\">\r\n        <img [src]=\"getMediaUrl(course.media.url)\" alt=\"Course thumbnail\" class=\"course-thumbnail\">\r\n      </div>\r\n      \r\n      <!-- Fallback if no media is available -->\r\n      <div class=\"media-placeholder no-media\" *ngIf=\"(!selectedContent || !selectedContent.mediaId) && (!course.mediaId || !course.media)\">\r\n        <mat-icon>image</mat-icon>\r\n        <p>No media available</p>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"course-info\">\r\n      <h1 class=\"course-title\">{{course.title}}</h1>\r\n      <p class=\"lesson-title\" *ngIf=\"selectedContent\">{{selectedContent.title}}</p>\r\n      <p class=\"course-meta\" *ngIf=\"course.category\">\r\n        <span class=\"category\">{{course.category.name}}</span>\r\n        <span class=\"duration\">{{course.duration}} min</span>\r\n        <span class=\"language\" *ngIf=\"course.language\">{{course.language}}</span>\r\n      </p>\r\n      <div class=\"tags-container\" *ngIf=\"course.tags && course.tags.length > 0\">\r\n        <span class=\"tag\" *ngFor=\"let tag of course.tags\">{{tag.name}}</span>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"lesson-content\" *ngIf=\"selectedContent\">\r\n      <h2>{{selectedContent.title}}</h2>\r\n      <div class=\"content-text\" [innerHTML]=\"selectedContent.textContent\"></div>\r\n      <p class=\"duration-info\">\r\n        <mat-icon>schedule</mat-icon> {{selectedContent.duration}} minutes\r\n      </p>\r\n      \r\n      <div class=\"content-navigation\">\r\n        <button mat-button (click)=\"navigateContent('prev')\" color=\"primary\">\r\n          <mat-icon>navigate_before</mat-icon> Previous\r\n        </button>\r\n        <button mat-button (click)=\"navigateContent('next')\" color=\"primary\">\r\n          Next <mat-icon>navigate_next</mat-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    \r\n    <div class=\"course-description\" *ngIf=\"!selectedContent\">\r\n      <h2>About this course</h2>\r\n      <div class=\"description-text\" [innerHTML]=\"course.description\"></div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"course-sidebar\">\r\n    <div class=\"sidebar-header\">\r\n      <h2>Course Content</h2>\r\n      <span class=\"content-count\">{{courseContents.length}} items</span>\r\n    </div>\r\n\r\n    <mat-list class=\"contents-list\">\r\n      <mat-list-item \r\n        *ngFor=\"let content of courseContents\" \r\n        class=\"content-item\"\r\n        [class.active]=\"selectedContent && selectedContent.id === content.id\"\r\n        (click)=\"selectContent(content)\">\r\n        <div class=\"content-item-inner\">\r\n          <div class=\"content-icon\">\r\n            <mat-icon *ngIf=\"content.media && content.media.type === 'video'\">play_circle_outline</mat-icon>\r\n            <mat-icon *ngIf=\"content.media && content.media.type === 'image'\">image</mat-icon>\r\n            <mat-icon *ngIf=\"!content.media\">article</mat-icon>\r\n          </div>\r\n          <div class=\"content-details\">\r\n            <span class=\"content-title\">{{content.title}}</span>\r\n            <span class=\"content-duration\">{{content.duration}} min</span>\r\n          </div>\r\n        </div>\r\n      </mat-list-item>\r\n    </mat-list>\r\n\r\n    <div class=\"action-buttons\">\r\n      <button mat-flat-button color=\"primary\" class=\"back-button\" routerLink=\"/Courses\">\r\n        Back to Courses\r\n      </button>\r\n      <button mat-stroked-button [routerLink]=\"['/Courses/Edit', course.id]\" *ngIf=\"course.id\">\r\n        <mat-icon>edit</mat-icon> Edit Course\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- Loading spinner -->\r\n<div class=\"loading-container\" *ngIf=\"isLoading\">\r\n  <mat-spinner></mat-spinner>\r\n  <p>Loading course...</p>\r\n</div>\r\n\r\n<!-- No course found message -->\r\n<div class=\"not-found-container\" *ngIf=\"!isLoading && !course\">\r\n  <mat-icon class=\"not-found-icon\">error_outline</mat-icon>\r\n  <h2>Course not found</h2>\r\n  <p>The course you're looking for could not be found.</p>\r\n  <button mat-flat-button color=\"primary\" routerLink=\"/Courses\">Back to Courses</button>\r\n</div>", styles: [".course-container{display:grid;grid-template-columns:3fr 1fr;gap:2rem;max-width:1200px;margin:0 auto;padding:2rem}.course-main{display:flex;flex-direction:column;gap:1.5rem}.video-container{position:relative;aspect-ratio:16/9;overflow:hidden;border-radius:.5rem}.video-placeholder{position:relative;width:100%;height:100%}.video-placeholder img{width:100%;height:100%;object-fit:cover}.play-button{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background-color:#0006;cursor:pointer}.play-button mat-icon{font-size:5rem;height:5rem;width:5rem;color:#ffffffb3;transition:color .2s}.play-button:hover mat-icon{color:#fff}.course-title{font-size:2rem;font-weight:700;font-family:Poppins,sans-serif;margin-bottom:.5rem}.lesson-title{color:#0009;font-size:1.1rem}.lesson-content{max-width:100%}.lesson-content h2{font-size:1.5rem;font-weight:600;margin-bottom:1rem;font-family:Poppins,sans-serif}.lesson-content p{margin-bottom:1rem;line-height:1.6}.course-sidebar{display:flex;flex-direction:column;gap:1rem}.sidebar-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem}.sidebar-header h2{font-size:1.5rem;font-weight:600;font-family:Poppins,sans-serif;margin:0}.completion-status{font-size:.875rem;color:#0009}.modules-accordion{border:1px solid rgba(0,0,0,.12);border-radius:.5rem;overflow:hidden}.lesson-item{display:flex;align-items:center;gap:.5rem;height:auto!important;padding:.5rem 0}.completed-icon{color:var(--primary)}.incomplete-icon{color:#0000004d}.lesson-duration{margin-left:auto;font-size:.75rem;color:#0009}.back-button{margin-top:1rem}@media (max-width: 768px){.course-container{grid-template-columns:1fr}}.media-placeholder{position:relative;width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;background-color:#f5f5f5;border-radius:.5rem}.media-placeholder img,.media-placeholder video{width:100%;height:100%;object-fit:cover}.media-placeholder.no-media{flex-direction:column;color:#00000080}.media-placeholder.no-media mat-icon{font-size:3rem;height:3rem;width:3rem;margin-bottom:1rem}.content-media,.course-thumbnail{max-width:100%}.course-info{margin-bottom:1.5rem}.course-meta{display:flex;gap:1rem;color:#0009;margin-top:.5rem}.tags-container{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.5rem}.tag{background-color:#e0e0e0;padding:.25rem .75rem;border-radius:1rem;font-size:.875rem;color:#000000b3}.content-item{cursor:pointer;padding:.75rem 1rem;border-radius:.25rem;transition:background-color .2s;margin-bottom:.5rem}.content-item.active{background-color:#0000000d}.content-item-inner{display:flex;align-items:center;width:100%;gap:1rem}.content-icon mat-icon{color:#0009}.content-details{display:flex;flex-direction:column;flex:1}.content-title{font-weight:500}.content-duration{font-size:.75rem;color:#0009}.contents-list{max-height:60vh;overflow-y:auto;padding:0}.action-buttons{display:flex;flex-direction:column;gap:.5rem;margin-top:1rem}.loading-container{display:flex;flex-direction:column;align-items:center;justify-content:center;height:60vh;gap:1.5rem}.not-found-container{display:flex;flex-direction:column;align-items:center;justify-content:center;height:60vh;gap:1rem;text-align:center}.not-found-icon{font-size:4rem;height:4rem;width:4rem;color:#0006}.course-description,.lesson-content{line-height:1.6}.duration-info{display:flex;align-items:center;gap:.5rem;color:#0009;margin-top:1.5rem}.content-count{font-size:.875rem;color:#0009}.content-navigation{display:flex;justify-content:space-between;margin-top:2rem;padding-top:1rem;border-top:1px solid rgba(0,0,0,.1)}\n"], dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i5$1.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i7.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i12.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }, { kind: "component", type: i8$1.MatList, selector: "mat-list", exportAs: ["matList"] }, { kind: "component", type: i8$1.MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["activated"], exportAs: ["matListItem"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CourseDetailComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-course-detail', standalone: false, template: "<div class=\"course-container\" *ngIf=\"!isLoading && course\">\r\n  <div class=\"course-main\">\r\n    <div class=\"video-container\">\r\n      <div class=\"media-placeholder\" *ngIf=\"selectedContent && selectedContent.mediaId\">\r\n        <!-- Display media based on type -->\r\n        <img *ngIf=\"selectedContent.media && selectedContent.media.type === 'image'\" [src]=\"getMediaUrl(selectedContent.media.url)\" alt=\"Content media\" class=\"content-media\">\r\n        <video #videoElement *ngIf=\"selectedContent.media && selectedContent.media.type === 'video'\" [src]=\"getMediaUrl(selectedContent.media.url)\" controls class=\"content-media\"></video>\r\n        <div class=\"play-button\" *ngIf=\"selectedContent.media && selectedContent.media.type === 'video'\" (click)=\"playVideo($event)\">\r\n          <mat-icon>play_arrow</mat-icon>\r\n        </div>\r\n      </div>\r\n      \r\n      <!-- Display course thumbnail if no content is selected -->\r\n      <div class=\"media-placeholder\" *ngIf=\"(!selectedContent || !selectedContent.mediaId) && course.mediaId && course.media\">\r\n        <img [src]=\"getMediaUrl(course.media.url)\" alt=\"Course thumbnail\" class=\"course-thumbnail\">\r\n      </div>\r\n      \r\n      <!-- Fallback if no media is available -->\r\n      <div class=\"media-placeholder no-media\" *ngIf=\"(!selectedContent || !selectedContent.mediaId) && (!course.mediaId || !course.media)\">\r\n        <mat-icon>image</mat-icon>\r\n        <p>No media available</p>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"course-info\">\r\n      <h1 class=\"course-title\">{{course.title}}</h1>\r\n      <p class=\"lesson-title\" *ngIf=\"selectedContent\">{{selectedContent.title}}</p>\r\n      <p class=\"course-meta\" *ngIf=\"course.category\">\r\n        <span class=\"category\">{{course.category.name}}</span>\r\n        <span class=\"duration\">{{course.duration}} min</span>\r\n        <span class=\"language\" *ngIf=\"course.language\">{{course.language}}</span>\r\n      </p>\r\n      <div class=\"tags-container\" *ngIf=\"course.tags && course.tags.length > 0\">\r\n        <span class=\"tag\" *ngFor=\"let tag of course.tags\">{{tag.name}}</span>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"lesson-content\" *ngIf=\"selectedContent\">\r\n      <h2>{{selectedContent.title}}</h2>\r\n      <div class=\"content-text\" [innerHTML]=\"selectedContent.textContent\"></div>\r\n      <p class=\"duration-info\">\r\n        <mat-icon>schedule</mat-icon> {{selectedContent.duration}} minutes\r\n      </p>\r\n      \r\n      <div class=\"content-navigation\">\r\n        <button mat-button (click)=\"navigateContent('prev')\" color=\"primary\">\r\n          <mat-icon>navigate_before</mat-icon> Previous\r\n        </button>\r\n        <button mat-button (click)=\"navigateContent('next')\" color=\"primary\">\r\n          Next <mat-icon>navigate_next</mat-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    \r\n    <div class=\"course-description\" *ngIf=\"!selectedContent\">\r\n      <h2>About this course</h2>\r\n      <div class=\"description-text\" [innerHTML]=\"course.description\"></div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"course-sidebar\">\r\n    <div class=\"sidebar-header\">\r\n      <h2>Course Content</h2>\r\n      <span class=\"content-count\">{{courseContents.length}} items</span>\r\n    </div>\r\n\r\n    <mat-list class=\"contents-list\">\r\n      <mat-list-item \r\n        *ngFor=\"let content of courseContents\" \r\n        class=\"content-item\"\r\n        [class.active]=\"selectedContent && selectedContent.id === content.id\"\r\n        (click)=\"selectContent(content)\">\r\n        <div class=\"content-item-inner\">\r\n          <div class=\"content-icon\">\r\n            <mat-icon *ngIf=\"content.media && content.media.type === 'video'\">play_circle_outline</mat-icon>\r\n            <mat-icon *ngIf=\"content.media && content.media.type === 'image'\">image</mat-icon>\r\n            <mat-icon *ngIf=\"!content.media\">article</mat-icon>\r\n          </div>\r\n          <div class=\"content-details\">\r\n            <span class=\"content-title\">{{content.title}}</span>\r\n            <span class=\"content-duration\">{{content.duration}} min</span>\r\n          </div>\r\n        </div>\r\n      </mat-list-item>\r\n    </mat-list>\r\n\r\n    <div class=\"action-buttons\">\r\n      <button mat-flat-button color=\"primary\" class=\"back-button\" routerLink=\"/Courses\">\r\n        Back to Courses\r\n      </button>\r\n      <button mat-stroked-button [routerLink]=\"['/Courses/Edit', course.id]\" *ngIf=\"course.id\">\r\n        <mat-icon>edit</mat-icon> Edit Course\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- Loading spinner -->\r\n<div class=\"loading-container\" *ngIf=\"isLoading\">\r\n  <mat-spinner></mat-spinner>\r\n  <p>Loading course...</p>\r\n</div>\r\n\r\n<!-- No course found message -->\r\n<div class=\"not-found-container\" *ngIf=\"!isLoading && !course\">\r\n  <mat-icon class=\"not-found-icon\">error_outline</mat-icon>\r\n  <h2>Course not found</h2>\r\n  <p>The course you're looking for could not be found.</p>\r\n  <button mat-flat-button color=\"primary\" routerLink=\"/Courses\">Back to Courses</button>\r\n</div>", styles: [".course-container{display:grid;grid-template-columns:3fr 1fr;gap:2rem;max-width:1200px;margin:0 auto;padding:2rem}.course-main{display:flex;flex-direction:column;gap:1.5rem}.video-container{position:relative;aspect-ratio:16/9;overflow:hidden;border-radius:.5rem}.video-placeholder{position:relative;width:100%;height:100%}.video-placeholder img{width:100%;height:100%;object-fit:cover}.play-button{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background-color:#0006;cursor:pointer}.play-button mat-icon{font-size:5rem;height:5rem;width:5rem;color:#ffffffb3;transition:color .2s}.play-button:hover mat-icon{color:#fff}.course-title{font-size:2rem;font-weight:700;font-family:Poppins,sans-serif;margin-bottom:.5rem}.lesson-title{color:#0009;font-size:1.1rem}.lesson-content{max-width:100%}.lesson-content h2{font-size:1.5rem;font-weight:600;margin-bottom:1rem;font-family:Poppins,sans-serif}.lesson-content p{margin-bottom:1rem;line-height:1.6}.course-sidebar{display:flex;flex-direction:column;gap:1rem}.sidebar-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem}.sidebar-header h2{font-size:1.5rem;font-weight:600;font-family:Poppins,sans-serif;margin:0}.completion-status{font-size:.875rem;color:#0009}.modules-accordion{border:1px solid rgba(0,0,0,.12);border-radius:.5rem;overflow:hidden}.lesson-item{display:flex;align-items:center;gap:.5rem;height:auto!important;padding:.5rem 0}.completed-icon{color:var(--primary)}.incomplete-icon{color:#0000004d}.lesson-duration{margin-left:auto;font-size:.75rem;color:#0009}.back-button{margin-top:1rem}@media (max-width: 768px){.course-container{grid-template-columns:1fr}}.media-placeholder{position:relative;width:100%;height:100%;overflow:hidden;display:flex;align-items:center;justify-content:center;background-color:#f5f5f5;border-radius:.5rem}.media-placeholder img,.media-placeholder video{width:100%;height:100%;object-fit:cover}.media-placeholder.no-media{flex-direction:column;color:#00000080}.media-placeholder.no-media mat-icon{font-size:3rem;height:3rem;width:3rem;margin-bottom:1rem}.content-media,.course-thumbnail{max-width:100%}.course-info{margin-bottom:1.5rem}.course-meta{display:flex;gap:1rem;color:#0009;margin-top:.5rem}.tags-container{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.5rem}.tag{background-color:#e0e0e0;padding:.25rem .75rem;border-radius:1rem;font-size:.875rem;color:#000000b3}.content-item{cursor:pointer;padding:.75rem 1rem;border-radius:.25rem;transition:background-color .2s;margin-bottom:.5rem}.content-item.active{background-color:#0000000d}.content-item-inner{display:flex;align-items:center;width:100%;gap:1rem}.content-icon mat-icon{color:#0009}.content-details{display:flex;flex-direction:column;flex:1}.content-title{font-weight:500}.content-duration{font-size:.75rem;color:#0009}.contents-list{max-height:60vh;overflow-y:auto;padding:0}.action-buttons{display:flex;flex-direction:column;gap:.5rem;margin-top:1rem}.loading-container{display:flex;flex-direction:column;align-items:center;justify-content:center;height:60vh;gap:1.5rem}.not-found-container{display:flex;flex-direction:column;align-items:center;justify-content:center;height:60vh;gap:1rem;text-align:center}.not-found-icon{font-size:4rem;height:4rem;width:4rem;color:#0006}.course-description,.lesson-content{line-height:1.6}.duration-info{display:flex;align-items:center;gap:.5rem;color:#0009;margin-top:1.5rem}.content-count{font-size:.875rem;color:#0009}.content-navigation{display:flex;justify-content:space-between;margin-top:2rem;padding-top:1rem;border-top:1px solid rgba(0,0,0,.1)}\n"] }]
        }], ctorParameters: () => [{ type: i2.ActivatedRoute }, { type: i2.Router }, { type: i1.CourseService }, { type: i1.MediaService }, { type: i3.MatSnackBar }], propDecorators: { videoElement: [{
                type: ViewChild,
                args: ['videoElement']
            }] } });

class CourseCatalogComponent {
    constructor(courseService, categoryService, tagService, authService, fb, snackBar, router, dialog) {
        this.courseService = courseService;
        this.categoryService = categoryService;
        this.tagService = tagService;
        this.authService = authService;
        this.fb = fb;
        this.snackBar = snackBar;
        this.router = router;
        this.dialog = dialog;
        this.courses = [];
        this.categories = [];
        this.tags = [];
        this.languages = [];
        this.uniqueLanguages = new Set();
        this.isLoading = true;
        // Pagination
        this.totalCourses = 0;
        this.pageSize = 6;
        this.currentPage = 0;
        this.pageSizeOptions = [6, 12, 24, 48];
    }
    ngOnInit() {
        this.initForm();
        this.loadCurrentUser();
        this.loadFilterData();
    }
    initForm() {
        this.searchForm = this.fb.group({
            searchTerm: [''],
            categoryId: [null],
            language: [''],
            tagIds: [[]],
            minPrice: [null],
            maxPrice: [null]
        });
    }
    loadCurrentUser() {
        const user = this.authService.getCurrentUser();
        if (user) {
            this.userRole = user.role || '';
            // Verificar se o usuário tem permissão para acessar esta página
            if (this.userRole !== 'Company') {
                this.snackBar.open('Você não tem permissão para acessar esta página.', 'Fechar', {
                    duration: 3000
                });
                this.router.navigate(['/Dashboard']);
            }
            else {
                this.searchCourses();
            }
        }
        else {
            this.snackBar.open('Você precisa estar logado para acessar esta página.', 'Fechar', {
                duration: 3000
            });
            this.router.navigate(['/Login']);
        }
    }
    loadFilterData() {
        forkJoin({
            categories: this.categoryService.getAll(),
            tags: this.tagService.getAll()
        }).subscribe({
            next: (results) => {
                this.categories = results.categories;
                this.tags = results.tags;
            },
            error: (error) => {
                console.error('Erro ao carregar dados de filtro:', error);
            }
        });
    }
    searchCourses() {
        this.isLoading = true;
        const searchParams = {
            ...this.searchForm.value,
            onlyPublished: true,
            page: this.currentPage + 1, // API usa página 1-indexada
            pageSize: this.pageSize
        };
        this.courseService.searchCourses(searchParams).subscribe({
            next: (result) => {
                this.courses = result.courses;
                this.totalCourses = result.totalCount;
                // Extrair idiomas únicos dos cursos
                this.courses.forEach(course => {
                    if (course.language) {
                        this.uniqueLanguages.add(course.language);
                    }
                });
                this.languages = Array.from(this.uniqueLanguages).sort();
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Erro ao buscar cursos:', error);
                this.snackBar.open('Erro ao buscar cursos. Tente novamente.', 'Fechar', {
                    duration: 3000
                });
                this.isLoading = false;
            }
        });
    }
    onPageChange(event) {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.searchCourses();
    }
    onFilterChange() {
        this.currentPage = 0;
        this.searchCourses();
    }
    resetFilters() {
        this.searchForm.reset({
            searchTerm: '',
            categoryId: null,
            language: '',
            tagIds: [],
            minPrice: null,
            maxPrice: null
        });
        this.currentPage = 0;
        this.searchCourses();
    }
    viewCourse(courseId) {
        this.router.navigate(['/course-details', courseId]);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CourseCatalogComponent, deps: [{ token: i1.CourseService }, { token: i1.CategoryService }, { token: i1.TagService }, { token: i1.AuthService }, { token: i1$1.FormBuilder }, { token: i3.MatSnackBar }, { token: i2.Router }, { token: i1$2.MatDialog }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: CourseCatalogComponent, isStandalone: false, selector: "app-course-catalog", ngImport: i0, template: "<div class=\"catalog-container\">\r\n  <h1>Cat\u00E1logo de Cursos</h1>\r\n  \r\n  <!-- Se\u00E7\u00E3o de Filtros -->\r\n  <div class=\"filter-section\">\r\n    <h2>Filtrar Cursos</h2>\r\n    <form [formGroup]=\"searchForm\" (change)=\"onFilterChange()\">\r\n      <div class=\"filter-form\">\r\n        <!-- Busca por termo -->\r\n        <mat-form-field appearance=\"outline\">\r\n          <mat-label>Buscar cursos</mat-label>\r\n          <input matInput formControlName=\"searchTerm\" placeholder=\"Digite um termo para busca\">\r\n          <mat-icon matPrefix>search</mat-icon>\r\n        </mat-form-field>\r\n        \r\n        <!-- Filtro por categoria -->\r\n        <mat-form-field appearance=\"outline\">\r\n          <mat-label>Categoria</mat-label>\r\n          <mat-select formControlName=\"categoryId\">\r\n            <mat-option [value]=\"null\">Todas as categorias</mat-option>\r\n            <mat-option *ngFor=\"let category of categories\" [value]=\"category.id\">\r\n              {{category.name}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        \r\n        <!-- Filtro por idioma -->\r\n        <mat-form-field appearance=\"outline\">\r\n          <mat-label>Idioma</mat-label>\r\n          <mat-select formControlName=\"language\">\r\n            <mat-option [value]=\"''\">Todos os idiomas</mat-option>\r\n            <mat-option *ngFor=\"let lang of languages\" [value]=\"lang\">\r\n              {{lang}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        \r\n        <!-- Filtro por tags -->\r\n        <mat-form-field appearance=\"outline\">\r\n          <mat-label>Tags</mat-label>\r\n          <mat-select formControlName=\"tagIds\" multiple>\r\n            <mat-option *ngFor=\"let tag of tags\" [value]=\"tag.id\">\r\n              {{tag.name}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        \r\n        <!-- Filtro por pre\u00E7o m\u00EDnimo -->\r\n        <mat-form-field appearance=\"outline\">\r\n          <mat-label>Pre\u00E7o m\u00EDnimo</mat-label>\r\n          <input matInput type=\"number\" min=\"0\" formControlName=\"minPrice\">\r\n          <mat-icon matPrefix>attach_money</mat-icon>\r\n        </mat-form-field>\r\n        \r\n        <!-- Filtro por pre\u00E7o m\u00E1ximo -->\r\n        <mat-form-field appearance=\"outline\">\r\n          <mat-label>Pre\u00E7o m\u00E1ximo</mat-label>\r\n          <input matInput type=\"number\" min=\"0\" formControlName=\"maxPrice\">\r\n          <mat-icon matPrefix>attach_money</mat-icon>\r\n        </mat-form-field>\r\n      </div>\r\n      \r\n      <div class=\"filter-actions\">\r\n        <button mat-stroked-button color=\"warn\" type=\"button\" (click)=\"resetFilters()\">\r\n          <mat-icon>clear</mat-icon>\r\n          Limpar filtros\r\n        </button>\r\n        <button mat-raised-button color=\"primary\" type=\"button\" (click)=\"searchCourses()\">\r\n          <mat-icon>search</mat-icon>\r\n          Buscar\r\n        </button>\r\n      </div>\r\n    </form>\r\n  </div>\r\n  \r\n  <!-- Resultados da Busca -->\r\n  <div class=\"search-results\" *ngIf=\"!isLoading\">\r\n    <h2>Resultados ({{totalCourses}} cursos encontrados)</h2>\r\n    \r\n    <!-- Grid de Cursos -->\r\n    <div class=\"course-grid\" *ngIf=\"courses.length > 0\">\r\n      <mat-card class=\"course-card\" *ngFor=\"let course of courses\">\r\n        <img *ngIf=\"course.media?.url\" mat-card-image [src]=\"course.media?.url\" [alt]=\"course.title\" class=\"course-image\">\r\n        <img *ngIf=\"!course.media?.url\" mat-card-image src=\"assets/images/course-placeholder.jpg\" alt=\"Imagem do curso\" class=\"course-image\">\r\n        \r\n        <mat-card-header>\r\n          <mat-card-title>{{course.title}}</mat-card-title>\r\n          <mat-card-subtitle>{{course.category?.name}}</mat-card-subtitle>\r\n        </mat-card-header>\r\n        \r\n        <mat-card-content>\r\n          <p>{{ (course.description || '') | slice:0:100 }}{{ (course.description?.length || 0) > 100 ? '...' : '' }}</p>\r\n          \r\n          <div class=\"course-details\">\r\n            <div>\r\n              <mat-icon>schedule</mat-icon>\r\n              <span>{{course.duration}} minutos</span>\r\n            </div>\r\n            \r\n            <div *ngIf=\"course.language\">\r\n              <mat-icon>language</mat-icon>\r\n              <span>{{course.language}}</span>\r\n            </div>\r\n          </div>\r\n          \r\n          <div class=\"course-tags\">\r\n            <mat-chip-listbox>\r\n              <mat-chip *ngFor=\"let tag of course.tags\">{{tag.name}}</mat-chip>\r\n            </mat-chip-listbox>\r\n          </div>\r\n          \r\n          <div class=\"course-price\">\r\n            R$ {{course.price | number:'1.2-2'}}\r\n          </div>\r\n        </mat-card-content>\r\n        \r\n        <mat-card-actions>\r\n          <button mat-button color=\"primary\" (click)=\"viewCourse(course.id)\">\r\n            <mat-icon>visibility</mat-icon>\r\n            Ver detalhes\r\n          </button>\r\n        </mat-card-actions>\r\n      </mat-card>\r\n    </div>\r\n    \r\n    <!-- Mensagem de nenhum curso encontrado -->\r\n    <div class=\"no-courses\" *ngIf=\"courses.length === 0\">\r\n      <mat-icon>search_off</mat-icon>\r\n      <h3>Nenhum curso encontrado com os filtros atuais</h3>\r\n      <button mat-stroked-button color=\"primary\" (click)=\"resetFilters()\">\r\n        <mat-icon>refresh</mat-icon>\r\n        Limpar filtros e tentar novamente\r\n      </button>\r\n    </div>\r\n    \r\n    <!-- Pagina\u00E7\u00E3o -->\r\n    <mat-paginator\r\n      [length]=\"totalCourses\"\r\n      [pageSize]=\"pageSize\"\r\n      [pageSizeOptions]=\"pageSizeOptions\"\r\n      [pageIndex]=\"currentPage\"\r\n      (page)=\"onPageChange($event)\"\r\n      *ngIf=\"totalCourses > 0\">\r\n    </mat-paginator>\r\n  </div>\r\n  \r\n  <!-- Indicador de carregamento -->\r\n  <div class=\"loading-container\" *ngIf=\"isLoading\">\r\n    <mat-spinner diameter=\"50\"></mat-spinner>\r\n    <p>Carregando cursos...</p>\r\n  </div>\r\n</div>", styles: [".catalog-container{padding:20px}.filter-section{background-color:#f5f5f5;border-radius:8px;padding:16px;margin-bottom:20px}.filter-form{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}@media (max-width: 960px){.filter-form{grid-template-columns:1fr 1fr}}@media (max-width: 600px){.filter-form{grid-template-columns:1fr}}.filter-actions{display:flex;justify-content:flex-end;margin-top:16px}.course-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;margin-top:20px}.course-card{display:flex;flex-direction:column;height:100%}.course-card .mat-card-content{flex-grow:1}.course-card .course-image{height:180px;object-fit:cover;width:100%}.course-card .course-tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:10px}.course-card .course-price{font-size:1.2rem;font-weight:500;color:#4caf50;margin-top:10px}.course-card .mat-card-actions{margin-top:auto}.loading-overlay{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#ffffffb3;display:flex;align-items:center;justify-content:center;z-index:999}.no-courses{text-align:center;padding:40px 0}.no-courses mat-icon{font-size:48px;height:48px;width:48px;color:#9e9e9e}.no-courses h3{margin-top:16px;color:#616161}\n"], dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.MinValidator, selector: "input[type=number][min][formControlName],input[type=number][min][formControl],input[type=number][min][ngModel]", inputs: ["min"] }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i7$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i7$1.MatLabel, selector: "mat-label" }, { kind: "directive", type: i7$1.MatPrefix, selector: "[matPrefix], [matIconPrefix], [matTextPrefix]", inputs: ["matTextPrefix"] }, { kind: "directive", type: i7$2.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i5$1.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i10.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }, { kind: "directive", type: i10.MatCardActions, selector: "mat-card-actions", inputs: ["align"], exportAs: ["matCardActions"] }, { kind: "directive", type: i10.MatCardContent, selector: "mat-card-content" }, { kind: "component", type: i10.MatCardHeader, selector: "mat-card-header" }, { kind: "directive", type: i10.MatCardImage, selector: "[mat-card-image], [matCardImage]" }, { kind: "directive", type: i10.MatCardSubtitle, selector: "mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]" }, { kind: "directive", type: i10.MatCardTitle, selector: "mat-card-title, [mat-card-title], [matCardTitle]" }, { kind: "component", type: i7.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i12$1.MatPaginator, selector: "mat-paginator", inputs: ["color", "pageIndex", "length", "pageSize", "pageSizeOptions", "hidePageSize", "showFirstLastButtons", "selectConfig", "disabled"], outputs: ["page"], exportAs: ["matPaginator"] }, { kind: "component", type: i11.MatSelect, selector: "mat-select", inputs: ["aria-describedby", "panelClass", "disabled", "disableRipple", "tabIndex", "hideSingleSelectionIndicator", "placeholder", "required", "multiple", "disableOptionCentering", "compareWith", "value", "aria-label", "aria-labelledby", "errorStateMatcher", "typeaheadDebounceInterval", "sortComparator", "id", "panelWidth", "canSelectNullableOptions"], outputs: ["openedChange", "opened", "closed", "selectionChange", "valueChange"], exportAs: ["matSelect"] }, { kind: "component", type: i11.MatOption, selector: "mat-option", inputs: ["value", "id", "disabled"], outputs: ["onSelectionChange"], exportAs: ["matOption"] }, { kind: "component", type: i14.MatChip, selector: "mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]", inputs: ["role", "id", "aria-label", "aria-description", "value", "color", "removable", "highlighted", "disableRipple", "disabled"], outputs: ["removed", "destroyed"], exportAs: ["matChip"] }, { kind: "component", type: i14.MatChipListbox, selector: "mat-chip-listbox", inputs: ["multiple", "aria-orientation", "selectable", "compareWith", "required", "hideSingleSelectionIndicator", "value"], outputs: ["change"] }, { kind: "component", type: i12.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }, { kind: "pipe", type: i5.SlicePipe, name: "slice" }, { kind: "pipe", type: i5.DecimalPipe, name: "number" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CourseCatalogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-course-catalog', standalone: false, template: "<div class=\"catalog-container\">\r\n  <h1>Cat\u00E1logo de Cursos</h1>\r\n  \r\n  <!-- Se\u00E7\u00E3o de Filtros -->\r\n  <div class=\"filter-section\">\r\n    <h2>Filtrar Cursos</h2>\r\n    <form [formGroup]=\"searchForm\" (change)=\"onFilterChange()\">\r\n      <div class=\"filter-form\">\r\n        <!-- Busca por termo -->\r\n        <mat-form-field appearance=\"outline\">\r\n          <mat-label>Buscar cursos</mat-label>\r\n          <input matInput formControlName=\"searchTerm\" placeholder=\"Digite um termo para busca\">\r\n          <mat-icon matPrefix>search</mat-icon>\r\n        </mat-form-field>\r\n        \r\n        <!-- Filtro por categoria -->\r\n        <mat-form-field appearance=\"outline\">\r\n          <mat-label>Categoria</mat-label>\r\n          <mat-select formControlName=\"categoryId\">\r\n            <mat-option [value]=\"null\">Todas as categorias</mat-option>\r\n            <mat-option *ngFor=\"let category of categories\" [value]=\"category.id\">\r\n              {{category.name}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        \r\n        <!-- Filtro por idioma -->\r\n        <mat-form-field appearance=\"outline\">\r\n          <mat-label>Idioma</mat-label>\r\n          <mat-select formControlName=\"language\">\r\n            <mat-option [value]=\"''\">Todos os idiomas</mat-option>\r\n            <mat-option *ngFor=\"let lang of languages\" [value]=\"lang\">\r\n              {{lang}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        \r\n        <!-- Filtro por tags -->\r\n        <mat-form-field appearance=\"outline\">\r\n          <mat-label>Tags</mat-label>\r\n          <mat-select formControlName=\"tagIds\" multiple>\r\n            <mat-option *ngFor=\"let tag of tags\" [value]=\"tag.id\">\r\n              {{tag.name}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        \r\n        <!-- Filtro por pre\u00E7o m\u00EDnimo -->\r\n        <mat-form-field appearance=\"outline\">\r\n          <mat-label>Pre\u00E7o m\u00EDnimo</mat-label>\r\n          <input matInput type=\"number\" min=\"0\" formControlName=\"minPrice\">\r\n          <mat-icon matPrefix>attach_money</mat-icon>\r\n        </mat-form-field>\r\n        \r\n        <!-- Filtro por pre\u00E7o m\u00E1ximo -->\r\n        <mat-form-field appearance=\"outline\">\r\n          <mat-label>Pre\u00E7o m\u00E1ximo</mat-label>\r\n          <input matInput type=\"number\" min=\"0\" formControlName=\"maxPrice\">\r\n          <mat-icon matPrefix>attach_money</mat-icon>\r\n        </mat-form-field>\r\n      </div>\r\n      \r\n      <div class=\"filter-actions\">\r\n        <button mat-stroked-button color=\"warn\" type=\"button\" (click)=\"resetFilters()\">\r\n          <mat-icon>clear</mat-icon>\r\n          Limpar filtros\r\n        </button>\r\n        <button mat-raised-button color=\"primary\" type=\"button\" (click)=\"searchCourses()\">\r\n          <mat-icon>search</mat-icon>\r\n          Buscar\r\n        </button>\r\n      </div>\r\n    </form>\r\n  </div>\r\n  \r\n  <!-- Resultados da Busca -->\r\n  <div class=\"search-results\" *ngIf=\"!isLoading\">\r\n    <h2>Resultados ({{totalCourses}} cursos encontrados)</h2>\r\n    \r\n    <!-- Grid de Cursos -->\r\n    <div class=\"course-grid\" *ngIf=\"courses.length > 0\">\r\n      <mat-card class=\"course-card\" *ngFor=\"let course of courses\">\r\n        <img *ngIf=\"course.media?.url\" mat-card-image [src]=\"course.media?.url\" [alt]=\"course.title\" class=\"course-image\">\r\n        <img *ngIf=\"!course.media?.url\" mat-card-image src=\"assets/images/course-placeholder.jpg\" alt=\"Imagem do curso\" class=\"course-image\">\r\n        \r\n        <mat-card-header>\r\n          <mat-card-title>{{course.title}}</mat-card-title>\r\n          <mat-card-subtitle>{{course.category?.name}}</mat-card-subtitle>\r\n        </mat-card-header>\r\n        \r\n        <mat-card-content>\r\n          <p>{{ (course.description || '') | slice:0:100 }}{{ (course.description?.length || 0) > 100 ? '...' : '' }}</p>\r\n          \r\n          <div class=\"course-details\">\r\n            <div>\r\n              <mat-icon>schedule</mat-icon>\r\n              <span>{{course.duration}} minutos</span>\r\n            </div>\r\n            \r\n            <div *ngIf=\"course.language\">\r\n              <mat-icon>language</mat-icon>\r\n              <span>{{course.language}}</span>\r\n            </div>\r\n          </div>\r\n          \r\n          <div class=\"course-tags\">\r\n            <mat-chip-listbox>\r\n              <mat-chip *ngFor=\"let tag of course.tags\">{{tag.name}}</mat-chip>\r\n            </mat-chip-listbox>\r\n          </div>\r\n          \r\n          <div class=\"course-price\">\r\n            R$ {{course.price | number:'1.2-2'}}\r\n          </div>\r\n        </mat-card-content>\r\n        \r\n        <mat-card-actions>\r\n          <button mat-button color=\"primary\" (click)=\"viewCourse(course.id)\">\r\n            <mat-icon>visibility</mat-icon>\r\n            Ver detalhes\r\n          </button>\r\n        </mat-card-actions>\r\n      </mat-card>\r\n    </div>\r\n    \r\n    <!-- Mensagem de nenhum curso encontrado -->\r\n    <div class=\"no-courses\" *ngIf=\"courses.length === 0\">\r\n      <mat-icon>search_off</mat-icon>\r\n      <h3>Nenhum curso encontrado com os filtros atuais</h3>\r\n      <button mat-stroked-button color=\"primary\" (click)=\"resetFilters()\">\r\n        <mat-icon>refresh</mat-icon>\r\n        Limpar filtros e tentar novamente\r\n      </button>\r\n    </div>\r\n    \r\n    <!-- Pagina\u00E7\u00E3o -->\r\n    <mat-paginator\r\n      [length]=\"totalCourses\"\r\n      [pageSize]=\"pageSize\"\r\n      [pageSizeOptions]=\"pageSizeOptions\"\r\n      [pageIndex]=\"currentPage\"\r\n      (page)=\"onPageChange($event)\"\r\n      *ngIf=\"totalCourses > 0\">\r\n    </mat-paginator>\r\n  </div>\r\n  \r\n  <!-- Indicador de carregamento -->\r\n  <div class=\"loading-container\" *ngIf=\"isLoading\">\r\n    <mat-spinner diameter=\"50\"></mat-spinner>\r\n    <p>Carregando cursos...</p>\r\n  </div>\r\n</div>", styles: [".catalog-container{padding:20px}.filter-section{background-color:#f5f5f5;border-radius:8px;padding:16px;margin-bottom:20px}.filter-form{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}@media (max-width: 960px){.filter-form{grid-template-columns:1fr 1fr}}@media (max-width: 600px){.filter-form{grid-template-columns:1fr}}.filter-actions{display:flex;justify-content:flex-end;margin-top:16px}.course-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;margin-top:20px}.course-card{display:flex;flex-direction:column;height:100%}.course-card .mat-card-content{flex-grow:1}.course-card .course-image{height:180px;object-fit:cover;width:100%}.course-card .course-tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:10px}.course-card .course-price{font-size:1.2rem;font-weight:500;color:#4caf50;margin-top:10px}.course-card .mat-card-actions{margin-top:auto}.loading-overlay{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#ffffffb3;display:flex;align-items:center;justify-content:center;z-index:999}.no-courses{text-align:center;padding:40px 0}.no-courses mat-icon{font-size:48px;height:48px;width:48px;color:#9e9e9e}.no-courses h3{margin-top:16px;color:#616161}\n"] }]
        }], ctorParameters: () => [{ type: i1.CourseService }, { type: i1.CategoryService }, { type: i1.TagService }, { type: i1.AuthService }, { type: i1$1.FormBuilder }, { type: i3.MatSnackBar }, { type: i2.Router }, { type: i1$2.MatDialog }] });

class ConfirmDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    onConfirm() {
        this.dialogRef.close(true);
    }
    onCancel() {
        this.dialogRef.close(false);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: ConfirmDialogComponent, deps: [{ token: i1$2.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: ConfirmDialogComponent, isStandalone: false, selector: "app-confirm-dialog", ngImport: i0, template: "<div mat-dialog-content>\r\n  <h2 mat-dialog-title>{{data.title}}</h2>\r\n  <p>{{data.message}}</p>\r\n</div>\r\n\r\n<div mat-dialog-actions>\r\n  <button mat-button (click)=\"onCancel()\">{{data.cancelText || 'Cancelar'}}</button>\r\n  <button mat-button color=\"primary\" (click)=\"onConfirm()\">{{data.confirmText || 'Confirmar'}}</button>\r\n</div>\r\n", styles: [""], dependencies: [{ kind: "component", type: i5$1.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "directive", type: i1$2.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1$2.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i1$2.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: ConfirmDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-confirm-dialog', standalone: false, template: "<div mat-dialog-content>\r\n  <h2 mat-dialog-title>{{data.title}}</h2>\r\n  <p>{{data.message}}</p>\r\n</div>\r\n\r\n<div mat-dialog-actions>\r\n  <button mat-button (click)=\"onCancel()\">{{data.cancelText || 'Cancelar'}}</button>\r\n  <button mat-button color=\"primary\" (click)=\"onConfirm()\">{{data.confirmText || 'Confirmar'}}</button>\r\n</div>\r\n" }]
        }], ctorParameters: () => [{ type: i1$2.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }] });

class CourseDetailsComponent {
    constructor(courseService, authService, route, router, dialog, snackBar) {
        this.courseService = courseService;
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.isLoading = true;
        this.courseOwned = false;
    }
    ngOnInit() {
        const courseId = this.route.snapshot.paramMap.get('id');
        if (courseId) {
            this.loadCourse(courseId);
        }
        else {
            this.errorMessage = 'ID do curso não especificado';
            this.isLoading = false;
        }
    }
    loadCourse(courseId) {
        this.isLoading = true;
        this.courseService.getCourse(parseInt(courseId)).subscribe({
            next: (course) => {
                this.course = course;
                this.checkCourseOwnership(courseId);
            },
            error: (error) => {
                console.error('Erro ao carregar o curso:', error);
                this.errorMessage = 'Não foi possível carregar o curso. Por favor, tente novamente mais tarde.';
                this.isLoading = false;
            }
        });
    }
    checkCourseOwnership(courseId) {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser && currentUser.companyId) {
            this.courseService.isCourseOwnedByCompany(parseInt(courseId), currentUser.companyId).subscribe({
                next: (owned) => {
                    this.courseOwned = owned;
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error('Erro ao verificar propriedade do curso:', error);
                    this.courseOwned = false;
                    this.isLoading = false;
                }
            });
        }
        else {
            this.courseOwned = false;
            this.isLoading = false;
        }
    }
    purchaseCourse() {
        const currentUser = this.authService.getCurrentUser();
        if (!currentUser || currentUser.role !== 'Company') {
            this.snackBar.open('Você precisa estar logado como empresa para comprar este curso.', 'Fechar', {
                duration: 5000
            });
            return;
        }
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Confirmar Compra',
                message: `Deseja realmente adquirir o curso "${this.course.title}" por R$ ${this.course.price.toFixed(2)}?`,
                confirmText: 'Comprar',
                cancelText: 'Cancelar'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.isLoading = true;
                const courseId = this.course.id || 0;
                const companyId = currentUser.companyId || 0;
                this.courseService.purchaseCourse(courseId, companyId).subscribe({
                    next: (response) => {
                        this.snackBar.open('Curso adquirido com sucesso!', 'Fechar', {
                            duration: 5000
                        });
                        this.courseOwned = true;
                        this.isLoading = false;
                    },
                    error: (error) => {
                        console.error('Erro ao comprar o curso:', error);
                        this.snackBar.open('Ocorreu um erro ao adquirir o curso. Por favor, tente novamente.', 'Fechar', {
                            duration: 5000
                        });
                        this.isLoading = false;
                    }
                });
            }
        });
    }
    goBackToCatalog() {
        this.router.navigate(['/course-catalog']);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CourseDetailsComponent, deps: [{ token: i1.CourseService }, { token: i1.AuthService }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: i1$2.MatDialog }, { token: i3.MatSnackBar }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: CourseDetailsComponent, isStandalone: false, selector: "app-course-details", ngImport: i0, template: "<div class=\"course-details-container\">\r\n  <!-- Bot\u00E3o de Retorno -->\r\n  <div class=\"back-button\">\r\n    <button mat-stroked-button (click)=\"goBackToCatalog()\">\r\n      <mat-icon>arrow_back</mat-icon> Voltar ao Cat\u00E1logo\r\n    </button>\r\n  </div>\r\n\r\n  <!-- Indicador de carregamento -->\r\n  <div *ngIf=\"isLoading\" class=\"loading-container\">\r\n    <mat-spinner diameter=\"50\"></mat-spinner>\r\n    <p>Carregando curso...</p>\r\n  </div>\r\n\r\n  <!-- Mensagem de erro -->\r\n  <div *ngIf=\"!isLoading && errorMessage\" class=\"error-container\">\r\n    <mat-icon color=\"warn\">error</mat-icon>\r\n    <h2>{{errorMessage}}</h2>\r\n    <button mat-raised-button color=\"primary\" (click)=\"goBackToCatalog()\">\r\n      Voltar ao Cat\u00E1logo\r\n    </button>\r\n  </div>\r\n\r\n  <!-- Detalhes do curso -->\r\n  <div *ngIf=\"!isLoading && !errorMessage && course\" class=\"course-content\">\r\n    <div class=\"course-header\">\r\n      <!-- Imagem do curso -->\r\n      <div class=\"course-image\">\r\n        <img *ngIf=\"course.media?.url\" [src]=\"course.media?.url || 'assets/images/course-placeholder.jpg'\" [alt]=\"course.title\">\r\n        <img *ngIf=\"!course.media?.url\" src=\"assets/images/course-placeholder.jpg\" alt=\"Imagem do curso\">\r\n      </div>\r\n\r\n      <!-- Informa\u00E7\u00F5es do cabe\u00E7alho -->\r\n      <div class=\"course-header-info\">\r\n        <h1>{{course.title}}</h1>\r\n        \r\n        <div class=\"course-metadata\">\r\n          <div *ngIf=\"course.category\">\r\n            <mat-icon>category</mat-icon>\r\n            <span>{{course.category.name}}</span>\r\n          </div>\r\n          \r\n          <div *ngIf=\"course.language\">\r\n            <mat-icon>language</mat-icon>\r\n            <span>{{course.language}}</span>\r\n          </div>\r\n          \r\n          <div>\r\n            <mat-icon>schedule</mat-icon>\r\n            <span>{{course.duration}} minutos</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Tags do curso -->\r\n        <div class=\"course-tags\">\r\n          <mat-chip-listbox>\r\n            <mat-chip *ngFor=\"let tag of course.tags\">{{tag.name}}</mat-chip>\r\n          </mat-chip-listbox>\r\n        </div>\r\n\r\n        <!-- Pre\u00E7o e bot\u00E3o de compra -->\r\n        <div class=\"purchase-section\">\r\n          <div class=\"course-price\">\r\n            <span>Pre\u00E7o:</span>\r\n            <h2>R$ {{course.price | number:'1.2-2'}}</h2>\r\n          </div>\r\n\r\n          <div class=\"purchase-actions\">\r\n            <button \r\n              *ngIf=\"!courseOwned\" \r\n              mat-raised-button \r\n              color=\"primary\" \r\n              (click)=\"purchaseCourse()\"\r\n              [disabled]=\"isLoading\">\r\n              <mat-icon>shopping_cart</mat-icon>\r\n              Comprar este curso\r\n            </button>\r\n            \r\n            <div *ngIf=\"courseOwned\" class=\"course-owned\">\r\n              <mat-icon color=\"accent\">check_circle</mat-icon>\r\n              <span>Curso j\u00E1 adquirido</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Descri\u00E7\u00E3o do curso -->\r\n    <mat-card class=\"course-description\">\r\n      <mat-card-header>\r\n        <mat-card-title>Descri\u00E7\u00E3o do Curso</mat-card-title>\r\n      </mat-card-header>\r\n      <mat-card-content>\r\n        <p>{{course.description}}</p>\r\n      </mat-card-content>\r\n    </mat-card>\r\n\r\n    <!-- Conte\u00FAdo do curso -->\r\n    <mat-card *ngIf=\"course.contents && course.contents.length > 0\" class=\"course-content-list\">\r\n      <mat-card-header>\r\n        <mat-card-title>Conte\u00FAdo do Curso</mat-card-title>\r\n      </mat-card-header>\r\n      <mat-card-content>\r\n        <mat-list>\r\n          <mat-list-item *ngFor=\"let content of course.contents; let i = index\">\r\n            <mat-icon mat-list-icon>article</mat-icon>\r\n            <div mat-line>{{i + 1}}. {{content.title}}</div>\r\n            <div mat-line *ngIf=\"content.textContent\">{{content.textContent}}</div>\r\n          </mat-list-item>\r\n        </mat-list>\r\n      </mat-card-content>\r\n    </mat-card>\r\n  </div>\r\n</div>\r\n", styles: [".course-details-container{padding:2rem;max-width:1200px;margin:0 auto}.course-details-container .back-button{margin-bottom:2rem}.course-details-container .loading-container,.course-details-container .error-container{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:300px;text-align:center}.course-details-container .loading-container mat-icon,.course-details-container .error-container mat-icon{font-size:48px;width:48px;height:48px;margin-bottom:1rem}.course-details-container .loading-container h2,.course-details-container .error-container h2{margin-bottom:1.5rem;color:#666}.course-details-container .loading-container p,.course-details-container .error-container p{margin-top:1rem;color:#666}.course-details-container .course-content .course-header{display:flex;margin-bottom:2rem;gap:2rem}@media (max-width: 768px){.course-details-container .course-content .course-header{flex-direction:column}}.course-details-container .course-content .course-header .course-image{flex:0 0 300px}.course-details-container .course-content .course-header .course-image img{width:100%;max-height:300px;object-fit:cover;border-radius:8px;box-shadow:0 4px 6px #0000001a}.course-details-container .course-content .course-header .course-header-info{flex:1}.course-details-container .course-content .course-header .course-header-info h1{margin-top:0;margin-bottom:1rem;color:#333}.course-details-container .course-content .course-header .course-header-info .course-metadata{display:flex;flex-wrap:wrap;gap:1rem;margin-bottom:1rem}.course-details-container .course-content .course-header .course-header-info .course-metadata div{display:flex;align-items:center;color:#666}.course-details-container .course-content .course-header .course-header-info .course-metadata div mat-icon{margin-right:.5rem;color:#555}.course-details-container .course-content .course-header .course-header-info .course-tags{margin-bottom:1.5rem}.course-details-container .course-content .course-header .course-header-info .course-tags mat-chip{margin-right:.5rem;margin-bottom:.5rem}.course-details-container .course-content .course-header .course-header-info .purchase-section{display:flex;justify-content:space-between;align-items:center;margin-top:2rem;padding:1rem;background-color:#f9f9f9;border-radius:8px}@media (max-width: 768px){.course-details-container .course-content .course-header .course-header-info .purchase-section{flex-direction:column;align-items:flex-start;gap:1rem}}.course-details-container .course-content .course-header .course-header-info .purchase-section .course-price span{display:block;font-size:14px;color:#666}.course-details-container .course-content .course-header .course-header-info .purchase-section .course-price h2{margin:0;color:#2e7d32;font-size:1.8rem}.course-details-container .course-content .course-header .course-header-info .purchase-section .purchase-actions button{padding:.75rem 1.5rem}.course-details-container .course-content .course-header .course-header-info .purchase-section .purchase-actions .course-owned{display:flex;align-items:center;color:#1976d2;font-weight:500}.course-details-container .course-content .course-header .course-header-info .purchase-section .purchase-actions .course-owned mat-icon{margin-right:.5rem}.course-details-container .course-content .course-description,.course-details-container .course-content .course-content-list{margin-bottom:2rem}.course-details-container .course-content .course-description mat-card-header,.course-details-container .course-content .course-content-list mat-card-header{margin-bottom:1rem}.course-details-container .course-content .course-description mat-card-content,.course-details-container .course-content .course-content-list mat-card-content{color:#555;line-height:1.6}.course-details-container .course-content .course-content-list mat-list-item{height:auto;padding:1rem 0}.course-details-container .course-content .course-content-list mat-list-item:not(:last-child){border-bottom:1px solid #eee}\n"], dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5$1.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i10.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }, { kind: "directive", type: i10.MatCardContent, selector: "mat-card-content" }, { kind: "component", type: i10.MatCardHeader, selector: "mat-card-header" }, { kind: "directive", type: i10.MatCardTitle, selector: "mat-card-title, [mat-card-title], [matCardTitle]" }, { kind: "component", type: i7.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i14.MatChip, selector: "mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]", inputs: ["role", "id", "aria-label", "aria-description", "value", "color", "removable", "highlighted", "disableRipple", "disabled"], outputs: ["removed", "destroyed"], exportAs: ["matChip"] }, { kind: "component", type: i14.MatChipListbox, selector: "mat-chip-listbox", inputs: ["multiple", "aria-orientation", "selectable", "compareWith", "required", "hideSingleSelectionIndicator", "value"], outputs: ["change"] }, { kind: "component", type: i12.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }, { kind: "component", type: i8$1.MatList, selector: "mat-list", exportAs: ["matList"] }, { kind: "component", type: i8$1.MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["activated"], exportAs: ["matListItem"] }, { kind: "pipe", type: i5.DecimalPipe, name: "number" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CourseDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-course-details', standalone: false, template: "<div class=\"course-details-container\">\r\n  <!-- Bot\u00E3o de Retorno -->\r\n  <div class=\"back-button\">\r\n    <button mat-stroked-button (click)=\"goBackToCatalog()\">\r\n      <mat-icon>arrow_back</mat-icon> Voltar ao Cat\u00E1logo\r\n    </button>\r\n  </div>\r\n\r\n  <!-- Indicador de carregamento -->\r\n  <div *ngIf=\"isLoading\" class=\"loading-container\">\r\n    <mat-spinner diameter=\"50\"></mat-spinner>\r\n    <p>Carregando curso...</p>\r\n  </div>\r\n\r\n  <!-- Mensagem de erro -->\r\n  <div *ngIf=\"!isLoading && errorMessage\" class=\"error-container\">\r\n    <mat-icon color=\"warn\">error</mat-icon>\r\n    <h2>{{errorMessage}}</h2>\r\n    <button mat-raised-button color=\"primary\" (click)=\"goBackToCatalog()\">\r\n      Voltar ao Cat\u00E1logo\r\n    </button>\r\n  </div>\r\n\r\n  <!-- Detalhes do curso -->\r\n  <div *ngIf=\"!isLoading && !errorMessage && course\" class=\"course-content\">\r\n    <div class=\"course-header\">\r\n      <!-- Imagem do curso -->\r\n      <div class=\"course-image\">\r\n        <img *ngIf=\"course.media?.url\" [src]=\"course.media?.url || 'assets/images/course-placeholder.jpg'\" [alt]=\"course.title\">\r\n        <img *ngIf=\"!course.media?.url\" src=\"assets/images/course-placeholder.jpg\" alt=\"Imagem do curso\">\r\n      </div>\r\n\r\n      <!-- Informa\u00E7\u00F5es do cabe\u00E7alho -->\r\n      <div class=\"course-header-info\">\r\n        <h1>{{course.title}}</h1>\r\n        \r\n        <div class=\"course-metadata\">\r\n          <div *ngIf=\"course.category\">\r\n            <mat-icon>category</mat-icon>\r\n            <span>{{course.category.name}}</span>\r\n          </div>\r\n          \r\n          <div *ngIf=\"course.language\">\r\n            <mat-icon>language</mat-icon>\r\n            <span>{{course.language}}</span>\r\n          </div>\r\n          \r\n          <div>\r\n            <mat-icon>schedule</mat-icon>\r\n            <span>{{course.duration}} minutos</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Tags do curso -->\r\n        <div class=\"course-tags\">\r\n          <mat-chip-listbox>\r\n            <mat-chip *ngFor=\"let tag of course.tags\">{{tag.name}}</mat-chip>\r\n          </mat-chip-listbox>\r\n        </div>\r\n\r\n        <!-- Pre\u00E7o e bot\u00E3o de compra -->\r\n        <div class=\"purchase-section\">\r\n          <div class=\"course-price\">\r\n            <span>Pre\u00E7o:</span>\r\n            <h2>R$ {{course.price | number:'1.2-2'}}</h2>\r\n          </div>\r\n\r\n          <div class=\"purchase-actions\">\r\n            <button \r\n              *ngIf=\"!courseOwned\" \r\n              mat-raised-button \r\n              color=\"primary\" \r\n              (click)=\"purchaseCourse()\"\r\n              [disabled]=\"isLoading\">\r\n              <mat-icon>shopping_cart</mat-icon>\r\n              Comprar este curso\r\n            </button>\r\n            \r\n            <div *ngIf=\"courseOwned\" class=\"course-owned\">\r\n              <mat-icon color=\"accent\">check_circle</mat-icon>\r\n              <span>Curso j\u00E1 adquirido</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Descri\u00E7\u00E3o do curso -->\r\n    <mat-card class=\"course-description\">\r\n      <mat-card-header>\r\n        <mat-card-title>Descri\u00E7\u00E3o do Curso</mat-card-title>\r\n      </mat-card-header>\r\n      <mat-card-content>\r\n        <p>{{course.description}}</p>\r\n      </mat-card-content>\r\n    </mat-card>\r\n\r\n    <!-- Conte\u00FAdo do curso -->\r\n    <mat-card *ngIf=\"course.contents && course.contents.length > 0\" class=\"course-content-list\">\r\n      <mat-card-header>\r\n        <mat-card-title>Conte\u00FAdo do Curso</mat-card-title>\r\n      </mat-card-header>\r\n      <mat-card-content>\r\n        <mat-list>\r\n          <mat-list-item *ngFor=\"let content of course.contents; let i = index\">\r\n            <mat-icon mat-list-icon>article</mat-icon>\r\n            <div mat-line>{{i + 1}}. {{content.title}}</div>\r\n            <div mat-line *ngIf=\"content.textContent\">{{content.textContent}}</div>\r\n          </mat-list-item>\r\n        </mat-list>\r\n      </mat-card-content>\r\n    </mat-card>\r\n  </div>\r\n</div>\r\n", styles: [".course-details-container{padding:2rem;max-width:1200px;margin:0 auto}.course-details-container .back-button{margin-bottom:2rem}.course-details-container .loading-container,.course-details-container .error-container{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:300px;text-align:center}.course-details-container .loading-container mat-icon,.course-details-container .error-container mat-icon{font-size:48px;width:48px;height:48px;margin-bottom:1rem}.course-details-container .loading-container h2,.course-details-container .error-container h2{margin-bottom:1.5rem;color:#666}.course-details-container .loading-container p,.course-details-container .error-container p{margin-top:1rem;color:#666}.course-details-container .course-content .course-header{display:flex;margin-bottom:2rem;gap:2rem}@media (max-width: 768px){.course-details-container .course-content .course-header{flex-direction:column}}.course-details-container .course-content .course-header .course-image{flex:0 0 300px}.course-details-container .course-content .course-header .course-image img{width:100%;max-height:300px;object-fit:cover;border-radius:8px;box-shadow:0 4px 6px #0000001a}.course-details-container .course-content .course-header .course-header-info{flex:1}.course-details-container .course-content .course-header .course-header-info h1{margin-top:0;margin-bottom:1rem;color:#333}.course-details-container .course-content .course-header .course-header-info .course-metadata{display:flex;flex-wrap:wrap;gap:1rem;margin-bottom:1rem}.course-details-container .course-content .course-header .course-header-info .course-metadata div{display:flex;align-items:center;color:#666}.course-details-container .course-content .course-header .course-header-info .course-metadata div mat-icon{margin-right:.5rem;color:#555}.course-details-container .course-content .course-header .course-header-info .course-tags{margin-bottom:1.5rem}.course-details-container .course-content .course-header .course-header-info .course-tags mat-chip{margin-right:.5rem;margin-bottom:.5rem}.course-details-container .course-content .course-header .course-header-info .purchase-section{display:flex;justify-content:space-between;align-items:center;margin-top:2rem;padding:1rem;background-color:#f9f9f9;border-radius:8px}@media (max-width: 768px){.course-details-container .course-content .course-header .course-header-info .purchase-section{flex-direction:column;align-items:flex-start;gap:1rem}}.course-details-container .course-content .course-header .course-header-info .purchase-section .course-price span{display:block;font-size:14px;color:#666}.course-details-container .course-content .course-header .course-header-info .purchase-section .course-price h2{margin:0;color:#2e7d32;font-size:1.8rem}.course-details-container .course-content .course-header .course-header-info .purchase-section .purchase-actions button{padding:.75rem 1.5rem}.course-details-container .course-content .course-header .course-header-info .purchase-section .purchase-actions .course-owned{display:flex;align-items:center;color:#1976d2;font-weight:500}.course-details-container .course-content .course-header .course-header-info .purchase-section .purchase-actions .course-owned mat-icon{margin-right:.5rem}.course-details-container .course-content .course-description,.course-details-container .course-content .course-content-list{margin-bottom:2rem}.course-details-container .course-content .course-description mat-card-header,.course-details-container .course-content .course-content-list mat-card-header{margin-bottom:1rem}.course-details-container .course-content .course-description mat-card-content,.course-details-container .course-content .course-content-list mat-card-content{color:#555;line-height:1.6}.course-details-container .course-content .course-content-list mat-list-item{height:auto;padding:1rem 0}.course-details-container .course-content .course-content-list mat-list-item:not(:last-child){border-bottom:1px solid #eee}\n"] }]
        }], ctorParameters: () => [{ type: i1.CourseService }, { type: i1.AuthService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i1$2.MatDialog }, { type: i3.MatSnackBar }] });

const routes = [
    { path: '', component: CoursesListComponent },
    { path: 'create', component: CourseCreateComponent },
    { path: 'edit/:courseId', component: CourseCreateComponent },
    { path: 'detail/:courseId', component: CourseDetailComponent },
    { path: 'catalog', component: CourseCatalogComponent },
    { path: 'details/:id', component: CourseDetailsComponent }
];
class CoursesModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CoursesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: CoursesModule, declarations: [CoursesListComponent,
            CourseCreateComponent,
            CourseDetailComponent,
            CourseCatalogComponent,
            CourseDetailsComponent,
            ConfirmDialogComponent], imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule,
            DragDropModule, i2.RouterModule, MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatCardModule,
            MatIconModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatDialogModule,
            MatSelectModule,
            MatChipsModule,
            MatTabsModule,
            MatStepperModule,
            MatProgressSpinnerModule,
            MatMenuModule,
            MatListModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CoursesModule, imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule,
            DragDropModule,
            RouterModule.forChild(routes),
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatCardModule,
            MatIconModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatDialogModule,
            MatSelectModule,
            MatChipsModule,
            MatTabsModule,
            MatStepperModule,
            MatProgressSpinnerModule,
            MatMenuModule,
            MatListModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CoursesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        CoursesListComponent,
                        CourseCreateComponent,
                        CourseDetailComponent,
                        CourseCatalogComponent,
                        CourseDetailsComponent,
                        ConfirmDialogComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        HttpClientModule,
                        DragDropModule,
                        RouterModule.forChild(routes),
                        MatFormFieldModule,
                        MatInputModule,
                        MatButtonModule,
                        MatCardModule,
                        MatIconModule,
                        MatTableModule,
                        MatPaginatorModule,
                        MatSortModule,
                        MatDialogModule,
                        MatSelectModule,
                        MatChipsModule,
                        MatTabsModule,
                        MatStepperModule,
                        MatProgressSpinnerModule,
                        MatMenuModule,
                        MatListModule
                    ]
                }]
        }] });

/*
 * Public API Surface of mfe-courses
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CoursesModule };
//# sourceMappingURL=mfe-courses.mjs.map
