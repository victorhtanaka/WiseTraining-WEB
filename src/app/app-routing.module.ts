import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/views/login/login.component';
import { RegisterComponent } from './components/views/register/register.component';
import { UnloggedComponent } from './components/views/unlogged/unlogged.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Login', component: LoginComponent},
  {path: 'Cadastro', component: RegisterComponent},
  {path: 'Unlogged', component: UnloggedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
