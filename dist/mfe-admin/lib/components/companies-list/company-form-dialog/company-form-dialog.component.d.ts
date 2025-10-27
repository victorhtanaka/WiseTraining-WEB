import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'shared-lib';
import { CompanyService } from 'shared-lib';
import * as i0 from "@angular/core";
export declare class CompanyFormDialogComponent implements OnInit {
    private fb;
    private companyService;
    private snackBar;
    dialogRef: MatDialogRef<CompanyFormDialogComponent>;
    data: Company;
    companyForm: FormGroup;
    isEditMode: boolean;
    constructor(fb: FormBuilder, companyService: CompanyService, snackBar: MatSnackBar, dialogRef: MatDialogRef<CompanyFormDialogComponent>, data: Company);
    ngOnInit(): void;
    initForm(): void;
    onSubmit(): void;
    onCancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CompanyFormDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CompanyFormDialogComponent, "app-company-form-dialog", never, {}, {}, never, never, false, never>;
}
