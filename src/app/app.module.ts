import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HomeComponent } from './home/home.component';
import { NebularModulesModule } from './nebular-modules/nebular-modules.module';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

import { NotFoundComponent } from './not-found/not-found.component';

import { BusinessProfileComponent } from './business-profile/business-profile.component';




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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbEvaIconsModule,
    NbCardModule,        
    NebularModulesModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
