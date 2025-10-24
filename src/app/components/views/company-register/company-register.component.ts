import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-company-register',
  standalone: false,
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss']
})
export class CompanyRegisterComponent {
  registerForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
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

    this.userService.register(this.registerForm.value as User, true).subscribe(
      (res: { token: string }) => {
        this.authService.authenticate(res.token);
        this.router.navigate(['/Dashboard']);
      }
    )
  }

  getUsernameError(): string | null {
    const control = this.registerForm.get('fullName');
    if (control?.hasError('required')) return 'Nome de usuário é obrigatório';
    if (control?.hasError('minlength')) return 'Mínimo 3 caracteres';
    if (control?.hasError('maxlength')) return 'Máximo de 15 caracteres';
    return null;
  }

  getPasswordError(): string | null {
    const control = this.registerForm.get('passwordHash');
    if (control?.hasError('required')) return 'Senha é obrigatória';
    if (control?.hasError('minlength')) return 'Mínimo 8 caracteres';
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