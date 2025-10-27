import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'shared-lib';
import { UserService } from 'shared-lib';
import * as i0 from "@angular/core";
export declare class RegisterComponent {
    private readonly fb;
    private readonly userService;
    private readonly router;
    private readonly authService;
    registerForm: FormGroup;
    constructor(fb: FormBuilder, userService: UserService, router: Router, authService: AuthService);
    onSubmit(): void;
    getUsernameError(): string | null;
    getPasswordError(): string | null;
    onGoogleLogin(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RegisterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RegisterComponent, "app-register", never, {}, {}, never, never, false, never>;
}
