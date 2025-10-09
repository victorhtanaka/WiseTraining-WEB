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
import { CompanyRegisterComponent } from './components/company-register/company-register.component';

const routes: Routes = [
  { path: '', component: UnloggedComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'CompanyRegister', component: CompanyRegisterComponent },
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'Courses', component: CoursesListComponent, canActivate: [AuthGuard] },
  { path: 'Courses/Create', component: CourseCreateComponent, canActivate: [AuthGuard] },
  { path: 'Course/:courseId', component: CourseDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
