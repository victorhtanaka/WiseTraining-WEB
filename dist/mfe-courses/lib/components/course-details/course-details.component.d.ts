import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from 'shared-lib';
import { CourseService } from 'shared-lib';
import { AuthService } from 'shared-lib';
import * as i0 from "@angular/core";
export declare class CourseDetailsComponent implements OnInit {
    private courseService;
    private authService;
    private route;
    private router;
    private dialog;
    private snackBar;
    course: Course;
    isLoading: boolean;
    courseOwned: boolean;
    errorMessage: string;
    constructor(courseService: CourseService, authService: AuthService, route: ActivatedRoute, router: Router, dialog: MatDialog, snackBar: MatSnackBar);
    ngOnInit(): void;
    loadCourse(courseId: string): void;
    checkCourseOwnership(courseId: string): void;
    purchaseCourse(): void;
    goBackToCatalog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CourseDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CourseDetailsComponent, "app-course-details", never, {}, {}, never, never, false, never>;
}
