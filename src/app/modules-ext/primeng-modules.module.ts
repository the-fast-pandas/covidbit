import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { AccordionModule } from 'primeng/accordion';

const PrimengModules = [
    ChartModule,
    TableModule,
    InputTextModule,
    DialogModule,
    ToolbarModule,
    ConfirmDialogModule,
    RatingModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    ButtonModule,
    AccordionModule 
];

const PrimengProviders = [ConfirmationService];

@NgModule({
    imports: [PrimengModules],
    exports: [PrimengModules],
    providers: [PrimengProviders]
  })
  export class PrimengModulesModule { }