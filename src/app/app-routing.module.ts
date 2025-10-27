import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UnloggedComponent } from './components/views/unlogged/unlogged.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: UnloggedComponent },
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  
  // Auth Microfrontend
  {
    path: 'auth',
    loadChildren: () => import('mfe-auth').then(m => m.AuthModule)
  },
  
  // Courses Microfrontend
  {
    path: 'Course',
    loadChildren: () => import('mfe-courses').then(m => m.CoursesModule),
    canActivate: [AuthGuard]
  },
  
  // Admin Microfrontend
  {
    path: 'admin',
    loadChildren: () => import('mfe-admin').then(m => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard]
  },
  
  // Company Microfrontend
  {
    path: 'company',
    loadChildren: () => import('mfe-company').then(m => m.CompanyModule),
    canActivate: [AuthGuard]
  },

  // Legacy routes redirects
  { path: 'Login', redirectTo: 'auth/login' },
  { path: 'Register', redirectTo: 'auth/register' },
  { path: 'UserProfile', redirectTo: 'auth/profile' },
  { path: 'CoursesList', redirectTo: 'Course' },
  { path: 'CourseCreate', redirectTo: 'Course/create' },
  { path: 'CourseDetail/:id', redirectTo: 'Course/detail/:id' },
  { path: 'CourseCatalog', redirectTo: 'Course/catalog' },
  { path: 'CourseDetails/:id', redirectTo: 'Course/details/:id' },
  { path: 'UsersList', redirectTo: 'admin/users' },
  { path: 'CategoriesList', redirectTo: 'admin/categories' },
  { path: 'CompaniesList', redirectTo: 'admin/companies' },
  { path: 'CompanyManagement', redirectTo: 'company/management' },
  { path: 'CompanyRegister', redirectTo: 'company/register' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
