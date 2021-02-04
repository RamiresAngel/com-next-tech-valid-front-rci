import { DataTablesModule } from 'angular-datatables';
import { FiltroCajaChicaComponent } from './filtro-caja-chica/filtro-caja-chica.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaChicaRoutingModule } from './caja-chica-routing.module';
import { CajaChicaMainComponent } from './caja-chica-main/caja-chica-main.component';
import { CajaChicaListComponent } from './caja-chica-list/caja-chica-list.component';
import { CajaChicaFormComponent } from './caja-chica-form/caja-chica-form.component';
import { Select2Module } from 'ng2-select2';
import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { FiltroComprobacionCchComponent } from './componentes/filtro-comprobacion-cch/filtro-comprobacion-cch.component';

@NgModule({
  imports: [
    CommonModule,
    CajaChicaRoutingModule,
    Select2Module,
    SharedModuleModule,
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
