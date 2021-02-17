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
import { AuthInterceptor } from './auth-services/authconfig.interceptor';
import { SearchWidgetComponent } from './search-widget/search-widget.component';
import { SearchPageComponent } from './search-page/search-page.component';


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
    SearchWidgetComponent,
    SearchPageComponent,

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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
