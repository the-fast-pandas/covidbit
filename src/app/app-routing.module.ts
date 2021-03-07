import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { NotFoundComponent } from './not-found/not-found.component'
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { AuthGuard } from "./auth-services/auth.guard";
import { AdminGuard } from "./auth-services/admin.guard";
import { SearchPageComponent } from './search-page/search-page.component';
import { BusinessDashboardComponent } from './business-dashboard/business-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TrackerMapComponent } from './tracker-map/tracker-map.component';
import { BusinessUserViewComponent } from './business-user-view/business-user-view.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
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
    component: BusinessProfileComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'search-page',
    component: SearchPageComponent
  },
  {
    path: 'business-dashboard',
    component: BusinessDashboardComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'business-dashboard/:id',
    component: BusinessDashboardComponent,
    canActivate: [AuthGuard]
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
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }