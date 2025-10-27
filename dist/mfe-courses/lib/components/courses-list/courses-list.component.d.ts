import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from 'shared-lib';
import { CourseService } from 'shared-lib';
import { MediaService } from 'shared-lib';
import * as i0 from "@angular/core";
export declare class CoursesListComponent implements OnInit {
    private courseService;
    private mediaService;
    private router;
    private snackBar;
    displayedColumns: string[];
    courses: Course[];
    isLoading: boolean;
    constructor(courseService: CourseService, mediaService: MediaService, router: Router, snackBar: MatSnackBar);
    ngOnInit(): void;
    loadCourses(): void;
    getMediaUrl(course: Course): string;
    createDefaultCourse(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CoursesListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CoursesListComponent, "app-courses-list", never, {}, {}, never, never, false, never>;
}
