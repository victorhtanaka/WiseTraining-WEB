import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'shared-lib';
import { UserService } from 'shared-lib';
import * as i0 from "@angular/core";
export declare class UserFormDialogComponent implements OnInit {
    private fb;
    private userService;
    private snackBar;
    dialogRef: MatDialogRef<UserFormDialogComponent>;
    data: User;
    userForm: FormGroup;
    isEditMode: boolean;
    constructor(fb: FormBuilder, userService: UserService, snackBar: MatSnackBar, dialogRef: MatDialogRef<UserFormDialogComponent>, data: User);
    ngOnInit(): void;
    initForm(): void;
    onSubmit(): void;
    onCancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserFormDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserFormDialogComponent, "app-user-form-dialog", never, {}, {}, never, never, false, never>;
}
