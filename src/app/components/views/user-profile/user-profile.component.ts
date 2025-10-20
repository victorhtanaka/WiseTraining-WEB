import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: false
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user: User | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserProfile();
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      id: [0],
      email: [{ value: '', disabled: true }],
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      passwordHash: ['']
    });
  }

  loadUserProfile(): void {
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

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      const userData: User = {
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
}
