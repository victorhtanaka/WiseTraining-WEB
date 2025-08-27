import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})

export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern(/^\w+$/)
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
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
    this.userService.login(this.registerForm.value as User).subscribe(
      (res) => {
        this.authService.authenticate(res.token);
        this.router.navigate(['/']);
      }
    )
  }

  getUsernameError(): string | null {
    const control = this.registerForm.get('username');
    if (control?.hasError('required')) return 'Username is required';
    if (control?.hasError('minlength')) return 'Minimum 3 characters required';
    if (control?.hasError('pattern')) return 'Only letters, numbers, and underscores are allowed';
    if (control?.hasError('maxlength')) return 'Máximo de 15 caracteres';
    return null;
  }

  getPasswordError(): string | null {
    const control = this.registerForm.get('password');
    if (control?.hasError('required')) return 'Username is required';
    if (control?.hasError('minlength')) return 'Minimum 8 characters required';
    if (control?.hasError('pattern')) return 'nao sei';
    if (control?.hasError('maxlength')) return 'Máximo de 30 caracteres';
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
}
