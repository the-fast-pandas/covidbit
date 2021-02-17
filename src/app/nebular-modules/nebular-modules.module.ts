import { NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
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
  NbAccordionModule,
  NbListModule,
  NbDialogModule,
  NbContextMenuModule
  
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
  NbAccordionModule,
  NbListModule,
  NbDialogModule.forRoot(),
  NbContextMenuModule
];

@NgModule({
  imports: [NebularModules],
  exports: [NebularModules]
})
export class NebularModulesModule { }
