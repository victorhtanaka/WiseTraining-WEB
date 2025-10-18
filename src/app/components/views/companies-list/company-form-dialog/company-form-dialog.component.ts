import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-form-dialog',
  templateUrl: './company-form-dialog.component.html',
  styleUrls: ['./company-form-dialog.component.scss'],
  standalone: false
})
export class CompanyFormDialogComponent implements OnInit {
  companyForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CompanyFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company
  ) {
    this.isEditMode = !!data;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.companyForm = this.fb.group({
      id: [this.data?.id || 0],
      name: [this.data?.name || '', [Validators.required, Validators.maxLength(100)]],
      domain: [this.data?.domain || '', Validators.maxLength(50)]
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      const companyData: Company = this.companyForm.value;

      const request = this.isEditMode
        ? this.companyService.put(companyData)
        : this.companyService.post(companyData);

      request.subscribe({
        next: () => {
          this.snackBar.open(
            `Company ${this.isEditMode ? 'updated' : 'created'} successfully!`,
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
