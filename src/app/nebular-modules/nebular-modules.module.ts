import { NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
<<<<<<< HEAD
  NbIconModule, 
  NbLayoutModule, 
  NbMenuModule, 
  NbSidebarModule, 
=======
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
>>>>>>> 7ffa663 (map visualization 1)
  NbThemeModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbButtonModule,
  NbCheckboxModule,
  NbAlertModule,
<<<<<<< HEAD
  NbFormFieldModule
} from '@nebular/theme';

const NebularModules = [
   NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,               
    NbSidebarModule.forRoot(),  
    NbSidebarModule,
    NbMenuModule.forRoot(),     
    NbMenuModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbThemeModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAlertModule,
    NbFormFieldModule
=======
  NbFormFieldModule,
  NbUserModule,
  NbStepperModule,
  NbActionsModule,
  NbAccordionModule
} from '@nebular/theme';

const NebularModules = [
  NbThemeModule.forRoot({ name: 'corporate' }),
  NbLayoutModule,
  NbEvaIconsModule,
  NbIconModule,
  NbSidebarModule.forRoot(),
  NbSidebarModule,
  NbMenuModule.forRoot(),
  NbMenuModule,
  NbThemeModule.forRoot({ name: 'default' }),
  NbThemeModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbButtonModule,
  NbCheckboxModule,
  NbAlertModule,
  NbFormFieldModule,
  NbUserModule,
  NbStepperModule,
  NbActionsModule,
  NbAccordionModule
>>>>>>> 7ffa663 (map visualization 1)
];

@NgModule({
  imports: [NebularModules],
  exports: [NebularModules]
})
export class NebularModulesModule { }
