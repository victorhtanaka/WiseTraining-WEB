import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Components (will be created)
import { CompanyManagementComponent } from './components/company-management/company-management.component';
import { AddUserDialogComponent } from './components/company-management/add-user-dialog/add-user-dialog.component';
import { GroupDialogComponent } from './components/company-management/group-dialog/group-dialog.component';
import { ConfirmDialogComponent } from './components/company-management/confirm-dialog/confirm-dialog.component';
import { CompanyRegisterComponent } from './components/company-register/company-register.component';

const routes: Routes = [
  { path: 'management', component: CompanyManagementComponent },
  { path: 'register', component: CompanyRegisterComponent }
];

@NgModule({
  declarations: [
    CompanyManagementComponent,
    AddUserDialogComponent,
    GroupDialogComponent,
    ConfirmDialogComponent,
    CompanyRegisterComponent
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
    MatTabsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    MatCheckboxModule
  ]
})
export class CompanyModule { }
