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


import { NgxEchartsModule } from 'ngx-echarts';

import { ReviewComponent } from './business-user-view/review/review.component';
import { ReviewConfirmationComponent } from './business-user-view/review/review-confirmation/review-confirmation.component';


import { StatsComponent } from './tracker-map/graphs/stats/stats.component';
import { StatsCanadaComponent } from './tracker-map/graphs/stats-canada/stats-canada.component';
import { OntarioCanadaComponent } from './tracker-map/ontario-canada/ontario-canada.component';
import { LineGraphCanadaComponent } from './tracker-map/graphs/line-graph-canada/line-graph-canada.component';
import { LineGraphComponent } from './tracker-map/graphs/line-graph/line-graph.component';
import { BarHealthRegionCasesComponent } from './tracker-map/graphs/bar-health-region-cases/bar-health-region-cases.component';
import { HealthRegionCasesComponent } from './tracker-map/graphs/health-region-cases/health-region-cases.component';
import { HealthRegionMortalityComponent } from './tracker-map/graphs/health-region-mortality/health-region-mortality.component';
import { BarHealthRegionMortalityComponent } from './tracker-map/graphs/bar-health-region-mortality/bar-health-region-mortality.component';
import { BarOntarioCanadaComponent } from './tracker-map/graphs/bar-ontario-canada/bar-ontario-canada.component';
import { BarOntarioCanadaVaccinesComponent } from './tracker-map/graphs/bar-ontario-canada-vaccines/bar-ontario-canada-vaccines.component';
import { AboutUsComponent } from './static-pages/about-us/about-us.component';




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
    TrackerMapComponent,
    MapSettingsComponent,
    BusinessUserViewComponent,
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
    StatsComponent,
    ReviewComponent,
    ReviewConfirmationComponent,
    StatsCanadaComponent,
    OntarioCanadaComponent,
    LineGraphCanadaComponent,
    BarHealthRegionCasesComponent,
    HealthRegionCasesComponent,
    HealthRegionMortalityComponent,
    BarHealthRegionMortalityComponent,
    BarOntarioCanadaComponent,
    BarOntarioCanadaVaccinesComponent,
    AboutUsComponent


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