import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
   path: 'registration-form', 
   component: RegistrationFormComponent
  },
  {
    path: 'login-form',
    component: LoginFormComponent
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
