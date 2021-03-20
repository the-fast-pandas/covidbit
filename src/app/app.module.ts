import { NebularModulesModule } from './modules-ext/nebular-modules.module';  // Nebula
import { PrimengModulesModule } from './modules-ext/primeng-modules.module'; // Primeng
import { NgModule } from '@angular/core'; // angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api-covid-services/api.service'; // api covid
import { GooglePlaceModule } from "ngx-google-places-autocomplete"; // api map
import { AgmCoreModule } from '@agm/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from "ng2-completer";
// app
import { AuthInterceptor } from './services/auth-services/authconfig.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './static-pages/home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './static-pages/not-found/not-found.component';
import { BusinessProfileComponent } from './business-dashboard/business-profile/business-profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BusinessDashboardComponent } from './business-dashboard/business-dashboard.component'
import { SearchWidgetComponent } from './search-widget/search-widget.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MapSettingsComponent } from './admin-dashboard/adminSettings/business-settings/business-settings.component';
import { CaseSettingsComponent } from './admin-dashboard/adminSettings/case-settings/case-settings.component'
import { TrackerMapComponent } from './tracker-map/tracker-map.component';
import { BusinessUserViewComponent } from './business-user-view/business-user-view.component';
import { CertificationFormComponent } from './business-dashboard/certification-form/certification-form.component';
import { PolicyComponent } from './static-pages/policy/policy.component';
import { TermsComponent } from './static-pages/terms/terms.component';
import { NewPasswordComponent } from './login-form/new-password/new-password.component';
import { ResetPasswordComponent } from './login-form/reset-password/reset-password.component';
import { ChartBusinessComponent } from './admin-dashboard/chart-business/chart-business.component'
import { BarBusinessCasesComponent } from './admin-dashboard/bar-business-cases/bar-business-cases.component';
import { NewsComponent } from './tracker-map/news/news.component';
import { AddCaseComponent } from './business-dashboard/add-case/add-case.component';
import { TableCasesComponent } from './business-dashboard/table-cases/table-cases.component';
import { EditCaseComponent } from './business-dashboard/edit-case/edit-case.component';
import { LineGraphComponent } from './tracker-map/line-graph/line-graph.component';

import { NgxEchartsModule } from 'ngx-echarts';


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
    PolicyComponent,
    TermsComponent,
    NewPasswordComponent,
    ResetPasswordComponent,
    ChartBusinessComponent,
    BarBusinessCasesComponent,
    NewsComponent,
    AddCaseComponent,
    TableCasesComponent,
    EditCaseComponent,
    LineGraphComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NebularModulesModule,
    PrimengModulesModule,
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
    }),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), 
    }),
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