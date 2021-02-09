import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { NotFoundComponent } from './not-found/not-found.component'
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { AuthGuard } from "./auth-services/auth.guard";


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent, canActivate: [AuthGuard] 
  },
  {
    path: 'registration-form',
    component: RegistrationFormComponent
  },
  {
    path: 'login-form',
    component: LoginFormComponent
  },
  {
    path: 'business-profile',
    component: BusinessProfileComponent
  },
  {
    path: '',
    component: HomeComponent
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
