import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Group } from 'src/app/models/group.model';
import { Company } from 'src/app/models/company.model';
import { GroupService } from 'src/app/services/group.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-group-form-dialog',
  templateUrl: './group-form-dialog.component.html',
  styleUrls: ['./group-form-dialog.component.scss'],
  standalone: false
})
export class GroupFormDialogComponent implements OnInit {
  groupForm!: FormGroup;
  companies: Company[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private companyService: CompanyService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GroupFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Group
  ) {
    this.isEditMode = !!data;
  }

  ngOnInit(): void {
    this.initForm();
    this.loadCompanies();
  }

  initForm(): void {
    this.groupForm = this.fb.group({
      id: [this.data?.id || 0],
      name: [this.data?.name || '', [Validators.required, Validators.maxLength(100)]],
      description: [this.data?.description || '', Validators.maxLength(200)],
      companyId: [this.data?.companyId || 0, Validators.required]
    });
  }

  loadCompanies(): void {
    this.companyService.getAll().subscribe({
      next: (companies) => {
        this.companies = companies;
      },
      error: (error) => {
        this.snackBar.open('Error loading companies: ' + error.message, 'Close', {
          duration: 3000
        });
      }
    });
  }

  onSubmit(): void {
    if (this.groupForm.valid) {
      const groupData: Group = this.groupForm.value;

      const request = this.isEditMode
        ? this.groupService.put(groupData)
        : this.groupService.post(groupData);

      request.subscribe({
        next: () => {
          this.snackBar.open(
            `Group ${this.isEditMode ? 'updated' : 'created'} successfully!`,
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
