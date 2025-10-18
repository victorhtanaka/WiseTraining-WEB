import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form-dialog',
  templateUrl: './category-form-dialog.component.html',
  styleUrls: ['./category-form-dialog.component.scss'],
  standalone: false
})
export class CategoryFormDialogComponent implements OnInit {
  categoryForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CategoryFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {
    this.isEditMode = !!data;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.categoryForm = this.fb.group({
      id: [this.data?.id || 0],
      name: [this.data?.name || '', [Validators.required, Validators.maxLength(100)]],
      description: [this.data?.description || '', Validators.maxLength(500)]
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryData: Category = this.categoryForm.value;

      const request = this.isEditMode
        ? this.categoryService.put(categoryData)
        : this.categoryService.post(categoryData);

      request.subscribe({
        next: () => {
          this.snackBar.open(
            `Category ${this.isEditMode ? 'updated' : 'created'} successfully!`,
            'Close',
            { duration: 3000 }
          );
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.snackBar.open('Error: ' + error.message, 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
