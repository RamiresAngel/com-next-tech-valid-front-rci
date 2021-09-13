import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';
import { NgxCurrencyModule } from 'ngx-currency';
import { Select2Module } from 'ng2-select2';
import { CompartidosModule } from './../../../compartidos/compartidos.module';
import { CajaChicaRoutingModule } from './caja-chica-routing.module';

import { CajaChicaMainComponent } from './caja-chica-main/caja-chica-main.component';
import { CajaChicaListComponent } from './caja-chica-list/caja-chica-list.component';
import { CajaChicaFormComponent } from './caja-chica-form/caja-chica-form.component';
import { FiltroCajaChicaComponent } from './filtro-caja-chica/filtro-caja-chica.component';
import { FiltroComprobacionCchComponent } from './componentes/filtro-comprobacion-cch/filtro-comprobacion-cch.component';

@NgModule({
  imports: [
    CommonModule,
    CajaChicaRoutingModule,
    Select2Module,
    CompartidosModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule,
    DataTablesModule
  ],
  declarations: [
    CajaChicaMainComponent,
    CajaChicaListComponent,
    CajaChicaFormComponent,
    FiltroCajaChicaComponent,
    FiltroComprobacionCchComponent
  ]
})
export class CajaChicaModule { }
