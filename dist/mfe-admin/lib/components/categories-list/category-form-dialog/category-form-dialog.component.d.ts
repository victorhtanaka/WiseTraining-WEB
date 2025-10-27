import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'shared-lib';
import { CategoryService } from 'shared-lib';
import * as i0 from "@angular/core";
export declare class CategoryFormDialogComponent implements OnInit {
    private fb;
    private categoryService;
    private snackBar;
    dialogRef: MatDialogRef<CategoryFormDialogComponent>;
    data: Category;
    categoryForm: FormGroup;
    isEditMode: boolean;
    constructor(fb: FormBuilder, categoryService: CategoryService, snackBar: MatSnackBar, dialogRef: MatDialogRef<CategoryFormDialogComponent>, data: Category);
    ngOnInit(): void;
    initForm(): void;
    onSubmit(): void;
    onCancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CategoryFormDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CategoryFormDialogComponent, "app-category-form-dialog", never, {}, {}, never, never, false, never>;
}
