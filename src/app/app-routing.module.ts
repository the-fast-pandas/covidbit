import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { HomeComponent } from './static-pages/home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { NotFoundComponent } from './static-pages/not-found/not-found.component'
import { BusinessProfileComponent } from './business-dashboard/business-profile/business-profile.component';
import { BusinessDashboardComponent } from './business-dashboard/business-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TrackerMapComponent } from './tracker-map/tracker-map.component';
import { BusinessUserViewComponent } from './business-user-view/business-user-view.component';
import { CertificationFormComponent } from './business-dashboard/certification-form/certification-form.component';
import { PolicyComponent } from './static-pages/policy/policy.component';
import { TermsComponent } from './static-pages/terms/terms.component';
import { NewPasswordComponent } from './login-form/new-password/new-password.component';
import { ResetPasswordComponent } from './login-form/reset-password/reset-password.component';
import { ReviewComponent } from './business-user-view/review/review.component';
import { ReviewConfirmationComponent } from './business-user-view/review/review-confirmation/review-confirmation.component';
import { AboutUsComponent } from './static-pages/about-us/about-us.component';
// Guards
import { AuthGuard } from "./services/auth-services/auth.guard";
import { AdminGuard } from "./services/auth-services/admin.guard";
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'policy',
    component: PolicyComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
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
    path: 'new-password',
    component: NewPasswordComponent
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'business-dashboard/:id',
    component: BusinessDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'business-profile/:id',
    component: BusinessProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'certification-form/:id',
    component: CertificationFormComponent
  },
  {
    path: 'business-user-view/:id',
    component: BusinessUserViewComponent
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'tracker-map',
    component: TrackerMapComponent
  },
  {
    path: 'review/:id',
    component: ReviewComponent
  },
  {
    path: 'reviewConfirmation',
    component: ReviewConfirmationComponent
  },
  {
    path: 'header',
    component: HeaderComponent
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }