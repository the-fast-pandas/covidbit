import { NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbContextMenuModule,
  NbCardModule,
  NbInputModule,
  NbSearchModule,
  NbSelectModule,
  NbButtonModule,
  NbCheckboxModule,
  NbAlertModule,
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
  NbContextMenuModule,
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
  NbSearchModule,
  NbButtonModule,
  NbCheckboxModule,
  NbAlertModule,
  NbFormFieldModule,
  NbUserModule,
  NbStepperModule,
  NbActionsModule,
  NbAccordionModule
];

@NgModule({
  imports: [NebularModules],
  exports: [NebularModules]
})
export class NebularModulesModule { }
