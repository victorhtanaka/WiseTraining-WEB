import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/views/login/login.component';
import { RegisterComponent } from './components/views/register/register.component';
import { UnloggedComponent } from './components/views/unlogged/unlogged.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { CoursesListComponent } from './components/views/courses-list/courses-list.component';
import { CourseCreateComponent } from './components/views/course-create/course-create.component';
import { CourseDetailComponent } from './components/views/course-detail/course-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UserProfileComponent } from './components/views/user-profile/user-profile.component';
import { UsersListComponent } from './components/views/users-list/users-list.component';
import { CategoriesListComponent } from './components/views/categories-list/categories-list.component';
import { CompaniesListComponent } from './components/views/companies-list/companies-list.component';
import { CompanyManagementComponent } from './components/views/company-management/company-management.component';
import { CourseCatalogComponent } from './components/views/course-catalog/course-catalog.component';
import { CourseDetailsComponent } from './components/views/course-details/course-details.component';
import { CompanyRegisterComponent } from './components/views/company-register/company-register.component';

const routes: Routes = [
  { path: '', component: UnloggedComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'CompanyRegister', component: CompanyRegisterComponent },
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'Profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'Users', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'Categories', component: CategoriesListComponent, canActivate: [AuthGuard] },
  { path: 'Companies', component: CompaniesListComponent, canActivate: [AuthGuard] },
  { path: 'CompanyManagement', component: CompanyManagementComponent, canActivate: [AuthGuard] },
  { path: 'Courses', component: CoursesListComponent, canActivate: [AuthGuard] },
  { path: 'Courses/Create', component: CourseCreateComponent, canActivate: [AuthGuard] },
  { path: 'Courses/Edit/:courseId', component: CourseCreateComponent, canActivate: [AuthGuard] },
  { path: 'Course/:courseId', component: CourseDetailComponent, canActivate: [AuthGuard] },
  { 
    path: 'course-catalog', 
    component: CourseCatalogComponent, 
    canActivate: [RoleGuard],
    data: { role: 'Company' } 
  },
  { 
    path: 'course-details/:id', 
    component: CourseDetailsComponent, 
    canActivate: [RoleGuard],
    data: { role: 'Company' } 
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
