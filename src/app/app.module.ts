import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbCardModule} from '@nebular/theme'
import { NbSearchModule } from '@nebular/theme';
import { NbPopoverModule } from '@nebular/theme';
import { NbCalendarModule } from '@nebular/theme';
import { NbCalendarRangeModule } from '@nebular/theme';
import { NbListModule } from '@nebular/theme';
import { AgmCoreModule } from '@agm/core';
import { HomeComponent } from './home/home.component';
import { NebularModulesModule } from './nebular-modules/nebular-modules.module';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
=======
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { TrackerMapComponent } from './tracker-map/tracker-map.component';
>>>>>>> 7ffa663 (map visualization 1)


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    HeaderComponent,
    FooterComponent,
<<<<<<< HEAD
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,       
    NbCardModule,        
    NbSidebarModule.forRoot(),  
    NbMenuModule.forRoot(),     
    NbThemeModule.forRoot({name: 'default'}),
    NbSidebarModule.forRoot()
    NebularModulesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
=======
    NotFoundComponent,
    BusinessProfileComponent,
    TrackerMapComponent,
  ],
  imports: [
    BrowserModule,
    NbSearchModule,
    NbCalendarModule,
    NbPopoverModule,
    NbListModule,
    AppRoutingModule,
    NbCalendarRangeModule,
    BrowserAnimationsModule,
    NebularModulesModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    HttpClientModule,   
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbNARRSTlFSaDp6GyBBM_pkEttwvj18d0',
      libraries: ['places']
    }) 
>>>>>>> 7ffa663 (map visualization 1)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
