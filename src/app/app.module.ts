import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NebularModulesModule } from './nebular-modules/nebular-modules.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { ApiService } from './api.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from "ng2-completer";
import { AuthInterceptor } from './services/auth-services/authconfig.interceptor';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BusinessDashboardComponent } from './business-dashboard/business-dashboard.component'
import { SearchWidgetComponent } from './search-widget/search-widget.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MapSettingsComponent } from './admin-dashboard/adminSettings/business-settings/business-settings.component';
import { CaseSettingsComponent } from './admin-dashboard/adminSettings/case-settings/case-settings.component'
import { TrackerMapComponent } from './tracker-map/tracker-map.component';
import { BusinessUserViewComponent } from './business-user-view/business-user-view.component';
import { CertificationFormComponent } from './certification-form/certification-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    BusinessProfileComponent,
    BusinessDashboardComponent,
    AdminDashboardComponent,
    CaseSettingsComponent,
    SearchWidgetComponent,
    SearchPageComponent,
    TrackerMapComponent,
    MapSettingsComponent,
    BusinessUserViewComponent,
    SearchPageComponent,
    CertificationFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NebularModulesModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    HttpClientModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbNARRSTlFSaDp6GyBBM_pkEttwvj18d0',
      libraries: ['places']
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    [ApiService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }