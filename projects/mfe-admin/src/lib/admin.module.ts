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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Components (will be created)
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserFormDialogComponent } from './components/users-list/user-form-dialog/user-form-dialog.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryFormDialogComponent } from './components/categories-list/category-form-dialog/category-form-dialog.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { CompanyFormDialogComponent } from './components/companies-list/company-form-dialog/company-form-dialog.component';

const routes: Routes = [
  { path: 'users', component: UsersListComponent },
  { path: 'categories', component: CategoriesListComponent },
  { path: 'companies', component: CompaniesListComponent }
];

@NgModule({
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
})
export class AdminModule { }
