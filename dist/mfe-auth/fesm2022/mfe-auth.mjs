import * as i0 from '@angular/core';
import { Component, NgModule } from '@angular/core';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i1 from '@angular/forms';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import * as i5 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i6$1 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i6 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i7 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i8 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import * as i8$1 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i2 from 'shared-lib';
import * as i3$1 from '@angular/material/snack-bar';

class LoginComponent {
    constructor(fb, userService, router, authService) {
        this.fb = fb;
        this.userService = userService;
        this.router = router;
        this.authService = authService;
        this.loading = false;
        this.loginForm = this.fb.group({
            email: this.fb.control('', [
                Validators.required,
                Validators.email
            ]),
            passwordHash: this.fb.control('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(30)
            ])
        });
    }
    onSubmit() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        this.userService.login(this.loginForm.value).subscribe({
            next: (res) => {
                this.authService.authenticate(res.token);
                this.router.navigate(['/Dashboard']);
            }
        });
    }
    getEmailError() {
        const control = this.loginForm.get('email');
        if (control?.hasError('required'))
            return 'Email é obrigatório';
        if (control?.hasError('email'))
            return 'Email inválido';
        return null;
    }
    getPasswordError() {
        const control = this.loginForm.get('passwordHash');
        if (control?.hasError('required'))
            return 'A senha é obrigatória';
        if (control?.hasError('minlength'))
            return 'Mínimo de 8 caracteres';
        if (control?.hasError('maxlength'))
            return 'Máximo de 30 caracteres';
        return null;
    }
    onGoogleLogin() {
        this.authService.getFirebaseToken().then(token => {
            if (token) {
                this.userService.loginGoogle(token).subscribe((res) => {
                    this.authService.authenticate(res.token);
                    this.router.navigate(['/Dashboard']);
                });
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: LoginComponent, deps: [{ token: i1.FormBuilder }, { token: i2.UserService }, { token: i3.Router }, { token: i2.AuthService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: LoginComponent, isStandalone: false, selector: "app-login", ngImport: i0, template: "<div class=\"gradient-line\"></div>\r\n<div class=\"login-container\">\r\n    <div class=\"login-card\">\r\n        <div class=\"login-header\">\r\n            <h1>Welcome Back</h1>\r\n            <p class=\"subtitle\">Sign in to your WiseTraining account</p>\r\n        </div>\r\n        <form (ngSubmit)=\"onSubmit()\" class=\"form\" [formGroup]=\"loginForm\">\r\n            <mat-form-field appearance=\"outline\">\r\n                <mat-label>Email</mat-label>\r\n                <input type=\"text\" matInput formControlName=\"email\">\r\n                <mat-icon matSuffix>email</mat-icon>\r\n                <mat-error *ngIf=\"getEmailError()\">{{ getEmailError() }}</mat-error>\r\n            </mat-form-field>\r\n\r\n            <mat-form-field appearance=\"outline\">\r\n                <mat-label>Password</mat-label>\r\n                <input type=\"password\" matInput formControlName=\"passwordHash\">\r\n                <mat-icon matSuffix>lock</mat-icon>\r\n                <mat-error *ngIf=\"getPasswordError()\">{{ getPasswordError() }}</mat-error>\r\n            </mat-form-field>\r\n            \r\n            <div class=\"form-actions\">\r\n                <button type=\"submit\" mat-flat-button color=\"primary\">Sign In</button>\r\n                <a routerLink=\"/\" class=\"back-link\">Back to Home</a>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>", styles: [".form{display:flex;width:100%;flex-direction:column;gap:1.25rem}.login-container{display:flex;justify-content:center;align-items:center;min-height:100vh;background-color:#f9f9fb}.login-card{background:#fff;border-radius:12px;box-shadow:0 8px 24px #0000001a;width:100%;max-width:450px;padding:2.5rem;margin:2rem}.login-header{text-align:center;margin-bottom:2rem}.login-header h1{font-size:2.5rem;font-weight:600;margin-bottom:.5rem;background:linear-gradient(90deg,#f0be6e,#5e57c7 61%,#7f30b8);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}.login-header .subtitle{color:#6b7280;font-size:1rem}.form-actions{display:flex;flex-direction:column;align-items:center;gap:1rem;margin-top:1rem}.form-actions button{width:100%;padding:.75rem;font-size:1rem;font-weight:500;background:linear-gradient(90deg,#5e57c7,#7f30b8)}.form-actions .back-link{color:#6b7280;text-decoration:none;font-size:.9rem}.form-actions .back-link:hover{text-decoration:underline}.gradient-line{width:100%;height:4px;position:fixed;background:linear-gradient(90deg,#f0be6e,#5e57c7 61%,#7f30b8)}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i3.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i5.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "directive", type: i6.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i6.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i8.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: LoginComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-login', standalone: false, template: "<div class=\"gradient-line\"></div>\r\n<div class=\"login-container\">\r\n    <div class=\"login-card\">\r\n        <div class=\"login-header\">\r\n            <h1>Welcome Back</h1>\r\n            <p class=\"subtitle\">Sign in to your WiseTraining account</p>\r\n        </div>\r\n        <form (ngSubmit)=\"onSubmit()\" class=\"form\" [formGroup]=\"loginForm\">\r\n            <mat-form-field appearance=\"outline\">\r\n                <mat-label>Email</mat-label>\r\n                <input type=\"text\" matInput formControlName=\"email\">\r\n                <mat-icon matSuffix>email</mat-icon>\r\n                <mat-error *ngIf=\"getEmailError()\">{{ getEmailError() }}</mat-error>\r\n            </mat-form-field>\r\n\r\n            <mat-form-field appearance=\"outline\">\r\n                <mat-label>Password</mat-label>\r\n                <input type=\"password\" matInput formControlName=\"passwordHash\">\r\n                <mat-icon matSuffix>lock</mat-icon>\r\n                <mat-error *ngIf=\"getPasswordError()\">{{ getPasswordError() }}</mat-error>\r\n            </mat-form-field>\r\n            \r\n            <div class=\"form-actions\">\r\n                <button type=\"submit\" mat-flat-button color=\"primary\">Sign In</button>\r\n                <a routerLink=\"/\" class=\"back-link\">Back to Home</a>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>", styles: [".form{display:flex;width:100%;flex-direction:column;gap:1.25rem}.login-container{display:flex;justify-content:center;align-items:center;min-height:100vh;background-color:#f9f9fb}.login-card{background:#fff;border-radius:12px;box-shadow:0 8px 24px #0000001a;width:100%;max-width:450px;padding:2.5rem;margin:2rem}.login-header{text-align:center;margin-bottom:2rem}.login-header h1{font-size:2.5rem;font-weight:600;margin-bottom:.5rem;background:linear-gradient(90deg,#f0be6e,#5e57c7 61%,#7f30b8);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}.login-header .subtitle{color:#6b7280;font-size:1rem}.form-actions{display:flex;flex-direction:column;align-items:center;gap:1rem;margin-top:1rem}.form-actions button{width:100%;padding:.75rem;font-size:1rem;font-weight:500;background:linear-gradient(90deg,#5e57c7,#7f30b8)}.form-actions .back-link{color:#6b7280;text-decoration:none;font-size:.9rem}.form-actions .back-link:hover{text-decoration:underline}.gradient-line{width:100%;height:4px;position:fixed;background:linear-gradient(90deg,#f0be6e,#5e57c7 61%,#7f30b8)}\n"] }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }, { type: i2.UserService }, { type: i3.Router }, { type: i2.AuthService }] });

class RegisterComponent {
    constructor(fb, userService, router, authService) {
        this.fb = fb;
        this.userService = userService;
        this.router = router;
        this.authService = authService;
        this.registerForm = this.fb.group({
            fullName: this.fb.control('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(15),
                /* Validators.pattern(/^\w+$/) */
            ]),
            passwordHash: this.fb.control('', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(30),
                /* Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) */
            ]),
            email: this.fb.control('', [
                Validators.required,
                Validators.maxLength(30)
            ])
        });
    }
    onSubmit() {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }
        this.userService.register(this.registerForm.value, false).subscribe((res) => {
            this.authService.authenticate(res.token);
            this.router.navigate(['/Dashboard']);
        });
    }
    getUsernameError() {
        const control = this.registerForm.get('fullName');
        if (control?.hasError('required'))
            return 'Nome de usuário é obrigatório';
        if (control?.hasError('minlength'))
            return 'Mínimo 3 caracteres';
        if (control?.hasError('maxlength'))
            return 'Máximo de 15 caracteres';
        return null;
    }
    getPasswordError() {
        const control = this.registerForm.get('passwordHash');
        if (control?.hasError('required'))
            return 'Senha é obrigatória';
        if (control?.hasError('minlength'))
            return 'Mínimo 8 caracteres';
        if (control?.hasError('maxlength'))
            return 'Máximo de 30 caracteres';
        return null;
    }
    onGoogleLogin() {
        this.authService.getFirebaseToken().then(token => {
            if (token) {
                this.userService.loginGoogle(token).subscribe((res) => {
                    this.authService.authenticate(res.token);
                    this.router.navigate(['/']);
                });
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: RegisterComponent, deps: [{ token: i1.FormBuilder }, { token: i2.UserService }, { token: i3.Router }, { token: i2.AuthService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: RegisterComponent, isStandalone: false, selector: "app-register", ngImport: i0, template: "<div class=\"register\">\r\n    <div class=\"register-container\">\r\n        <div class=\"register-left\">\r\n            <div class=\"register-header\">\r\n                <span class=\"fs-2 fw-medium\">Cadastrar Empresa</span>\r\n                <h3 class=\"fs-6\" style=\"color: rgb(140, 140, 140);\">Preencha suas informa\u00E7\u00F5es para criar uma conta</h3>\r\n            </div>\r\n            <form class=\"register-form\" (ngSubmit)=\"onSubmit()\" [formGroup]=\"registerForm\">\r\n                <mat-form-field>\r\n                    <mat-label>Nome de usu\u00E1rio</mat-label>\r\n                    <input type=\"text\" matInput formControlName=\"fullName\">\r\n                    <mat-error *ngIf=\"getUsernameError()\">{{ getUsernameError() }}</mat-error>\r\n                </mat-form-field>\r\n                <mat-form-field>\r\n                    <mat-label>Email</mat-label>\r\n                    <input type=\"email\" matInput formControlName=\"email\">\r\n                </mat-form-field>\r\n                <mat-form-field>\r\n                    <mat-label>Senha</mat-label>\r\n                    <input type=\"password\" matInput formControlName=\"passwordHash\" placeholder=\"Ex. pat@example.com\">\r\n                    <mat-error *ngIf=\"getPasswordError()\">{{ getPasswordError() }}</mat-error>\r\n                </mat-form-field>\r\n                <mat-checkbox>Li e concordo com os termos e condi\u00E7\u00F5es</mat-checkbox>\r\n                <button type=\"submit\" mat-stroked-button style=\"background-color: var(--primary-color); color: white;\">Criar conta</button>\r\n            </form>\r\n        </div>\r\n        <div class=\"register-image\">\r\n            <img src=\"assets/images/register-company.jpg\" alt=\"Register Image\">\r\n\r\n        </div>\r\n    </div>\r\n</div>", styles: [".register{background-color:var(--background-color);display:flex;justify-content:center;align-items:center;width:100%;height:100vh}.register-container{display:flex;align-items:center;justify-content:center;width:80vw;height:85vh;box-shadow:0 2px 10px #0000001a;background-color:#fff;border-radius:8px}.register-left{display:flex;flex-direction:column;justify-content:center;height:100%;width:60%;background-color:#fff;padding:30px;border-radius:8px}.register-form{display:flex;flex-direction:column;gap:16px;width:20rem}.register-image{flex:1;height:100%;display:flex;justify-content:center;align-items:center;background-color:var(--primary-color);border-top-right-radius:8px;border-bottom-right-radius:8px}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i5.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "directive", type: i6.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i8$1.MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "aria-expanded", "aria-controls", "aria-owns", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "disabledInteractive", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: RegisterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-register', standalone: false, template: "<div class=\"register\">\r\n    <div class=\"register-container\">\r\n        <div class=\"register-left\">\r\n            <div class=\"register-header\">\r\n                <span class=\"fs-2 fw-medium\">Cadastrar Empresa</span>\r\n                <h3 class=\"fs-6\" style=\"color: rgb(140, 140, 140);\">Preencha suas informa\u00E7\u00F5es para criar uma conta</h3>\r\n            </div>\r\n            <form class=\"register-form\" (ngSubmit)=\"onSubmit()\" [formGroup]=\"registerForm\">\r\n                <mat-form-field>\r\n                    <mat-label>Nome de usu\u00E1rio</mat-label>\r\n                    <input type=\"text\" matInput formControlName=\"fullName\">\r\n                    <mat-error *ngIf=\"getUsernameError()\">{{ getUsernameError() }}</mat-error>\r\n                </mat-form-field>\r\n                <mat-form-field>\r\n                    <mat-label>Email</mat-label>\r\n                    <input type=\"email\" matInput formControlName=\"email\">\r\n                </mat-form-field>\r\n                <mat-form-field>\r\n                    <mat-label>Senha</mat-label>\r\n                    <input type=\"password\" matInput formControlName=\"passwordHash\" placeholder=\"Ex. pat@example.com\">\r\n                    <mat-error *ngIf=\"getPasswordError()\">{{ getPasswordError() }}</mat-error>\r\n                </mat-form-field>\r\n                <mat-checkbox>Li e concordo com os termos e condi\u00E7\u00F5es</mat-checkbox>\r\n                <button type=\"submit\" mat-stroked-button style=\"background-color: var(--primary-color); color: white;\">Criar conta</button>\r\n            </form>\r\n        </div>\r\n        <div class=\"register-image\">\r\n            <img src=\"assets/images/register-company.jpg\" alt=\"Register Image\">\r\n\r\n        </div>\r\n    </div>\r\n</div>", styles: [".register{background-color:var(--background-color);display:flex;justify-content:center;align-items:center;width:100%;height:100vh}.register-container{display:flex;align-items:center;justify-content:center;width:80vw;height:85vh;box-shadow:0 2px 10px #0000001a;background-color:#fff;border-radius:8px}.register-left{display:flex;flex-direction:column;justify-content:center;height:100%;width:60%;background-color:#fff;padding:30px;border-radius:8px}.register-form{display:flex;flex-direction:column;gap:16px;width:20rem}.register-image{flex:1;height:100%;display:flex;justify-content:center;align-items:center;background-color:var(--primary-color);border-top-right-radius:8px;border-bottom-right-radius:8px}\n"] }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }, { type: i2.UserService }, { type: i3.Router }, { type: i2.AuthService }] });

class UserProfileComponent {
    constructor(fb, userService, snackBar) {
        this.fb = fb;
        this.userService = userService;
        this.snackBar = snackBar;
        this.user = null;
        this.isLoading = false;
    }
    ngOnInit() {
        this.initForm();
        this.loadUserProfile();
    }
    initForm() {
        this.profileForm = this.fb.group({
            id: [0],
            email: [{ value: '', disabled: true }],
            fullName: ['', [Validators.required, Validators.maxLength(100)]],
            passwordHash: ['']
        });
    }
    loadUserProfile() {
        this.isLoading = true;
        this.userService.getAuthenticatedUser().subscribe({
            next: (user) => {
                this.user = user;
                this.profileForm.patchValue({
                    id: user.id,
                    email: user.email,
                    fullName: user.fullName
                });
                this.isLoading = false;
            },
            error: (error) => {
                this.snackBar.open('Error loading profile: ' + error.message, 'Close', {
                    duration: 3000
                });
                this.isLoading = false;
            }
        });
    }
    onSubmit() {
        if (this.profileForm.valid) {
            this.isLoading = true;
            const userData = {
                ...this.profileForm.getRawValue(),
                email: this.profileForm.get('email')?.value
            };
            this.userService.put(userData).subscribe({
                next: () => {
                    this.snackBar.open('Profile updated successfully!', 'Close', {
                        duration: 3000
                    });
                    this.isLoading = false;
                },
                error: (error) => {
                    this.snackBar.open('Error updating profile: ' + error.message, 'Close', {
                        duration: 3000
                    });
                    this.isLoading = false;
                }
            });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: UserProfileComponent, deps: [{ token: i1.FormBuilder }, { token: i2.UserService }, { token: i3$1.MatSnackBar }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: UserProfileComponent, isStandalone: false, selector: "app-user-profile", ngImport: i0, template: "<div class=\"container\">\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>My Profile</mat-card-title>\r\n    </mat-card-header>\r\n\r\n    <mat-card-content>\r\n      <form [formGroup]=\"profileForm\" (ngSubmit)=\"onSubmit()\">\r\n        <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n          <mat-label>Email</mat-label>\r\n          <input matInput formControlName=\"email\" type=\"email\" readonly>\r\n        </mat-form-field>\r\n\r\n        <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n          <mat-label>Full Name</mat-label>\r\n          <input matInput formControlName=\"fullName\" type=\"text\">\r\n          <mat-error *ngIf=\"profileForm.get('fullName')?.hasError('required')\">\r\n            Full Name is required\r\n          </mat-error>\r\n          <mat-error *ngIf=\"profileForm.get('fullName')?.hasError('maxlength')\">\r\n            Full Name must not exceed 100 characters\r\n          </mat-error>\r\n        </mat-form-field>\r\n\r\n        <div class=\"button-row\">\r\n          <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!profileForm.valid || isLoading\">\r\n            <mat-icon>save</mat-icon>\r\n            Update Profile\r\n          </button>\r\n        </div>\r\n      </form>\r\n    </mat-card-content>\r\n  </mat-card>\r\n</div>\r\n", styles: [".container{max-width:800px;margin:2rem auto;padding:1rem}.full-width{width:100%;margin-bottom:1rem}.button-row{display:flex;justify-content:flex-end;margin-top:1rem}mat-card{padding:2rem}mat-card-title{font-size:1.5rem;margin-bottom:1rem}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i5.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i6$1.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }, { kind: "directive", type: i6$1.MatCardContent, selector: "mat-card-content" }, { kind: "component", type: i6$1.MatCardHeader, selector: "mat-card-header" }, { kind: "directive", type: i6$1.MatCardTitle, selector: "mat-card-title, [mat-card-title], [matCardTitle]" }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "directive", type: i6.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i8.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: UserProfileComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-user-profile', standalone: false, template: "<div class=\"container\">\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>My Profile</mat-card-title>\r\n    </mat-card-header>\r\n\r\n    <mat-card-content>\r\n      <form [formGroup]=\"profileForm\" (ngSubmit)=\"onSubmit()\">\r\n        <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n          <mat-label>Email</mat-label>\r\n          <input matInput formControlName=\"email\" type=\"email\" readonly>\r\n        </mat-form-field>\r\n\r\n        <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n          <mat-label>Full Name</mat-label>\r\n          <input matInput formControlName=\"fullName\" type=\"text\">\r\n          <mat-error *ngIf=\"profileForm.get('fullName')?.hasError('required')\">\r\n            Full Name is required\r\n          </mat-error>\r\n          <mat-error *ngIf=\"profileForm.get('fullName')?.hasError('maxlength')\">\r\n            Full Name must not exceed 100 characters\r\n          </mat-error>\r\n        </mat-form-field>\r\n\r\n        <div class=\"button-row\">\r\n          <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!profileForm.valid || isLoading\">\r\n            <mat-icon>save</mat-icon>\r\n            Update Profile\r\n          </button>\r\n        </div>\r\n      </form>\r\n    </mat-card-content>\r\n  </mat-card>\r\n</div>\r\n", styles: [".container{max-width:800px;margin:2rem auto;padding:1rem}.full-width{width:100%;margin-bottom:1rem}.button-row{display:flex;justify-content:flex-end;margin-top:1rem}mat-card{padding:2rem}mat-card-title{font-size:1.5rem;margin-bottom:1rem}\n"] }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }, { type: i2.UserService }, { type: i3$1.MatSnackBar }] });

const routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: UserProfileComponent }
];
class AuthModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: AuthModule, declarations: [LoginComponent,
            RegisterComponent,
            UserProfileComponent], imports: [CommonModule,
            ReactiveFormsModule, i3.RouterModule, MatButtonModule,
            MatCardModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule,
            MatTabsModule,
            MatCheckboxModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AuthModule, imports: [CommonModule,
            ReactiveFormsModule,
            RouterModule.forChild(routes),
            MatButtonModule,
            MatCardModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule,
            MatTabsModule,
            MatCheckboxModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AuthModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        LoginComponent,
                        RegisterComponent,
                        UserProfileComponent
                    ],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RouterModule.forChild(routes),
                        MatButtonModule,
                        MatCardModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatIconModule,
                        MatTabsModule,
                        MatCheckboxModule
                    ]
                }]
        }] });

/*
 * Public API Surface of mfe-auth
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AuthModule };
//# sourceMappingURL=mfe-auth.mjs.map
