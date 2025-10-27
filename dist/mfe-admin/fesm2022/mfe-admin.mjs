import * as i0 from '@angular/core';
import { Inject, Component, ViewChild, NgModule } from '@angular/core';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$1 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i1 from '@angular/forms';
import { Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import * as i6 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i7 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i7$1 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i8 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i9 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i10 from '@angular/material/table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import * as i11 from '@angular/material/paginator';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import * as i12 from '@angular/material/sort';
import { MatSort, MatSortModule } from '@angular/material/sort';
import * as i4 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import * as i13 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as i2 from 'shared-lib';
import * as i3 from '@angular/material/snack-bar';

class UserFormDialogComponent {
    constructor(fb, userService, snackBar, dialogRef, data) {
        this.fb = fb;
        this.userService = userService;
        this.snackBar = snackBar;
        this.dialogRef = dialogRef;
        this.data = data;
        this.isEditMode = false;
        this.isEditMode = !!data;
    }
    ngOnInit() {
        this.initForm();
    }
    initForm() {
        this.userForm = this.fb.group({
            id: [this.data?.id || 0],
            email: [this.data?.email || '', [Validators.required, Validators.email, Validators.maxLength(30)]],
            fullName: [this.data?.fullName || '', [Validators.required, Validators.maxLength(100)]]
        });
    }
    onSubmit() {
        if (this.userForm.valid) {
            const userData = this.userForm.value;
            const request = this.isEditMode
                ? this.userService.put(userData)
                : this.userService.post(userData);
            request.subscribe({
                next: () => {
                    this.snackBar.open(`User ${this.isEditMode ? 'updated' : 'created'} successfully!`, 'Close', { duration: 3000 });
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
    onCancel() {
        this.dialogRef.close();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: UserFormDialogComponent, deps: [{ token: i1.FormBuilder }, { token: i2.UserService }, { token: i3.MatSnackBar }, { token: i4.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: UserFormDialogComponent, isStandalone: false, selector: "app-user-form-dialog", ngImport: i0, template: "<h2 mat-dialog-title>{{ isEditMode ? 'Edit User' : 'Add User' }}</h2>\r\n\r\n<mat-dialog-content>\r\n  <form [formGroup]=\"userForm\">\r\n    <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n      <mat-label>Email</mat-label>\r\n      <input matInput formControlName=\"email\" type=\"email\">\r\n      <mat-error *ngIf=\"userForm.get('email')?.hasError('required')\">\r\n        Email is required\r\n      </mat-error>\r\n      <mat-error *ngIf=\"userForm.get('email')?.hasError('email')\">\r\n        Please enter a valid email\r\n      </mat-error>\r\n    </mat-form-field>\r\n\r\n    <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n      <mat-label>Full Name</mat-label>\r\n      <input matInput formControlName=\"fullName\" type=\"text\">\r\n      <mat-error *ngIf=\"userForm.get('fullName')?.hasError('required')\">\r\n        Full Name is required\r\n      </mat-error>\r\n    </mat-form-field>\r\n    \r\n    <mat-form-field appearance=\"fill\" class=\"full-width\" *ngIf=\"!isEditMode\">\r\n      <mat-label>Password</mat-label>\r\n      <input matInput formControlName=\"passwordHash\" type=\"password\">\r\n      <mat-error *ngIf=\"userForm.get('passwordHash')?.hasError('required')\">\r\n        Password is required\r\n      </mat-error>\r\n      <mat-error *ngIf=\"userForm.get('passwordHash')?.hasError('minlength')\">\r\n        Password must be at least 6 characters\r\n      </mat-error>\r\n    </mat-form-field>\r\n  </form>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button (click)=\"onCancel()\">Cancel</button>\r\n  <button mat-raised-button color=\"primary\" (click)=\"onSubmit()\" [disabled]=\"!userForm.valid\">\r\n    {{ isEditMode ? 'Update' : 'Create' }}\r\n  </button>\r\n</mat-dialog-actions>\r\n", styles: [".full-width{width:100%;margin-bottom:1rem}mat-dialog-content{min-width:400px}\n"], dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "directive", type: i6.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i7$1.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "directive", type: i4.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i4.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i4.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: UserFormDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-user-form-dialog', standalone: false, template: "<h2 mat-dialog-title>{{ isEditMode ? 'Edit User' : 'Add User' }}</h2>\r\n\r\n<mat-dialog-content>\r\n  <form [formGroup]=\"userForm\">\r\n    <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n      <mat-label>Email</mat-label>\r\n      <input matInput formControlName=\"email\" type=\"email\">\r\n      <mat-error *ngIf=\"userForm.get('email')?.hasError('required')\">\r\n        Email is required\r\n      </mat-error>\r\n      <mat-error *ngIf=\"userForm.get('email')?.hasError('email')\">\r\n        Please enter a valid email\r\n      </mat-error>\r\n    </mat-form-field>\r\n\r\n    <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n      <mat-label>Full Name</mat-label>\r\n      <input matInput formControlName=\"fullName\" type=\"text\">\r\n      <mat-error *ngIf=\"userForm.get('fullName')?.hasError('required')\">\r\n        Full Name is required\r\n      </mat-error>\r\n    </mat-form-field>\r\n    \r\n    <mat-form-field appearance=\"fill\" class=\"full-width\" *ngIf=\"!isEditMode\">\r\n      <mat-label>Password</mat-label>\r\n      <input matInput formControlName=\"passwordHash\" type=\"password\">\r\n      <mat-error *ngIf=\"userForm.get('passwordHash')?.hasError('required')\">\r\n        Password is required\r\n      </mat-error>\r\n      <mat-error *ngIf=\"userForm.get('passwordHash')?.hasError('minlength')\">\r\n        Password must be at least 6 characters\r\n      </mat-error>\r\n    </mat-form-field>\r\n  </form>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button (click)=\"onCancel()\">Cancel</button>\r\n  <button mat-raised-button color=\"primary\" (click)=\"onSubmit()\" [disabled]=\"!userForm.valid\">\r\n    {{ isEditMode ? 'Update' : 'Create' }}\r\n  </button>\r\n</mat-dialog-actions>\r\n", styles: [".full-width{width:100%;margin-bottom:1rem}mat-dialog-content{min-width:400px}\n"] }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }, { type: i2.UserService }, { type: i3.MatSnackBar }, { type: i4.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }] });

class UsersListComponent {
    constructor(userService, dialog, snackBar) {
        this.userService = userService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.displayedColumns = ['id', 'email', 'fullName', 'role', 'actions'];
        this.dataSource = new MatTableDataSource();
        this.isLoading = false;
    }
    ngOnInit() {
        this.loadUsers();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    loadUsers() {
        this.isLoading = true;
        this.userService.getAll().subscribe({
            next: (users) => {
                this.dataSource.data = users;
                this.isLoading = false;
            },
            error: (error) => {
                this.snackBar.open('Error loading users: ' + error.message, 'Close', {
                    duration: 3000
                });
                this.isLoading = false;
            }
        });
    }
    applyFilter(event) {
        const filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    openDialog(user) {
        const dialogRef = this.dialog.open(UserFormDialogComponent, {
            width: '600px',
            data: user ? { ...user } : null
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadUsers();
            }
        });
    }
    deleteUser(id) {
        if (confirm('Are you sure you want to delete this user?')) {
            this.userService.delete(id).subscribe({
                next: () => {
                    this.snackBar.open('User deleted successfully!', 'Close', {
                        duration: 3000
                    });
                    this.loadUsers();
                },
                error: (error) => {
                    this.snackBar.open('Error deleting user: ' + error.message, 'Close', {
                        duration: 3000
                    });
                }
            });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: UsersListComponent, deps: [{ token: i2.UserService }, { token: i4.MatDialog }, { token: i3.MatSnackBar }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: UsersListComponent, isStandalone: false, selector: "app-users-list", viewQueries: [{ propertyName: "paginator", first: true, predicate: MatPaginator, descendants: true }, { propertyName: "sort", first: true, predicate: MatSort, descendants: true }], ngImport: i0, template: "<div class=\"container\">\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>User Management</mat-card-title>\r\n      <button mat-raised-button color=\"primary\" (click)=\"openDialog()\">\r\n        <mat-icon>add</mat-icon>\r\n        Add User\r\n      </button>\r\n    </mat-card-header>\r\n\r\n    <mat-card-content>\r\n      <mat-form-field appearance=\"fill\" class=\"search-field\">\r\n        <mat-label>Search</mat-label>\r\n        <input matInput (keyup)=\"applyFilter($event)\" placeholder=\"Search users...\">\r\n        <mat-icon matSuffix>search</mat-icon>\r\n      </mat-form-field>\r\n\r\n      <div class=\"table-container\">\r\n        <table mat-table [dataSource]=\"dataSource\" matSort class=\"mat-elevation-z8\">\r\n          <ng-container matColumnDef=\"id\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>\r\n            <td mat-cell *matCellDef=\"let user\">{{ user.id }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"email\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>\r\n            <td mat-cell *matCellDef=\"let user\">{{ user.email }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"fullName\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>Full Name</th>\r\n            <td mat-cell *matCellDef=\"let user\">{{ user.fullName }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"role\">\r\n            <th mat-header-cell *matHeaderCellDef>Role</th>\r\n            <td mat-cell *matCellDef=\"let user\">{{ user.role?.name }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"actions\">\r\n            <th mat-header-cell *matHeaderCellDef>Actions</th>\r\n            <td mat-cell *matCellDef=\"let user\">\r\n              <button mat-icon-button color=\"primary\" (click)=\"openDialog(user)\">\r\n                <mat-icon>edit</mat-icon>\r\n              </button>\r\n              <button mat-icon-button color=\"warn\" (click)=\"deleteUser(user.id)\">\r\n                <mat-icon>delete</mat-icon>\r\n              </button>\r\n            </td>\r\n          </ng-container>\r\n\r\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n        </table>\r\n\r\n        <mat-paginator [pageSizeOptions]=\"[5, 10, 25, 100]\" showFirstLastButtons></mat-paginator>\r\n      </div>\r\n\r\n      <div *ngIf=\"isLoading\" class=\"loading-shade\">\r\n        <mat-spinner></mat-spinner>\r\n      </div>\r\n    </mat-card-content>\r\n  </mat-card>\r\n</div>\r\n", styles: [".container{padding:2rem}mat-card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}.search-field{width:100%;margin-bottom:1rem}.table-container{position:relative;width:100%;overflow:auto}table{width:100%}.loading-shade{position:absolute;inset:0 0 56px;background:#00000026;z-index:1;display:flex;align-items:center;justify-content:center}\n"], dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "directive", type: i6.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i7$1.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i7$1.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }, { kind: "component", type: i8.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }, { kind: "directive", type: i8.MatCardContent, selector: "mat-card-content" }, { kind: "component", type: i8.MatCardHeader, selector: "mat-card-header" }, { kind: "directive", type: i8.MatCardTitle, selector: "mat-card-title, [mat-card-title], [matCardTitle]" }, { kind: "component", type: i9.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i10.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i10.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i10.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i10.MatColumnDef, selector: "[matColumnDef]", inputs: ["matColumnDef"] }, { kind: "directive", type: i10.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i10.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i10.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i10.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i10.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i10.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "component", type: i11.MatPaginator, selector: "mat-paginator", inputs: ["color", "pageIndex", "length", "pageSize", "pageSizeOptions", "hidePageSize", "showFirstLastButtons", "selectConfig", "disabled"], outputs: ["page"], exportAs: ["matPaginator"] }, { kind: "directive", type: i12.MatSort, selector: "[matSort]", inputs: ["matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear", "matSortDisabled"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { kind: "component", type: i12.MatSortHeader, selector: "[mat-sort-header]", inputs: ["mat-sort-header", "arrowPosition", "start", "disabled", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }, { kind: "component", type: i13.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: UsersListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-users-list', standalone: false, template: "<div class=\"container\">\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>User Management</mat-card-title>\r\n      <button mat-raised-button color=\"primary\" (click)=\"openDialog()\">\r\n        <mat-icon>add</mat-icon>\r\n        Add User\r\n      </button>\r\n    </mat-card-header>\r\n\r\n    <mat-card-content>\r\n      <mat-form-field appearance=\"fill\" class=\"search-field\">\r\n        <mat-label>Search</mat-label>\r\n        <input matInput (keyup)=\"applyFilter($event)\" placeholder=\"Search users...\">\r\n        <mat-icon matSuffix>search</mat-icon>\r\n      </mat-form-field>\r\n\r\n      <div class=\"table-container\">\r\n        <table mat-table [dataSource]=\"dataSource\" matSort class=\"mat-elevation-z8\">\r\n          <ng-container matColumnDef=\"id\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>\r\n            <td mat-cell *matCellDef=\"let user\">{{ user.id }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"email\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>\r\n            <td mat-cell *matCellDef=\"let user\">{{ user.email }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"fullName\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>Full Name</th>\r\n            <td mat-cell *matCellDef=\"let user\">{{ user.fullName }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"role\">\r\n            <th mat-header-cell *matHeaderCellDef>Role</th>\r\n            <td mat-cell *matCellDef=\"let user\">{{ user.role?.name }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"actions\">\r\n            <th mat-header-cell *matHeaderCellDef>Actions</th>\r\n            <td mat-cell *matCellDef=\"let user\">\r\n              <button mat-icon-button color=\"primary\" (click)=\"openDialog(user)\">\r\n                <mat-icon>edit</mat-icon>\r\n              </button>\r\n              <button mat-icon-button color=\"warn\" (click)=\"deleteUser(user.id)\">\r\n                <mat-icon>delete</mat-icon>\r\n              </button>\r\n            </td>\r\n          </ng-container>\r\n\r\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n        </table>\r\n\r\n        <mat-paginator [pageSizeOptions]=\"[5, 10, 25, 100]\" showFirstLastButtons></mat-paginator>\r\n      </div>\r\n\r\n      <div *ngIf=\"isLoading\" class=\"loading-shade\">\r\n        <mat-spinner></mat-spinner>\r\n      </div>\r\n    </mat-card-content>\r\n  </mat-card>\r\n</div>\r\n", styles: [".container{padding:2rem}mat-card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}.search-field{width:100%;margin-bottom:1rem}.table-container{position:relative;width:100%;overflow:auto}table{width:100%}.loading-shade{position:absolute;inset:0 0 56px;background:#00000026;z-index:1;display:flex;align-items:center;justify-content:center}\n"] }]
        }], ctorParameters: () => [{ type: i2.UserService }, { type: i4.MatDialog }, { type: i3.MatSnackBar }], propDecorators: { paginator: [{
                type: ViewChild,
                args: [MatPaginator]
            }], sort: [{
                type: ViewChild,
                args: [MatSort]
            }] } });

class CategoryFormDialogComponent {
    constructor(fb, categoryService, snackBar, dialogRef, data) {
        this.fb = fb;
        this.categoryService = categoryService;
        this.snackBar = snackBar;
        this.dialogRef = dialogRef;
        this.data = data;
        this.isEditMode = false;
        this.isEditMode = !!data;
    }
    ngOnInit() {
        this.initForm();
    }
    initForm() {
        this.categoryForm = this.fb.group({
            id: [this.data?.id || 0],
            name: [this.data?.name || '', [Validators.required, Validators.maxLength(100)]],
            description: [this.data?.description || '', Validators.maxLength(500)]
        });
    }
    onSubmit() {
        if (this.categoryForm.valid) {
            const categoryData = this.categoryForm.value;
            const request = this.isEditMode
                ? this.categoryService.put(categoryData)
                : this.categoryService.post(categoryData);
            request.subscribe({
                next: () => {
                    this.snackBar.open(`Category ${this.isEditMode ? 'updated' : 'created'} successfully!`, 'Close', { duration: 3000 });
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
    onCancel() {
        this.dialogRef.close();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CategoryFormDialogComponent, deps: [{ token: i1.FormBuilder }, { token: i2.CategoryService }, { token: i3.MatSnackBar }, { token: i4.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: CategoryFormDialogComponent, isStandalone: false, selector: "app-category-form-dialog", ngImport: i0, template: "<h2 mat-dialog-title>{{ isEditMode ? 'Edit Category' : 'Add Category' }}</h2>\r\n\r\n<mat-dialog-content>\r\n  <form [formGroup]=\"categoryForm\">\r\n    <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n      <mat-label>Name</mat-label>\r\n      <input matInput formControlName=\"name\" type=\"text\">\r\n      <mat-error *ngIf=\"categoryForm.get('name')?.hasError('required')\">\r\n        Name is required\r\n      </mat-error>\r\n      <mat-error *ngIf=\"categoryForm.get('name')?.hasError('maxlength')\">\r\n        Name must not exceed 100 characters\r\n      </mat-error>\r\n    </mat-form-field>\r\n\r\n    <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n      <mat-label>Description</mat-label>\r\n      <textarea matInput formControlName=\"description\" rows=\"4\"></textarea>\r\n      <mat-error *ngIf=\"categoryForm.get('description')?.hasError('maxlength')\">\r\n        Description must not exceed 500 characters\r\n      </mat-error>\r\n    </mat-form-field>\r\n  </form>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button (click)=\"onCancel()\">Cancel</button>\r\n  <button mat-raised-button color=\"primary\" (click)=\"onSubmit()\" [disabled]=\"!categoryForm.valid\">\r\n    {{ isEditMode ? 'Update' : 'Create' }}\r\n  </button>\r\n</mat-dialog-actions>\r\n", styles: [".full-width{width:100%;margin-bottom:1rem}mat-dialog-content{min-width:400px}\n"], dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "directive", type: i6.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i7$1.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "directive", type: i4.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i4.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i4.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CategoryFormDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-category-form-dialog', standalone: false, template: "<h2 mat-dialog-title>{{ isEditMode ? 'Edit Category' : 'Add Category' }}</h2>\r\n\r\n<mat-dialog-content>\r\n  <form [formGroup]=\"categoryForm\">\r\n    <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n      <mat-label>Name</mat-label>\r\n      <input matInput formControlName=\"name\" type=\"text\">\r\n      <mat-error *ngIf=\"categoryForm.get('name')?.hasError('required')\">\r\n        Name is required\r\n      </mat-error>\r\n      <mat-error *ngIf=\"categoryForm.get('name')?.hasError('maxlength')\">\r\n        Name must not exceed 100 characters\r\n      </mat-error>\r\n    </mat-form-field>\r\n\r\n    <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n      <mat-label>Description</mat-label>\r\n      <textarea matInput formControlName=\"description\" rows=\"4\"></textarea>\r\n      <mat-error *ngIf=\"categoryForm.get('description')?.hasError('maxlength')\">\r\n        Description must not exceed 500 characters\r\n      </mat-error>\r\n    </mat-form-field>\r\n  </form>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button (click)=\"onCancel()\">Cancel</button>\r\n  <button mat-raised-button color=\"primary\" (click)=\"onSubmit()\" [disabled]=\"!categoryForm.valid\">\r\n    {{ isEditMode ? 'Update' : 'Create' }}\r\n  </button>\r\n</mat-dialog-actions>\r\n", styles: [".full-width{width:100%;margin-bottom:1rem}mat-dialog-content{min-width:400px}\n"] }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }, { type: i2.CategoryService }, { type: i3.MatSnackBar }, { type: i4.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }] });

class CategoriesListComponent {
    constructor(categoryService, dialog, snackBar) {
        this.categoryService = categoryService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.displayedColumns = ['id', 'name', 'description', 'actions'];
        this.dataSource = new MatTableDataSource();
        this.isLoading = false;
    }
    ngOnInit() {
        this.loadCategories();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    loadCategories() {
        this.isLoading = true;
        this.categoryService.getAll().subscribe({
            next: (categories) => {
                this.dataSource.data = categories;
                this.isLoading = false;
            },
            error: (error) => {
                this.snackBar.open('Error loading categories: ' + error.message, 'Close', {
                    duration: 3000
                });
                this.isLoading = false;
            }
        });
    }
    applyFilter(event) {
        const filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    openDialog(category) {
        const dialogRef = this.dialog.open(CategoryFormDialogComponent, {
            width: '600px',
            data: category ? { ...category } : null
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadCategories();
            }
        });
    }
    deleteCategory(id) {
        if (confirm('Are you sure you want to delete this category?')) {
            this.categoryService.delete(id).subscribe({
                next: () => {
                    this.snackBar.open('Category deleted successfully!', 'Close', {
                        duration: 3000
                    });
                    this.loadCategories();
                },
                error: (error) => {
                    this.snackBar.open('Error deleting category: ' + error.message, 'Close', {
                        duration: 3000
                    });
                }
            });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CategoriesListComponent, deps: [{ token: i2.CategoryService }, { token: i4.MatDialog }, { token: i3.MatSnackBar }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: CategoriesListComponent, isStandalone: false, selector: "app-categories-list", viewQueries: [{ propertyName: "paginator", first: true, predicate: MatPaginator, descendants: true }, { propertyName: "sort", first: true, predicate: MatSort, descendants: true }], ngImport: i0, template: "<div class=\"container\">\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>Category Management</mat-card-title>\r\n      <button mat-raised-button color=\"primary\" (click)=\"openDialog()\">\r\n        <mat-icon>add</mat-icon>\r\n        Add Category\r\n      </button>\r\n    </mat-card-header>\r\n\r\n    <mat-card-content>\r\n      <mat-form-field appearance=\"fill\" class=\"search-field\">\r\n        <mat-label>Search</mat-label>\r\n        <input matInput (keyup)=\"applyFilter($event)\" placeholder=\"Search categories...\">\r\n        <mat-icon matSuffix>search</mat-icon>\r\n      </mat-form-field>\r\n\r\n      <div class=\"table-container\">\r\n        <table mat-table [dataSource]=\"dataSource\" matSort class=\"mat-elevation-z8\">\r\n          <ng-container matColumnDef=\"id\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>\r\n            <td mat-cell *matCellDef=\"let category\">{{ category.id }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"name\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>\r\n            <td mat-cell *matCellDef=\"let category\">{{ category.name }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"description\">\r\n            <th mat-header-cell *matHeaderCellDef>Description</th>\r\n            <td mat-cell *matCellDef=\"let category\">{{ category.description }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"actions\">\r\n            <th mat-header-cell *matHeaderCellDef>Actions</th>\r\n            <td mat-cell *matCellDef=\"let category\">\r\n              <button mat-icon-button color=\"primary\" (click)=\"openDialog(category)\">\r\n                <mat-icon>edit</mat-icon>\r\n              </button>\r\n              <button mat-icon-button color=\"warn\" (click)=\"deleteCategory(category.id)\">\r\n                <mat-icon>delete</mat-icon>\r\n              </button>\r\n            </td>\r\n          </ng-container>\r\n\r\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n        </table>\r\n\r\n        <mat-paginator [pageSizeOptions]=\"[5, 10, 25, 100]\" showFirstLastButtons></mat-paginator>\r\n      </div>\r\n\r\n      <div *ngIf=\"isLoading\" class=\"loading-shade\">\r\n        <mat-spinner></mat-spinner>\r\n      </div>\r\n    </mat-card-content>\r\n  </mat-card>\r\n</div>\r\n", styles: [".container{padding:2rem}mat-card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}.search-field{width:100%;margin-bottom:1rem}.table-container{position:relative;width:100%;overflow:auto}table{width:100%}.loading-shade{position:absolute;inset:0 0 56px;background:#00000026;z-index:1;display:flex;align-items:center;justify-content:center}\n"], dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "directive", type: i6.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i7$1.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i7$1.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }, { kind: "component", type: i8.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }, { kind: "directive", type: i8.MatCardContent, selector: "mat-card-content" }, { kind: "component", type: i8.MatCardHeader, selector: "mat-card-header" }, { kind: "directive", type: i8.MatCardTitle, selector: "mat-card-title, [mat-card-title], [matCardTitle]" }, { kind: "component", type: i9.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i10.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i10.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i10.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i10.MatColumnDef, selector: "[matColumnDef]", inputs: ["matColumnDef"] }, { kind: "directive", type: i10.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i10.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i10.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i10.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i10.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i10.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "component", type: i11.MatPaginator, selector: "mat-paginator", inputs: ["color", "pageIndex", "length", "pageSize", "pageSizeOptions", "hidePageSize", "showFirstLastButtons", "selectConfig", "disabled"], outputs: ["page"], exportAs: ["matPaginator"] }, { kind: "directive", type: i12.MatSort, selector: "[matSort]", inputs: ["matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear", "matSortDisabled"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { kind: "component", type: i12.MatSortHeader, selector: "[mat-sort-header]", inputs: ["mat-sort-header", "arrowPosition", "start", "disabled", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }, { kind: "component", type: i13.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CategoriesListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-categories-list', standalone: false, template: "<div class=\"container\">\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>Category Management</mat-card-title>\r\n      <button mat-raised-button color=\"primary\" (click)=\"openDialog()\">\r\n        <mat-icon>add</mat-icon>\r\n        Add Category\r\n      </button>\r\n    </mat-card-header>\r\n\r\n    <mat-card-content>\r\n      <mat-form-field appearance=\"fill\" class=\"search-field\">\r\n        <mat-label>Search</mat-label>\r\n        <input matInput (keyup)=\"applyFilter($event)\" placeholder=\"Search categories...\">\r\n        <mat-icon matSuffix>search</mat-icon>\r\n      </mat-form-field>\r\n\r\n      <div class=\"table-container\">\r\n        <table mat-table [dataSource]=\"dataSource\" matSort class=\"mat-elevation-z8\">\r\n          <ng-container matColumnDef=\"id\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>\r\n            <td mat-cell *matCellDef=\"let category\">{{ category.id }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"name\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>\r\n            <td mat-cell *matCellDef=\"let category\">{{ category.name }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"description\">\r\n            <th mat-header-cell *matHeaderCellDef>Description</th>\r\n            <td mat-cell *matCellDef=\"let category\">{{ category.description }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"actions\">\r\n            <th mat-header-cell *matHeaderCellDef>Actions</th>\r\n            <td mat-cell *matCellDef=\"let category\">\r\n              <button mat-icon-button color=\"primary\" (click)=\"openDialog(category)\">\r\n                <mat-icon>edit</mat-icon>\r\n              </button>\r\n              <button mat-icon-button color=\"warn\" (click)=\"deleteCategory(category.id)\">\r\n                <mat-icon>delete</mat-icon>\r\n              </button>\r\n            </td>\r\n          </ng-container>\r\n\r\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n        </table>\r\n\r\n        <mat-paginator [pageSizeOptions]=\"[5, 10, 25, 100]\" showFirstLastButtons></mat-paginator>\r\n      </div>\r\n\r\n      <div *ngIf=\"isLoading\" class=\"loading-shade\">\r\n        <mat-spinner></mat-spinner>\r\n      </div>\r\n    </mat-card-content>\r\n  </mat-card>\r\n</div>\r\n", styles: [".container{padding:2rem}mat-card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}.search-field{width:100%;margin-bottom:1rem}.table-container{position:relative;width:100%;overflow:auto}table{width:100%}.loading-shade{position:absolute;inset:0 0 56px;background:#00000026;z-index:1;display:flex;align-items:center;justify-content:center}\n"] }]
        }], ctorParameters: () => [{ type: i2.CategoryService }, { type: i4.MatDialog }, { type: i3.MatSnackBar }], propDecorators: { paginator: [{
                type: ViewChild,
                args: [MatPaginator]
            }], sort: [{
                type: ViewChild,
                args: [MatSort]
            }] } });

class CompanyFormDialogComponent {
    constructor(fb, companyService, snackBar, dialogRef, data) {
        this.fb = fb;
        this.companyService = companyService;
        this.snackBar = snackBar;
        this.dialogRef = dialogRef;
        this.data = data;
        this.isEditMode = false;
        this.isEditMode = !!data;
    }
    ngOnInit() {
        this.initForm();
    }
    initForm() {
        this.companyForm = this.fb.group({
            id: [this.data?.id || 0],
            name: [this.data?.name || '', [Validators.required, Validators.maxLength(100)]],
            domain: [this.data?.domain || '', Validators.maxLength(50)]
        });
    }
    onSubmit() {
        if (this.companyForm.valid) {
            const companyData = this.companyForm.value;
            const request = this.isEditMode
                ? this.companyService.put(companyData)
                : this.companyService.post(companyData);
            request.subscribe({
                next: () => {
                    this.snackBar.open(`Company ${this.isEditMode ? 'updated' : 'created'} successfully!`, 'Close', { duration: 3000 });
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
    onCancel() {
        this.dialogRef.close();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanyFormDialogComponent, deps: [{ token: i1.FormBuilder }, { token: i2.CompanyService }, { token: i3.MatSnackBar }, { token: i4.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: CompanyFormDialogComponent, isStandalone: false, selector: "app-company-form-dialog", ngImport: i0, template: "<h2 mat-dialog-title>{{ isEditMode ? 'Edit Company' : 'Add Company' }}</h2>\r\n\r\n<mat-dialog-content>\r\n  <form [formGroup]=\"companyForm\">\r\n    <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n      <mat-label>Name</mat-label>\r\n      <input matInput formControlName=\"name\" type=\"text\">\r\n      <mat-error *ngIf=\"companyForm.get('name')?.hasError('required')\">\r\n        Name is required\r\n      </mat-error>\r\n      <mat-error *ngIf=\"companyForm.get('name')?.hasError('maxlength')\">\r\n        Name must not exceed 100 characters\r\n      </mat-error>\r\n    </mat-form-field>\r\n\r\n    <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n      <mat-label>Domain</mat-label>\r\n      <input matInput formControlName=\"domain\" type=\"text\" placeholder=\"example.com\">\r\n      <mat-error *ngIf=\"companyForm.get('domain')?.hasError('maxlength')\">\r\n        Domain must not exceed 50 characters\r\n      </mat-error>\r\n    </mat-form-field>\r\n  </form>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button (click)=\"onCancel()\">Cancel</button>\r\n  <button mat-raised-button color=\"primary\" (click)=\"onSubmit()\" [disabled]=\"!companyForm.valid\">\r\n    {{ isEditMode ? 'Update' : 'Create' }}\r\n  </button>\r\n</mat-dialog-actions>\r\n", styles: [".full-width{width:100%;margin-bottom:1rem}mat-dialog-content{min-width:400px}\n"], dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "directive", type: i6.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i7$1.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "directive", type: i4.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i4.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i4.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompanyFormDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-company-form-dialog', standalone: false, template: "<h2 mat-dialog-title>{{ isEditMode ? 'Edit Company' : 'Add Company' }}</h2>\r\n\r\n<mat-dialog-content>\r\n  <form [formGroup]=\"companyForm\">\r\n    <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n      <mat-label>Name</mat-label>\r\n      <input matInput formControlName=\"name\" type=\"text\">\r\n      <mat-error *ngIf=\"companyForm.get('name')?.hasError('required')\">\r\n        Name is required\r\n      </mat-error>\r\n      <mat-error *ngIf=\"companyForm.get('name')?.hasError('maxlength')\">\r\n        Name must not exceed 100 characters\r\n      </mat-error>\r\n    </mat-form-field>\r\n\r\n    <mat-form-field appearance=\"fill\" class=\"full-width\">\r\n      <mat-label>Domain</mat-label>\r\n      <input matInput formControlName=\"domain\" type=\"text\" placeholder=\"example.com\">\r\n      <mat-error *ngIf=\"companyForm.get('domain')?.hasError('maxlength')\">\r\n        Domain must not exceed 50 characters\r\n      </mat-error>\r\n    </mat-form-field>\r\n  </form>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button (click)=\"onCancel()\">Cancel</button>\r\n  <button mat-raised-button color=\"primary\" (click)=\"onSubmit()\" [disabled]=\"!companyForm.valid\">\r\n    {{ isEditMode ? 'Update' : 'Create' }}\r\n  </button>\r\n</mat-dialog-actions>\r\n", styles: [".full-width{width:100%;margin-bottom:1rem}mat-dialog-content{min-width:400px}\n"] }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }, { type: i2.CompanyService }, { type: i3.MatSnackBar }, { type: i4.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }] });

class CompaniesListComponent {
    constructor(companyService, dialog, snackBar) {
        this.companyService = companyService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.displayedColumns = ['id', 'name', 'domain', 'actions'];
        this.dataSource = new MatTableDataSource();
        this.isLoading = false;
    }
    ngOnInit() {
        this.loadCompanies();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    loadCompanies() {
        this.isLoading = true;
        this.companyService.getAll().subscribe({
            next: (companies) => {
                this.dataSource.data = companies;
                this.isLoading = false;
            },
            error: (error) => {
                this.snackBar.open('Error loading companies: ' + error.message, 'Close', {
                    duration: 3000
                });
                this.isLoading = false;
            }
        });
    }
    applyFilter(event) {
        const filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    openDialog(company) {
        const dialogRef = this.dialog.open(CompanyFormDialogComponent, {
            width: '600px',
            data: company ? { ...company } : null
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadCompanies();
            }
        });
    }
    deleteCompany(id) {
        if (confirm('Are you sure you want to delete this company?')) {
            this.companyService.delete(id).subscribe({
                next: () => {
                    this.snackBar.open('Company deleted successfully!', 'Close', {
                        duration: 3000
                    });
                    this.loadCompanies();
                },
                error: (error) => {
                    this.snackBar.open('Error deleting company: ' + error.message, 'Close', {
                        duration: 3000
                    });
                }
            });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompaniesListComponent, deps: [{ token: i2.CompanyService }, { token: i4.MatDialog }, { token: i3.MatSnackBar }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.2.10", type: CompaniesListComponent, isStandalone: false, selector: "app-companies-list", viewQueries: [{ propertyName: "paginator", first: true, predicate: MatPaginator, descendants: true }, { propertyName: "sort", first: true, predicate: MatSort, descendants: true }], ngImport: i0, template: "<div class=\"container\">\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>Company Management</mat-card-title>\r\n      <button mat-raised-button color=\"primary\" (click)=\"openDialog()\">\r\n        <mat-icon>add</mat-icon>\r\n        Add Company\r\n      </button>\r\n    </mat-card-header>\r\n\r\n    <mat-card-content>\r\n      <mat-form-field appearance=\"fill\" class=\"search-field\">\r\n        <mat-label>Search</mat-label>\r\n        <input matInput (keyup)=\"applyFilter($event)\" placeholder=\"Search companies...\">\r\n        <mat-icon matSuffix>search</mat-icon>\r\n      </mat-form-field>\r\n\r\n      <div class=\"table-container\">\r\n        <table mat-table [dataSource]=\"dataSource\" matSort class=\"mat-elevation-z8\">\r\n          <ng-container matColumnDef=\"id\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>\r\n            <td mat-cell *matCellDef=\"let company\">{{ company.id }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"name\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>\r\n            <td mat-cell *matCellDef=\"let company\">{{ company.name }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"domain\">\r\n            <th mat-header-cell *matHeaderCellDef>Domain</th>\r\n            <td mat-cell *matCellDef=\"let company\">{{ company.domain }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"actions\">\r\n            <th mat-header-cell *matHeaderCellDef>Actions</th>\r\n            <td mat-cell *matCellDef=\"let company\">\r\n              <button mat-icon-button color=\"primary\" (click)=\"openDialog(company)\">\r\n                <mat-icon>edit</mat-icon>\r\n              </button>\r\n              <button mat-icon-button color=\"warn\" (click)=\"deleteCompany(company.id)\">\r\n                <mat-icon>delete</mat-icon>\r\n              </button>\r\n            </td>\r\n          </ng-container>\r\n\r\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n        </table>\r\n\r\n        <mat-paginator [pageSizeOptions]=\"[5, 10, 25, 100]\" showFirstLastButtons></mat-paginator>\r\n      </div>\r\n\r\n      <div *ngIf=\"isLoading\" class=\"loading-shade\">\r\n        <mat-spinner></mat-spinner>\r\n      </div>\r\n    </mat-card-content>\r\n  </mat-card>\r\n</div>\r\n", styles: [".container{padding:2rem}mat-card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}.search-field{width:100%;margin-bottom:1rem}.table-container{position:relative;width:100%;overflow:auto}table{width:100%}.loading-shade{position:absolute;inset:0 0 56px;background:#00000026;z-index:1;display:flex;align-items:center;justify-content:center}\n"], dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "directive", type: i6.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "component", type: i7$1.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", exportAs: ["matButton"] }, { kind: "component", type: i7$1.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }, { kind: "component", type: i8.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }, { kind: "directive", type: i8.MatCardContent, selector: "mat-card-content" }, { kind: "component", type: i8.MatCardHeader, selector: "mat-card-header" }, { kind: "directive", type: i8.MatCardTitle, selector: "mat-card-title, [mat-card-title], [matCardTitle]" }, { kind: "component", type: i9.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i10.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i10.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i10.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i10.MatColumnDef, selector: "[matColumnDef]", inputs: ["matColumnDef"] }, { kind: "directive", type: i10.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i10.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i10.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i10.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i10.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i10.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "component", type: i11.MatPaginator, selector: "mat-paginator", inputs: ["color", "pageIndex", "length", "pageSize", "pageSizeOptions", "hidePageSize", "showFirstLastButtons", "selectConfig", "disabled"], outputs: ["page"], exportAs: ["matPaginator"] }, { kind: "directive", type: i12.MatSort, selector: "[matSort]", inputs: ["matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear", "matSortDisabled"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { kind: "component", type: i12.MatSortHeader, selector: "[mat-sort-header]", inputs: ["mat-sort-header", "arrowPosition", "start", "disabled", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }, { kind: "component", type: i13.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: CompaniesListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-companies-list', standalone: false, template: "<div class=\"container\">\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>Company Management</mat-card-title>\r\n      <button mat-raised-button color=\"primary\" (click)=\"openDialog()\">\r\n        <mat-icon>add</mat-icon>\r\n        Add Company\r\n      </button>\r\n    </mat-card-header>\r\n\r\n    <mat-card-content>\r\n      <mat-form-field appearance=\"fill\" class=\"search-field\">\r\n        <mat-label>Search</mat-label>\r\n        <input matInput (keyup)=\"applyFilter($event)\" placeholder=\"Search companies...\">\r\n        <mat-icon matSuffix>search</mat-icon>\r\n      </mat-form-field>\r\n\r\n      <div class=\"table-container\">\r\n        <table mat-table [dataSource]=\"dataSource\" matSort class=\"mat-elevation-z8\">\r\n          <ng-container matColumnDef=\"id\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th>\r\n            <td mat-cell *matCellDef=\"let company\">{{ company.id }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"name\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>\r\n            <td mat-cell *matCellDef=\"let company\">{{ company.name }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"domain\">\r\n            <th mat-header-cell *matHeaderCellDef>Domain</th>\r\n            <td mat-cell *matCellDef=\"let company\">{{ company.domain }}</td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"actions\">\r\n            <th mat-header-cell *matHeaderCellDef>Actions</th>\r\n            <td mat-cell *matCellDef=\"let company\">\r\n              <button mat-icon-button color=\"primary\" (click)=\"openDialog(company)\">\r\n                <mat-icon>edit</mat-icon>\r\n              </button>\r\n              <button mat-icon-button color=\"warn\" (click)=\"deleteCompany(company.id)\">\r\n                <mat-icon>delete</mat-icon>\r\n              </button>\r\n            </td>\r\n          </ng-container>\r\n\r\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n        </table>\r\n\r\n        <mat-paginator [pageSizeOptions]=\"[5, 10, 25, 100]\" showFirstLastButtons></mat-paginator>\r\n      </div>\r\n\r\n      <div *ngIf=\"isLoading\" class=\"loading-shade\">\r\n        <mat-spinner></mat-spinner>\r\n      </div>\r\n    </mat-card-content>\r\n  </mat-card>\r\n</div>\r\n", styles: [".container{padding:2rem}mat-card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}.search-field{width:100%;margin-bottom:1rem}.table-container{position:relative;width:100%;overflow:auto}table{width:100%}.loading-shade{position:absolute;inset:0 0 56px;background:#00000026;z-index:1;display:flex;align-items:center;justify-content:center}\n"] }]
        }], ctorParameters: () => [{ type: i2.CompanyService }, { type: i4.MatDialog }, { type: i3.MatSnackBar }], propDecorators: { paginator: [{
                type: ViewChild,
                args: [MatPaginator]
            }], sort: [{
                type: ViewChild,
                args: [MatSort]
            }] } });

const routes = [
    { path: 'users', component: UsersListComponent },
    { path: 'categories', component: CategoriesListComponent },
    { path: 'companies', component: CompaniesListComponent }
];
class AdminModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AdminModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.10", ngImport: i0, type: AdminModule, declarations: [UsersListComponent,
            UserFormDialogComponent,
            CategoriesListComponent,
            CategoryFormDialogComponent,
            CompaniesListComponent,
            CompanyFormDialogComponent], imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule, i1$1.RouterModule, MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatCardModule,
            MatIconModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatDialogModule,
            MatSelectModule,
            MatProgressSpinnerModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AdminModule, imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule,
            RouterModule.forChild(routes),
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatCardModule,
            MatIconModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatDialogModule,
            MatSelectModule,
            MatProgressSpinnerModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.10", ngImport: i0, type: AdminModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        UsersListComponent,
                        UserFormDialogComponent,
                        CategoriesListComponent,
                        CategoryFormDialogComponent,
                        CompaniesListComponent,
                        CompanyFormDialogComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        HttpClientModule,
                        RouterModule.forChild(routes),
                        MatFormFieldModule,
                        MatInputModule,
                        MatButtonModule,
                        MatCardModule,
                        MatIconModule,
                        MatTableModule,
                        MatPaginatorModule,
                        MatSortModule,
                        MatDialogModule,
                        MatSelectModule,
                        MatProgressSpinnerModule
                    ]
                }]
        }] });

/*
 * Public API Surface of mfe-admin
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AdminModule };
//# sourceMappingURL=mfe-admin.mjs.map
