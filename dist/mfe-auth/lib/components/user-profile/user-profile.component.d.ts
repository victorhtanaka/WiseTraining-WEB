import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'shared-lib';
import { UserService } from 'shared-lib';
import * as i0 from "@angular/core";
export declare class UserProfileComponent implements OnInit {
    private fb;
    private userService;
    private snackBar;
    profileForm: FormGroup;
    user: User | null;
    isLoading: boolean;
    constructor(fb: FormBuilder, userService: UserService, snackBar: MatSnackBar);
    ngOnInit(): void;
    initForm(): void;
    loadUserProfile(): void;
    onSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserProfileComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserProfileComponent, "app-user-profile", never, {}, {}, never, never, false, never>;
}
