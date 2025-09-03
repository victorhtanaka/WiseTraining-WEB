import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/views/login/login.component';
import { RegisterComponent } from './components/views/register/register.component';
import { UnloggedComponent } from './components/views/unlogged/unlogged.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { CoursesListComponent } from './components/views/courses-list/courses-list.component';
import { CourseCreateComponent } from './components/views/course-create/course-create.component';
import { CourseDetailComponent } from './components/views/course-detail/course-detail.component';

const routes: Routes = [
  { path: '', component: UnloggedComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Courses', component: CoursesListComponent },
  { path: 'Courses/Create', component: CourseCreateComponent },
  { path: 'Course/:courseId', component: CourseDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
