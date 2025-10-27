import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'shared-lib';
import { UserService } from 'shared-lib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})

export class LoginComponent {
  loading: boolean = false;
  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
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

  getEmailError(): string | null {
    const control = this.loginForm.get('email');
    if (control?.hasError('required')) return 'Email é obrigatório';
    if (control?.hasError('email')) return 'Email inválido';
    return null;
  }

  getPasswordError(): string | null {
    const control = this.loginForm.get('passwordHash');
    if (control?.hasError('required')) return 'A senha é obrigatória';
    if (control?.hasError('minlength')) return 'Mínimo de 8 caracteres';
    if (control?.hasError('maxlength')) return 'Máximo de 30 caracteres';
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
}


