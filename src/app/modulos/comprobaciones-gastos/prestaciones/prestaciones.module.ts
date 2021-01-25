import { NgxCurrencyModule } from 'ngx-currency';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { Select2Module } from 'ng2-select2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';

import { PrestacionesRoutingModule } from './prestaciones-routing.module';
import { PrestacionesMainComponent } from './prestaciones-main/prestaciones-main.component';
import { PrestacionesListComponent } from './prestaciones-list/prestaciones-list.component';
import { PrestacionesFormComponent } from './prestaciones-form/prestaciones-form.component';

@NgModule({
  imports: [
    CommonModule,
    PrestacionesRoutingModule,
    Select2Module,
    SharedModuleModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule,
  ],
  declarations: [
    PrestacionesMainComponent,
    PrestacionesListComponent,
    PrestacionesFormComponent,
  ]
})
export class PrestacionesModule { }
