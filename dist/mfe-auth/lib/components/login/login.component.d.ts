import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'shared-lib';
import { UserService } from 'shared-lib';
import * as i0 from "@angular/core";
export declare class LoginComponent {
    private readonly fb;
    private readonly userService;
    private readonly router;
    private readonly authService;
    loading: boolean;
    loginForm: FormGroup;
    constructor(fb: FormBuilder, userService: UserService, router: Router, authService: AuthService);
    onSubmit(): void;
    getEmailError(): string | null;
    getPasswordError(): string | null;
    onGoogleLogin(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoginComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoginComponent, "app-login", never, {}, {}, never, never, false, never>;
}
