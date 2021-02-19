import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NebularModulesModule } from './nebular-modules/nebular-modules.module';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { AuthInterceptor } from './auth-services/authconfig.interceptor';
import { BusinessDashboardComponent } from './business-dashboard/business-dashboard.component'
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from "ng2-completer";
import { SearchWidgetComponent } from './search-widget/search-widget.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MapSettingsComponent } from './admin-dashboard/adminSettings/map-settings/map-settings.component';
import { CaseSettingsComponent } from './admin-dashboard/adminSettings/case-settings/case-settings.component'
import { TrackerMapComponent } from './tracker-map/tracker-map.component';

import { NbListModule } from '@nebular/theme';
import { AgmCoreModule } from '@agm/core';
import { NbCalendarModule } from '@nebular/theme'



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
    MapSettingsComponent,
    TrackerMapComponent,
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
    NbListModule,
    NbCalendarModule,
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
      multi: true
    },
    []
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
